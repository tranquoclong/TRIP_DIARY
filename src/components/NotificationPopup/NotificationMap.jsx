import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useLocation from "./../../hooks/useLocation";
import mIcon from "../../assets/images/location-icon.png";
// import { useDispatch } from "react-redux";
import styled from "styled-components";
// const osm = {
//     maptiler: {
//         url: "https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=rI9ODoaXGg1gJcIgQzh5",
//         attribution: "MapTiler",
//     },
// };

const makerIcon = new L.Icon({
  iconUrl: mIcon,
  iconSize: [40, 40],
});
const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  & .leaflet-container {
    height: 100%;
    width: 100%;
  }
`;
const NotificationMap = ({ destination, zoom }) => {
  const location = useLocation();
  const mapRef = useRef();
  // const dispatch = useDispatch();

  const showMyLocation = () => {
    if (mapRef.current) {
      mapRef.current.flyTo(
        [destination?.latitude || 50, destination?.longitude || 50],
        zoom,
        { animation: true }
      );
    }
  };

  useEffect(
    () => {
      showMyLocation();
    },
    // eslint-disable-next-line
    [destination]
  );

  return (
    <Wrapper>
      <MapContainer
        center={[destination?.latitude || 50, destination?.longitude || 50]}
        zoom={zoom}
        scrollWheelZoom={true}
        ref={mapRef}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {destination && (
          <>
            <Marker
              icon={makerIcon}
              position={[
                destination?.latitude || 50,
                destination?.longitude || 50,
              ]}
            >
              <Popup>{destination?.address}</Popup>
            </Marker>
          </>
        )}
        {location.loaded && !location.error && (
          <Marker
            icon={makerIcon}
            position={[
              location.coordinates.lat || 50,
              location.coordinates.lng || 50,
            ]}
          >
            <Popup>Your location</Popup>
          </Marker>
        )}
      </MapContainer>
    </Wrapper>
  );
};

export default NotificationMap;
