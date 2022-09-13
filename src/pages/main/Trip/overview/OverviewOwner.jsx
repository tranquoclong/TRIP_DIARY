import { IoNotificationsOutline } from "react-icons/io5";
import Transport from "./transport";
import ImageUpload from "../../../../components/imageUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_DESTINATION,
  SET_NOTIFY_DAY,
  SET_THUMBNAIL,
  SET_TRANSPORTATION,
} from "../../../../store/constants/trip.const";
import styles from "./overview.module.css";
import { IoLocationOutline } from "react-icons/io5";
import warningIcon from "../../../../assets/fonts/src_app_components_components_svgIcon_icons_commonsprite-afce76.svg";
import SearchBox from "../../../../components/SearchAddress/SearchBox";
export default function OverviewOwner() {
  const { trip } = useSelector((state) => state.trip);
  const dispatch = useDispatch();
  const handleChangeThumbnail = (image) => {
    dispatch({
      type: SET_THUMBNAIL,
      payload: image,
    });
  };

  const handleChangeNotifyDay = (e) => {
    dispatch({
      type: SET_NOTIFY_DAY,
      payload: +e.target.value,
    });
  };

  const handelChangeTransportation = (trans) => {
    dispatch({
      type: SET_TRANSPORTATION,
      payload: trans,
    });
  };

  const handleChangeDestination = (destination) => {
    dispatch({
      type: SET_DESTINATION,
      payload: destination,
    });
  };

  return (
    <div className={styles.iTin_wrapper}>
      <div className="w_oz w_CX">
        <div className={`w_aam w_iW ${styles.thumbnail}`}>
          <ImageUpload
            image={trip.thumbnailUrl}
            handleChangeImage={handleChangeThumbnail}
          />
        </div>
        <div className="w_oz w_iX">
          <label className="w_rI w_rS w_UW">Trip’s destination</label>
          <div className={styles.input}>
            <div className={styles.address_container}>
              <IoLocationOutline />
              <div className={styles.address}>{trip?.destination?.address}</div>
            </div>
            <SearchBox
              // style={{ marginLeft: "20px" }}
              destination={trip.destination}
              onChangeDestination={handleChangeDestination}
            />
          </div>
          <label className="w_rI w_rS w_UW">Announce me before (days)</label>
          <div className="w_oz w_UX">
            <div className={styles.input_day}>
              <IoNotificationsOutline />
              <select
                value={trip.notifyBefore ? trip.notifyBefore : 0}
                className={styles.notify_input}
                onChange={handleChangeNotifyDay}
              >
                <option value={0}>
                  When do you want to notify about the trip?
                </option>
                <option value={1}>before 1 day</option>
                <option value={2}>before 2 days</option>
                <option value={3}>before 3 days</option>
                <option value={4}>before 4 days</option>
                <option value={5}>before 5 days</option>
                <option value={6}>before 6 days</option>
                <option value={7}>before 7 days</option>
              </select>
            </div>
          </div>
          <Transport
            transportation={trip.transportation}
            onChangeTransportation={handelChangeTransportation}
          />
          <div
            className="w_ja w_UU"
            style={{ flex: "1 1 0%", paddingTop: "100px" }}
          >
            {/* <img
              style={{ width: "auto", height: "auto" }}
              src="images/map4.png"
              alt="custom/toVisitEmpty"
              className="w_fu w_fB w_UV"
            /> */}
            <div className="w_Eb w_Ee">
              <div className="w_Ej">
                <img
                  src={warningIcon}
                  alt="common/info_full"
                  className="w_fu w_fz w_El w_fM"
                />
                <div className="w_Em">
                  First, fill in the places you want to visit. Then you will be
                  able to easily move them to the itinerary.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
