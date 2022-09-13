import React, { useState, useRef } from "react";
import styles from "../settingProfile.module.css";
import AboutMe from "../aboutMe";
import { IoFemaleSharp, IoMaleSharp, IoMaleFemaleSharp } from "react-icons/io5";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useIsLogin } from "../../../../hooks/useIsLogin";
import { updateInfo } from "./../../../../store/actions/user.action";
import ImageUpload from "./../imageUpload/index";
import Countries from "./countries.json";
import useOutsideClick from "./../../../../hooks/useOutsideClick";
function AccountInfo({ userSettings }) {
  const dispatch = useDispatch();
  const { loading } = useIsLogin();
  const [userSetting, setUserSetting] = useState(userSettings);
  const [coverImageUrl, setCoverImageUrl] = useState(userSetting.coverImageUrl);
  const [profileImageUrl, setProfileImageUrl] = useState(
    userSetting.profileImageUrl
  );
  const [aboutMe, setAboutMe] = useState(userSetting.aboutMe);
  const [gender, setGender] = useState(userSetting.gender);
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  useOutsideClick(dropdownRef, () => setIsActive(false));
  const handleChange = (event) => {
    const { value, name } = event.target;
    setUserSetting({
      ...userSetting,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateInfo(
        profileImageUrl,
        coverImageUrl,
        aboutMe,
        gender,
        dateOfBirth,
        userSetting
      )
    );
  };
  const onClick = () => {
    setIsActive((prev) => !prev);
  };
  const [dateOfBirth, setDateOfBirth] = useState(() =>
    moment(userSetting.dateOfBirth).format("YYYY-MM-DD")
  );

  const handleDateChange = (d) => {
    if (moment(d).isValid())
      return setDateOfBirth(moment(d).format("YYYY-MM-DD"));
    return setDateOfBirth(moment().format("YYYY-MM-DD"));
  };
  return (
    <form id="frm-accountForm" onSubmit={handleSubmit}>
      <ImageUpload
        defaultImage={"https://wrld-se-prod.b-cdn.net/images/user-empty.svg"}
        imageList={profileImageUrl}
        setImageList={setProfileImageUrl}
        w={true}
      />
      <ImageUpload
        defaultImage={"https://wrld-se-prod.b-cdn.net/images/bezfotky.png"}
        imageList={coverImageUrl}
        setImageList={setCoverImageUrl}
        w={false}
      />

      <div className="clearfix" />
      <div className={styles.boxInput}>
        <label> firstName </label>
        <div className={styles.input}>
          <input
            type="text"
            name="firstName"
            value={userSetting.firstName}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.boxInput}>
        <label> lastName </label>
        <div className={styles.input}>
          <input
            type="text"
            name="lastName"
            value={userSetting.lastName}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.boxInput}>
        <label> Telephone number</label>
        <div className={styles.input}>
          <input
            type="tel"
            name="phoneNumber"
            value={userSetting.phoneNumber}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.boxInput}>
        <label> City </label>
        <div className={styles.input}>
          <input
            type="text"
            name="city"
            className="pac-target-input"
            placeholder="Enter a location"
            value={userSetting.city}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.boxInput}>
        <label> Country </label>
        <div className={styles.input} style={{ height: "auto" }}>
          <input
            type="text"
            name="country"
            className="pac-target-input"
            placeholder="Enter a country"
            value={userSetting.country}
            onChange={handleChange}
          />
          {userSetting.country && (
            <div className={styles.formCountry}>
              {Countries.filter((countries) =>
                countries.country.includes(userSetting.country)
              ).map((c, index) => (
                <div className="f32" key={index}>
                  <div
                    style={{
                      paddingLeft: "40px",
                      width: "100%",
                      textAlign: "left",
                    }}
                    className={`flag ${c.code}`}
                  >
                    {c.country}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.boxInput}>
        <label> Gender </label>
        <div className={styles.input}>
          <button type="button" style={{ display: "flex" }} onClick={onClick}>
            {gender === "MALE" && (
              <>
                <IoMaleSharp />
                <p>MALE</p>
              </>
            )}
            {gender === "FEMALE" && (
              <>
                <IoFemaleSharp />
                <p>FEMALE</p>
              </>
            )}
            {gender === "OTHER" && (
              <>
                <IoMaleFemaleSharp />
                <p>OTHER</p>
              </>
            )}
          </button>
          <div
            ref={dropdownRef}
            style={{ height: "auto" }}
            className={`${styles.formCountry} ${
              isActive ? `${styles.active}` : `${styles.inactive}`
            }`}
          >
            <div className={styles.formLogout}>
              <div className={styles.logout} onClick={() => setGender("MALE")}>
                <div className={styles.logoutContent}>
                  <div className={styles.logoutIcon}>
                    <IoMaleSharp />
                  </div>
                  <div className={styles.logoutTitle}>
                    <span>MALE</span>
                  </div>
                </div>
              </div>
              <div
                className={styles.logout}
                onClick={() => setGender("FEMALE")}
              >
                <div className={styles.logoutContent}>
                  <div className={styles.logoutIcon}>
                    <IoFemaleSharp />
                  </div>
                  <div className={styles.logoutTitle}>
                    <span>FEMALE</span>
                  </div>
                </div>
              </div>
              <div className={styles.logout} onClick={() => setGender("OTHER")}>
                <div className={styles.logoutContent}>
                  <div className={styles.logoutIcon}>
                    <IoMaleFemaleSharp />
                  </div>
                  <div className={styles.logoutTitle}>
                    <span>OTHER</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classNames(`${styles.boxInput}`, `${styles.dateerror}`)}>
        <label>Date of birth</label>
        <div className={classNames(`${styles.input}`, `${styles.triple}`)}>
          <input
            type="date"
            data-date-format="DD/MM/YYYY"
            value={dateOfBirth}
            // min="2022-01-01"
            // max="2022-12-31"
            onKeyDown={(e) => e.preventDefault()}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>
      </div>
      <AboutMe profileAboutMe={aboutMe} setProfileAboutMe={setAboutMe} />
      {loading ? (
        <button
          className={classNames(`${styles.button}`, `${styles.submit}`)}
          id={styles.send}
          style={{ width: "96.5%", opacity: ".4" }}
          disabled
        >
          <span> Save changes </span>
          <div className="loadingio-spinner-ripple-ormwzc5m72e">
            <div className="ldio-gw2gg1659v">
              <div />
              <div />
            </div>
          </div>
        </button>
      ) : (
        <button
          className={classNames(`${styles.button}`, `${styles.submit}`)}
          id={styles.send}
          style={{ width: "96.5%" }}
        >
          <span> Save changes </span>
        </button>
      )}
    </form>
  );
}
export default AccountInfo;
