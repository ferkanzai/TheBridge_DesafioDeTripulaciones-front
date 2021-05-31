import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl/dist/svg/mapboxgl-ctrl-compass.svg";
import "mapbox-gl/dist/svg/mapboxgl-ctrl-geolocate.svg";
import "mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-in.svg";
import "mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-out.svg";

import { useContext, useEffect, useState } from "react";
import ReactMapboxGl, { Marker, Cluster } from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";
import Rating from "@material-ui/lab/Rating";
import { v4 as uuid } from "uuid";

import Button from "../../components/Button";
import FilterPanel from "../../components/FilterPanel";
import ChargePointLegend from "../../components/ChargePointLegend";
import { UserContext } from "../../store";

import { getChargePoints } from "../../services/charge-points";
import { postStartReservation } from "../../services/reservations";

import charging from "../../charging.png";
import "./index.scss";

mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const mappingColors = (time) => {
  const times = {
    [time === 0]: "#1DAE69",
    [time < 5]: "#89CC33",
    [time > 5 && time < 15]: "#C5D22A",
    [time > 15 && time < 30]: "#FAD966",
    [time > 30 && time < 45]: "#B75454",
    [time > 45]: "#C4C4C4",
  };

  return times[true];
};

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmVya2FuemFpIiwiYSI6ImNraTFvZGE1azBiY24yd3Fuc3RoYjZ1N3QifQ.825dTY3GMtTjgI5M90Ujrw",
  logoPosition: "bottom-left",
  attributionControl: false,
});

const MapWrapper = () => {
  let { token } = useContext(UserContext);

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const [zoom, setZoom] = useState(13);
  const [status, setStatus] = useState(0);
  const [chargePoints, setChargePoints] = useState([]);
  const [filterPanel, setFilterPanel] = useState(false);
  const [initial, setInitial] = useState(true);
  const [chargePointInformation, setChargePointInformation] = useState(false);
  const [singleChargePoint, setSingleChargePoint] = useState(null);
  // const [never, setNever] = useState(false);

  token = localStorage.getItem("access_token");

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

  const handleReservation = (connectionId) => {
    postStartReservation(token, connectionId);
  };

  const click = (chargePoint) => alert(chargePoint.name);

  const clusterMarker = (coordinates, points) => (
    <Marker coordinates={coordinates} className="cluster" maxZoom={14}>
      {points}
    </Marker>
  );

  const showChargePointInformation = (chargePoint) => {
    console.log(chargePoint);
    setChargePointInformation(true);
    setLat(chargePoint.latitude);
    setLng(chargePoint.longitude);
    setZoom(14.5);
    setSingleChargePoint(chargePoint);
  };

  const hideChargePointInformation = () => {
    setChargePointInformation(false);
    setSingleChargePoint({});
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

          {chargePointInformation && (
            <div className={`chargePointInformation`}>
              <img
                src={charging}
                alt="charging"
                className="chargePointInformation__image"
              />
              <p>{singleChargePoint.name}</p>
              <p>tiempo de espera: {singleChargePoint.waiting_time} minutos</p>
              <p>Operador: {singleChargePoint.operator}</p>
              <p>Distancia: {singleChargePoint.distance.toFixed(2)} km</p>
              <p>Precio de carga ({singleChargePoint.price.toFixed(2)}€/min)</p>
              <p>Valoraciones de los usuarios:</p>
              <Rating
                defaultValue={singleChargePoint.rating || 0}
                readOnly={true}
              />
              <p>({singleChargePoint.votes})</p>
              <p>
                Última revisión técnica del cargador:{" "}
                {singleChargePoint.last_verified
                  ? new Date(singleChargePoint.last_verified).toLocaleString()
                  : "No disponible"}
              </p>
              <button onClick={hideChargePointInformation}>Cancelar</button>
              <button onClick={handleReservation}>Reservar</button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MapWrapper;
