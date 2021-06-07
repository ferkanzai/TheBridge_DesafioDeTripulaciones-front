import { useEffect, useRef, useState } from "react";
import ReactMapGL, {
  Source,
  Layer,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "./index.scss";

import { getChargePoints } from "../../services/charge-points";

import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "./layers";

const { REACT_APP_MAPBOX_ACCESS_TOKEN } = process.env;

const Map = () => {
  const [status, setStatus] = useState(0);
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const [chargePoints, setChargePoints] = useState([]);
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

  const onClick = (event) => {
    console.log(event);
    const feature = event.features[0];
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
      console.log(feature.properties);
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

  return (
    <ReactMapGL
      width="100vw"
      height="calc(100vh - 56px)"
      className="map"
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
  );
};

export default Map;
