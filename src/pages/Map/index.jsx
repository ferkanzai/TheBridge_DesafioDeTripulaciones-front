import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl/dist/svg/mapboxgl-ctrl-compass.svg";
import "mapbox-gl/dist/svg/mapboxgl-ctrl-geolocate.svg";
import "mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-in.svg";
import "mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-out.svg";

import { useEffect, useState } from "react";
import ReactMapboxGl, { Marker, Cluster } from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";

import { getChargePoints } from "../../services/charge-points";

import Button from "../../components/Button";
import FilterPanel from "../../components/FilterPanel";

import "./index.css";

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
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [zoom, setZoom] = useState(13);
  const [status, setStatus] = useState(0);
  const [chargePoints, setChargePoints] = useState([]);
  const [filterPanel, setFilterPanel] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
    } else {
      if (status < 10) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setStatus(11);
            setLat(position.coords.latitude);
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
    if (lat && lng) {
      getChargePoints().then((res) => setChargePoints(res));
    }
  }, [lat, lng]);

  // const handleMove = (map) => {
  //   console.log(map.getCenter());
  //   const { lng, lat } = map.getCenter();
  //   const zoom = map.getZoom();
  //   setLng(lng);
  //   setLat(lat);
  //   setZoom(zoom);
  // };

  const click = (chargePoint) => alert(chargePoint.name);

  const clusterMarker = (coordinates, points) => (
    <Marker coordinates={coordinates} className="cluster" maxZoom={14}>
      {points}
    </Marker>
  );

  const toggleFilter = () => {
    setFilterPanel(!filterPanel);
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

  return (
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
        }}
        // onMoveEnd={handleMove}
      >
        <Cluster ClusterMarkerFactory={clusterMarker} zoomOnClick={true}>
          {chargePoints &&
            chargePoints.map((chargePoint) => (
              <Marker
                key={chargePoint.id}
                coordinates={[chargePoint.longitude, chargePoint.latitude]}
                onClick={() => click(chargePoint)}
                anchor="top"
              >
                <div
                  className="marker"
                  style={{
                    backgroundColor: mappingColors(chargePoint.waiting_time),
                  }}
                ></div>
              </Marker>
            ))}
        </Cluster>
      </Map>
      <div className="buttons-div">
        <Button text="Planificar Ruta" />
        <Button text="Filtrado" toggleFilter={toggleFilter} />
        {filterPanel && <FilterPanel />}
      </div>
    </>
  );
};

export default MapWrapper;
