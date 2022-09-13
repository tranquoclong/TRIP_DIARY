import { IoMdAddCircleOutline } from "react-icons/io";
import styles from "../trip.module.css";
import Place from "./place";
import Collapse from "../../../../components/collapse";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_DAY,
  REMOVE_DAY,
  TRIP_MODE,
  UPDATE_DAY,
} from "../../../../store/constants/trip.const";
import { useState } from "react";
import SearchBox from "../../../../components/SearchAddress/SearchBox";

const VisitDay = ({ order, detail }) => {
  const { mode } = useSelector((state) => state.trip);
  const dispatch = useDispatch();
  const [destination, setDestination] = useState({});

  const handleAddDay = () => {
    dispatch({
      type: ADD_DAY,
      payload: {
        order: order + 1,
        day: {
          id: Math.random().toString().substring(2, 9),
          description: "",
          visitPlaces: [],
        },
      },
    });
  };

  const handleAddPlace = (place) => {
    setDestination((prev) => ({
      address: "",
    }));

    const newPlaces = [...detail.visitPlaces];
    newPlaces.push({
      id: Math.random().toString().substring(2, 9),
      description: "",
      address: place.address,
      images: [],
      latitude: place.latitude,
      longitude: place.longitude,
    });
    console.log("order - ", order);
    dispatch({
      type: UPDATE_DAY,
      payload: {
        order: order,
        day: {
          ...detail,
          visitPlaces: newPlaces,
        },
      },
    });
  };
  const handleRemoveDay = () => {
    console.log(order);
    dispatch({
      type: REMOVE_DAY,
      payload: order,
    });
  };

  const handleDayDescription = (description) => {
    dispatch({
      type: UPDATE_DAY,
      payload: {
        order: order,
        day: {
          ...detail,
          description: description,
        },
      },
    });
  };

  const handleRemovePlace = (index) => {
    const newPlaces = [...detail.visitPlaces];
    newPlaces.splice(index, 1);
    dispatch({
      type: UPDATE_DAY,
      payload: {
        order: order,
        day: {
          ...detail,
          visitPlaces: newPlaces,
        },
      },
    });
  };

  const handleChangePlaceDescription = (description, index) => {
    const newPlaces = [...detail.visitPlaces];
    const updatedPlace = {
      ...newPlaces[index],
      description: description,
    };
    newPlaces[index] = updatedPlace;

    dispatch({
      type: UPDATE_DAY,
      payload: {
        order: order,
        day: {
          ...detail,
          visitPlaces: newPlaces,
        },
      },
    });
  };

  const handleAddImage = (url, index) => {
    const newPlaces = [...detail.visitPlaces];
    const updatedPlace = newPlaces[index];
    updatedPlace.images.push({
      description: "",
      url: url,
    });
    newPlaces[index] = updatedPlace;
    dispatch({
      type: UPDATE_DAY,
      payload: {
        order: order,
        day: {
          ...detail,
          visitPlaces: newPlaces,
        },
      },
    });
  };

  const handleRemoveImage = (url, index) => {
    const newPlaces = [...detail.visitPlaces];
    const updatedPlace = newPlaces[index];
    updatedPlace.images = updatedPlace.images.filter((img) => img.url !== url);
    newPlaces[index] = updatedPlace;
    dispatch({
      type: UPDATE_DAY,
      payload: {
        order: order,
        day: {
          ...detail,
          visitPlaces: newPlaces,
        },
      },
    });
  };

  return (
    <div className={styles.containerDay}>
      <Collapse
        isView={mode === TRIP_MODE.VIEW}
        description={detail.description}
        day={detail}
        order={order}
        onRemoveDay={handleRemoveDay}
        onChangeDateDescription={handleDayDescription}
      >
        {detail.visitPlaces && detail.visitPlaces.length !== 0
          ? detail.visitPlaces.map((place, index) => (
              <Place
                place={place}
                key={place.id}
                id={place.id}
                index={index}
                onRemovePlace={handleRemovePlace}
                onChangePlaceDescription={handleChangePlaceDescription}
                onAddImage={handleAddImage}
                onRemoveImage={handleRemoveImage}
                isView={mode === TRIP_MODE.VIEW}
              />
            ))
          : ""}
        <div className={styles.enterPlace}>
          <div className={styles.leftPlace} style={{ paddingLeft: "26px" }}>
            <div className={styles.leftPlace}>
              {mode !== TRIP_MODE.VIEW && (
                <>
                  <div className={styles.leftImg}>
                    <IoMdAddCircleOutline />
                  </div>
                  <div className={styles.rightContainer}>
                    <SearchBox
                      destination={destination}
                      onChangeDestination={handleAddPlace}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Collapse>
      {mode !== TRIP_MODE.VIEW && (
        <div
          className={styles.containerDay}
          style={{ paddingTop: "10px", paddingBottom: 0 }}
        >
          <div className={styles.addADay} onClick={handleAddDay}>
            <div className={styles.aDay}>
              <div className={styles.addDIcon}>
                <IoMdAddCircleOutline />
              </div>
              <div style={{ paddingLeft: "10px" }}>
                <span>Add a Day</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitDay;
