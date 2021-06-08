import { useEffect, useRef, useState } from "react";
import ReactMapGL, {
  Source,
  Layer,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";

import ChargePointLegend from "../../components/ChargePointLegend";
import FilterPanel from "../../components/FilterPanel";

import { getChargePoints } from "../../services/charge-points";

import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "./layers";

import search from "../../svg/search.svg";
import filterOptions from "../../svg/filter-options.svg";

import "./index.scss";
import "mapbox-gl/dist/mapbox-gl.css";

const { REACT_APP_MAPBOX_ACCESS_TOKEN } = process.env;

const Map = () => {
  const [status, setStatus] = useState(0);
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const [chargePoints, setChargePoints] = useState([]);
  const [viewLegend, setViewLegend] = useState(true);
  const [viewFilterPanel, setViewFilterPanel] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: userLat || 40,
    longitude: userLng || -3,
    zoom: 8,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
    } else {
      if (status < 10) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setStatus(11);
            setUserLat(position.coords.latitude);
            setUserLng(position.coords.longitude);
            setViewport({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              zoom: 13,
            });
          },
          () => {
            setStatus(status + 1);
          }
        );
      }
    }
  }, [status]);

  useEffect(() => {
    getChargePoints(userLat, userLng).then((res) => setChargePoints(res));
  }, [userLat, userLng]);

  const mapRef = useRef(null);

  const showChargePointInformation = (chargePoint) => {
    console.log(chargePoint.id);
  };

  const onClick = (event) => {
    const feature = event.features[0];

    if (feature) {
      if (feature.layer.id === "clusters") {
        const clusterId = feature.properties.cluster_id;

        const mapboxSource = mapRef.current.getMap().getSource("charge-points");

        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) {
            return;
          }

          setViewport({
            ...viewport,
            longitude: feature.geometry.coordinates[0],
            latitude: feature.geometry.coordinates[1],
            zoom,
            transitionDuration: 200,
          });
        });
      }
      if (feature.layer.id === "unclustered-point") {
        showChargePointInformation(feature.properties);
      }
    } else {
      console.log("click");
    }
  };

  const data = {
    type: "FeatureCollection",
    features: chargePoints.map((chargePoint) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [chargePoint.longitude, chargePoint.latitude],
      },
      properties: { ...chargePoint },
    })),
  };

  const hideLegend = () => setViewLegend(false);
  const toggleFilter = () => {
    setViewFilterPanel(true);
  };

  return (
    <>
      {viewLegend ? (
        <ChargePointLegend quitLegend={hideLegend} />
      ) : (
        <div className="map">
          <ReactMapGL
            width="100vw"
            height="calc(100vh - 56px)"
            className="map__view"
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            accessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
            interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
            onClick={onClick}
            ref={mapRef}
            attributionControl={false}
          >
            <NavigationControl
              style={{
                left: 10,
                bottom: 10,
              }}
            />
            <GeolocateControl
              style={{
                right: 10,
                bottom: 10,
              }}
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
              auto
            />
            <Source
              id="charge-points"
              type="geojson"
              data={data}
              cluster={true}
              clusterMaxZoom={14}
              clusterRadius={50}
            >
              <Layer {...clusterLayer} />
              <Layer {...clusterCountLayer} />
              <Layer {...unclusteredPointLayer} />
            </Source>
          </ReactMapGL>
          <div className="map__options">
            <div className="map__options__button">
              <img src={search} alt="search" />
            </div>
            <div className="map__options__button" onClick={toggleFilter}>
              <img src={filterOptions} alt="filter" />
            </div>
          </div>
        </div>
      )}
      {viewFilterPanel && (
        <FilterPanel
          setFilterPanel={setViewFilterPanel}
          lat={userLat}
          lng={userLng}
          setChargePoints={setChargePoints}
          className="map__"
        />
      )}
    </>
  );
};

export default Map;
