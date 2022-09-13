import React, { useEffect, useState } from "react";
import { storeImageToFireBase } from "../../utils/storeImageToFirebase.";
import { BsUpload } from "react-icons/bs";
// import landscape from "../../assets/images/landscape.jpg";

export default function ImageUpload({ image, handleChangeImage }) {
  const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const style = {
    uploadedImage: {
      height: "100%",
      overflow: "hidden",
    },
    image: {
      width: "35px",
      maxHeight: "35px",
      opacity: "0",
      cursor: "pointer",
      position: "absolute",
      zIndex: "1",
    },
    container: {
      position: "absolute",
      bottom: "20px",
      right: "50px",
    },
    svg: {
      fontSize: "35px",
      cursor: "pointer",
      filter:
        "invert(56%) sepia(17%) saturate(473%) hue-rotate(194deg) brightness(84%) contrast(80%)",
    },
  };

  useEffect(
    () => {
      const uploadImage = async () => {
        setIsLoading(true);
        if (!selectedFile) {
          setIsLoading(false);
          return;
        }
        const { isSuccess, imageUrl, message } = await storeImageToFireBase(
          selectedFile
        );
        console.log("🚀 ", imageUrl);
        if (isSuccess) {
          handleChangeImage(imageUrl);
          setIsLoading(false);
          return imageUrl;
        } else {
          console.log(message);
        }
        setIsLoading(false);
      };
      uploadImage();
    },
    // eslint-disable-next-line
    [selectedFile]
  );
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };
  return (
    <div style={style.uploadedImage}>
      {!image || isLoading ? (
        <img src="images/map4.png" alt="img" />
      ) : (
        <img src={image} alt="img" />
      )}
      <div style={style.container}>
        {isLoading ? (
          <div
            className="loadingio-spinner-ripple-ormwzc5m72e"
            style={{ transform: "translate(10px, 10px)" }}
          >
            <div className="ldio-gw2gg1659v">
              <div />
              <div />
            </div>
          </div>
        ) : (
          <div>
            <input
              style={style.image}
              type="file"
              accept="image/*"
              onChange={onSelectFile}
              id="upload"
            />
            <label
              htmlFor="upload"
              style={{ cursor: "pointer", color: "#ffff" }}
            >
              <div>
                <BsUpload />
              </div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
