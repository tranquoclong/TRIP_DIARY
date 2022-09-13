import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { OpenStreetMapProvider } from "react-leaflet-geosearch";
import L from "leaflet";
// import SearchControl from "./searchControl";
import "leaflet/dist/leaflet.css";
import "./map.css";
import useLocation from "./../../hooks/useLocation";
import mIcon from "./location-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOCATION } from "../../store/constants/map.const";
const osm = {
  maptiler: {
    url: "https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=rI9ODoaXGg1gJcIgQzh5",
    attribution: "MapTiler",
  },
};

const makerIcon = new L.Icon({
  iconUrl: mIcon,
  iconSize: [40, 40],
});

const MapComponent = ({ destination }) => {
  const prov = OpenStreetMapProvider();
  console.log("🚀", prov);
  // const [center, setCenter] = useState([13, 13]);
  const location = useLocation();
  const mapRef = useRef();
  const { trip } = useSelector((state) => state.trip);
  const { location: mapLocation } = useSelector((state) => state.map);
  const dispatch = useDispatch();
  const allVisitPlaces = trip.visitDays.map((day) => day.visitPlaces).flat();

  const ZOOM_LEVEL = 9;

  useEffect(
    () => {
      if (location.loaded && mapLocation) {
        mapRef.current.flyTo(
          [mapLocation.latitude || 50, mapLocation.longitude || 50],
          ZOOM_LEVEL,
          { animation: true }
        );
      }
      return () => {
        dispatch({
          type: SET_LOCATION,
          payload: null,
        });
      };
    },
    // eslint-disable-next-line
    [mapLocation]
  );

  const showMyLocation = () => {
    console.log(location);

    if (location.loaded) {
      if (trip.destination) {
        mapRef.current.flyTo(
          [trip.destination.latitude, trip.destination.longitude],
          ZOOM_LEVEL,
          { animation: true }
        );
      } else if (!location.error) {
        mapRef.current.flyTo(
          [location.coordinates.lat, location.coordinates.lng],
          ZOOM_LEVEL,
          { animation: true }
        );
      }
    }
  };

  useEffect(
    () => {
      showMyLocation();
    },
    // eslint-disable-next-line
    [trip.destination, location]
  );

  return (
    <div className="container-map">
      <MapContainer
        center={[50, 50]}
        zoom={ZOOM_LEVEL}
        scrollWheelZoom={true}
        ref={mapRef}
      >
        <TileLayer
          attribution={osm.maptiler.attribution}
          url={osm.maptiler.url}
        />
        {location.loaded && trip.destination && (
          <>
            <Marker
              icon={makerIcon}
              position={[
                trip.destination?.latitude || 50,
                trip.destination?.longitude || 50,
              ]}
            >
              <Popup>{trip.destination?.address}</Popup>
            </Marker>
          </>
        )}
        {allVisitPlaces.length !== 0 &&
          allVisitPlaces.map((p, index) => (
            <Marker
              key={index}
              icon={makerIcon}
              position={[p.latitude, p.longitude]}
            >
              <Popup>{`Place ${index + 1}: ${p.address}`}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
