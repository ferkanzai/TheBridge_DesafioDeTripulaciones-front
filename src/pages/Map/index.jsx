import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl/dist/svg/mapboxgl-ctrl-compass.svg";
import "mapbox-gl/dist/svg/mapboxgl-ctrl-geolocate.svg";
import "mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-in.svg";
import "mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-out.svg";

import { useEffect, useState } from "react";
import ReactMapboxGl, { Marker, Cluster } from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";
import { v4 as uuid } from "uuid";

import Button from "../../components/Button";
import FilterPanel from "../../components/FilterPanel";
import ChargePointLegend from "../../components/ChargePointLegend";
import ChargePointInformation from "../../components/ChargePointInformation";

import { getChargePoints } from "../../services/charge-points";

import { mappingColors } from "../../utils";

import "./index.scss";

mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmVya2FuemFpIiwiYSI6ImNraTFvZGE1azBiY24yd3Fuc3RoYjZ1N3QifQ.825dTY3GMtTjgI5M90Ujrw",
  logoPosition: "bottom-left",
  attributionControl: false,
});

const MapWrapper = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const [zoom, setZoom] = useState(13);
  const [status, setStatus] = useState(0);
  const [chargePoints, setChargePoints] = useState([]);
  const [filterPanel, setFilterPanel] = useState(false);
  const [initial, setInitial] = useState(true);
  const [informationVisible, setInformationVisible] = useState(false);
  const [singleChargePoint, setSingleChargePoint] = useState(null);
  // const [never, setNever] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
    } else {
      if (status < 10) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setStatus(11);
            setUserLat(position.coords.latitude);
            setLat(position.coords.latitude);
            setUserLng(position.coords.longitude);
            setLng(position.coords.longitude);
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

  // const handleMove = (map) => {
  //   console.log(map.getCenter());
  //   const { lng, lat } = map.getCenter();
  //   const zoom = map.getZoom();
  //   setLng(lng);
  //   setLat(lat);
  //   setZoom(zoom);
  // };

  const clusterMarker = (coordinates, points) => (
    <Marker coordinates={coordinates} className="cluster" maxZoom={14}>
      {points}
    </Marker>
  );

  const showChargePointInformation = (chargePoint) => {
    setInformationVisible(true);
    setLat(chargePoint.latitude);
    setLng(chargePoint.longitude);
    setZoom(14.5);
    setSingleChargePoint(chargePoint);
  };

  const hideChargePointInformation = () => {
    setInformationVisible(false);
    setSingleChargePoint(null);
  };

  const toggleFilter = () => {
    setFilterPanel(true);
  };

  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
    showUserLocation: true,
  });

  const navigation = new mapboxgl.NavigationControl({
    showCompass: true,
    showZoom: true,
  });

  const quitLegend = () => setInitial(false);

  const setCenter = (map) => {
    console.log(map.getCenter());
    console.log(map.getZoom());
    // const { lng, lat } = map.getCenter();
    // const zoom = map.getZoom();
    // setLat(lat);
    // setLng(lng);
    // setZoom(zoom);
  };

  return (
    <>
      {initial /*&& !never*/ ? (
        <ChargePointLegend quitLegend={quitLegend} />
      ) : (
        <>
          <Map
            // eslint-disable-next-line react/style-prop-object
            style="mapbox://styles/mapbox/streets-v11"
            containerStyle={{
              height: "100vh",
              width: "100vw",
            }}
            movingMethod="easeTo"
            center={[lng, lat]}
            zoom={[zoom]}
            onStyleLoad={(map) => {
              map.addControl(navigation, "bottom-left");
              map.addControl(geolocate, "bottom-right");

              geolocate.on("geolocate", function (pos) {
                setLat(pos.coords.latitude);
                setLng(pos.coords.longitude);
              });
            }}
            onMoveEnd={(map) => setCenter(map)}
            // onDragEnd={() =>
            //   chargePointInformation ? setChargePointInformation(false) : null
            // }
            // onMove={() => setChargePointInformation(!chargePointInformation)}
          >
            {chargePoints.length > 25 ? (
              <Cluster
                ClusterMarkerFactory={clusterMarker}
                zoomOnClick={true}
                key={uuid()}
              >
                {chargePoints &&
                  chargePoints.map((chargePoint) => (
                    <Marker
                      key={chargePoint.id}
                      coordinates={[
                        chargePoint.longitude,
                        chargePoint.latitude,
                      ]}
                      onClick={() => showChargePointInformation(chargePoint)}
                      anchor="top"
                    >
                      <div
                        className="marker"
                        style={{
                          backgroundColor: mappingColors(
                            chargePoint.waiting_time
                          ),
                        }}
                      ></div>
                    </Marker>
                  ))}
              </Cluster>
            ) : (
              chargePoints &&
              chargePoints.map((chargePoint) => (
                <Marker
                  key={chargePoint.id}
                  coordinates={[chargePoint.longitude, chargePoint.latitude]}
                  onClick={() => showChargePointInformation(chargePoint)}
                  anchor="top"
                >
                  <div
                    className="marker"
                    style={{
                      backgroundColor: mappingColors(chargePoint.waiting_time),
                    }}
                  ></div>
                </Marker>
              ))
            )}
          </Map>
          <div className="buttons-div">
            <Button text="Planificar Ruta" />
            <Button text="Filtrado" toggleFilter={toggleFilter} />
            {filterPanel && (
              <FilterPanel
                setFilterPanel={setFilterPanel}
                lat={lat}
                lng={lng}
                setChargePoints={setChargePoints}
              />
            )}
          </div>

          {informationVisible && (
            <ChargePointInformation
              className="chargePointInformation"
              singleChargePoint={singleChargePoint}
              hideChargePointInformation={hideChargePointInformation}
            />
          )}
        </>
      )}
    </>
  );
};

export default MapWrapper;
