import { useDispatch, useSelector } from "react-redux";
// import bgImage from "../../../../assets/fonts/src_app_components_components_svgIcon_icons_customsprite-70fd46.svg";
import styles from "./OverviewViewer.module.css";
import { IoLocation } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import { IoToday } from "react-icons/io5";
import { GoLocation } from "react-icons/go";

import { FaPlane, FaMotorcycle, FaBicycle, FaWalking } from "react-icons/fa";
import { RiShipFill } from "react-icons/ri";
import { IoCarSport } from "react-icons/io5";
import { useCallback } from "react";
import { SET_LOCATION } from "../../../../store/constants/map.const";

export default function OverviewViewer() {
  const { trip } = useSelector((state) => state.trip);
  const dispatch = useDispatch();

  const handleClickDestination = useCallback(
    (address) => {
      dispatch({
        type: SET_LOCATION,
        payload: address,
      });
    },
    // eslint-disable-next-line
    []
  );

  const visitDays = trip?.visitDays || [];
  const visitPlaces = visitDays.map((day) => day?.visitPlaces || []).flat();
  const photos = visitPlaces.map((place) => place?.images || []).flat();

  console.log(visitDays, visitPlaces, photos);

  return (
    <div className={styles.overview_container}>
      <div className={styles.overview_inner}>
        <div className={styles.thumbnail}>
          <img alt="" src={trip.thumbnailUrl}></img>

          <div className={styles.amounts}>
            <div>
              <IoToday />
              <div className={styles.number}>
                <span>{visitDays.length}</span>
                Days
              </div>
            </div>
            <div>
              <IoLocation />
              <div className={styles.number}>
                <span>{visitPlaces.length}</span>
                Places
              </div>
            </div>
            <div>
              <IoMdPhotos />
              <div className={styles.number}>
                <span>{photos.length}</span>
                Photos
              </div>
            </div>
            <div>
              {trip.transportation.toLowerCase() === "plane" && <FaPlane />}
              {trip.transportation.toLowerCase() === "bus" && <FaPlane />}
              {trip.transportation.toLowerCase() === "ship" && <RiShipFill />}
              {trip.transportation.toLowerCase() === "car" && <IoCarSport />}
              {trip.transportation.toLowerCase() === "motorbike" && (
                <FaMotorcycle />
              )}
              {trip.transportation.toLowerCase() === "bicycle" && <FaBicycle />}
              {trip.transportation.toLowerCase() === "on_walk" && <FaWalking />}
            </div>
          </div>
        </div>
        <div className={styles.overview_info}>
          <div className={styles.overview_destination}>
            <label>Trip’s destination</label>
            <div
              className={styles.destination}
              onClick={() => handleClickDestination(trip.destination)}
            >
              <GoLocation />
              <span>{trip.destination?.address}</span>
            </div>
          </div>
        </div>
        {/* <div className="w_ja w_UU" style={{ flex: "1 1 0%" }}>
          <img
            style={{ width: "auto", height: "auto" }}
            src={bgImage}
            alt="custom/toVisitEmpty"
            className="w_fu w_fB w_UV"
          />
        </div> */}
      </div >
    </div >
  );
}
