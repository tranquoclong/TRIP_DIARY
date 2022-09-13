import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { IoDocumentText, IoTrashSharp, IoImage } from "react-icons/io5";
// import { ImLocation } from "react-icons/im";
import { storeImageToFireBase } from "../../../../utils/storeImageToFirebase.";
import styles from "./Place.module.css";
import placeholder from "../../../../assets/images/placeholder.jpg";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { SET_LOCATION } from "../../../../store/constants/map.const";
import OrderedMarker from "./OrderedMarker";
const Place = ({
  id,
  place,
  index,
  onRemovePlace,
  onChangePlaceDescription,
  onAddImage,
  onRemoveImage,
  isView,
}) => {
  const [description, setDescription] = useState(place.description || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log("🚀", isLoading);
  const ref = useRef();
  const dispatch = useDispatch();

  useEffect(
    () => {
      const timer = setTimeout(() => {
        onChangePlaceDescription(description, index);
      }, 1000);
      return () => clearTimeout(timer);
    },
    // eslint-disable-next-line
    [description]
  );

  console.log("CHANGE", id);

  useEffect(
    () => {
      //preview;
      const uploadImage = async () => {
        setIsLoading(true);
        if (!selectedFile) {
          setIsLoading(false);
          return;
        }
        const { isSuccess, imageUrl, message } = await storeImageToFireBase(
          selectedFile
        );
        if (isSuccess) {
          onAddImage(imageUrl, index);
        } else {
          console.log(message);
        }
        setIsLoading(false);
      };

      uploadImage(index);
    },
    // eslint-disable-next-line
    [selectedFile]
  );

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }

    setSelectedFile(e.target.files[0]);
    ref.current.value = null;
  };

  const onChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className={styles.place}>
      <div className={styles.place_inner}>
        <div className={styles.leftPlace} style={{ padding: "0 26px" }}>
          <div className={styles.leftImg} style={{ color: "#00e1d6" }}>
            <OrderedMarker order={index + 1} />
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.rightCenter}>
              <div
                className={styles.rightFlex}
                onClick={() => {
                  dispatch({
                    type: SET_LOCATION,
                    payload: place,
                  });
                }}
              >
                {place.address}
              </div>
              {!isView && (
                <div className={styles.action}>
                  <div className={styles.icon_wrapper}>
                    <input
                      ref={ref}
                      type="file"
                      id={`upload-${id}`}
                      hidden
                      onChange={onSelectFile}
                    />
                    <label htmlFor={`upload-${id}`}>
                      <IoImage className={styles.icon} />
                    </label>
                  </div>
                  <div className={styles.icon_wrapper}>
                    <IoTrashSharp
                      className={styles.icon}
                      onClick={() => onRemovePlace(index)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.write}>
        <div style={{ padding: "5.5px 10px 5.5px 80px", display: "flex" }}>
          <IoDocumentText style={{ fontSize: "25px" }} />
          <input
            type="text"
            placeholder="Write a description for this place"
            value={description}
            onChange={onChange}
            disabled={isView}
          ></input>
        </div>
      </div>
      <div className={styles.images_wrapper}>
        <div className={styles.images}>
          {place.images &&
            place.images.length !== 0 &&
            place.images.map((image, idx) => (
              <div key={image.url} className={styles.image}>
                {!isView && (
                  <div
                    className={styles.remove_image_wrapper}
                    onClick={() => onRemoveImage(image.url, index)}
                  >
                    <AiOutlineCloseCircle className={styles.remove_image} />
                  </div>
                )}
                <img src={image?.url || placeholder} alt="img" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Place;
