import { useEffect, useState } from "react";
import MapGL, { GeolocateControl, Marker } from "@urbica/react-map-gl";
import Cluster from "@urbica/react-map-gl-cluster";

import "mapbox-gl/dist/mapbox-gl.css";
import "./index.scss";

import { getChargePoints } from "../../services/charge-points";

import { mappingColors } from "../../utils";

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

  const geolocateControlStyle = {
    right: 10,
    top: 10,
  };

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

  const style = {
    width: "35px",
    height: "35px",
    color: "#fff",
    background: "#1978c8",
    borderRadius: "50%",
    // textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const ClusterMarker = ({ longitude, latitude, pointCount }) => (
    <Marker longitude={longitude} latitude={latitude}>
      <div style={{ ...style, background: mappingColors(pointCount) }}>
        {pointCount}
      </div>
    </Marker>
  );

  const onMarkerClick = (id) => {
    console.log(id);
    alert(`You clicked on marker ${id}`);
  };

  return (
    <MapGL
      style={{ width: "100vw", height: "100vh" }}
      className="map"
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      accessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
    >
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        auto
      />
      <Cluster
        radius={40}
        extent={512}
        nodeSize={64}
        maxZoom={14}
        component={ClusterMarker}
      >
        {chargePoints.map((chargePoint) => (
          <Marker
            key={chargePoint.id}
            longitude={chargePoint.longitude}
            latitude={chargePoint.latitude}
            onClick={() => onMarkerClick(chargePoint.id)}
          >
            <div
              className="marker"
              style={{
                ...style,
                backgroundColor: mappingColors(chargePoint.waiting_time),
                width: "15px",
                height: "15px",
                border: "1px solid black",
              }}
            />
          </Marker>
        ))}
      </Cluster>
    </MapGL>
  );
};

export default Map;
