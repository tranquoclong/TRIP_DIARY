import { Link, useParams } from "react-router-dom";
import logo from "../../assets/images/logos/logo-3.png";
import styles from "../Header/header.module.css";
import { useEffect, useState } from "react";
import { useIsLogin } from "../../hooks/useIsLogin";
import axios from "axios";

export default function HeaderMeeting() {
  const { id } = useParams();
  const { user } = useIsLogin();
  const [state, setState] = useState({});
  const [trip, setTrip] = useState(null);
  useEffect(
    () => {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/api/user/account`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => {
          setState(res.data);
        })
        .catch((error) => console.log(error));
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/api/trips/${id}`,
      })
        .then((res) => {
          setTrip(res.data);
        })
        .catch((error) => console.log(error));
    },
    // eslint-disable-next-line
    []
  );

  const src =
    state.profileImageUrl == null
      ? "https://wrld-se-prod.b-cdn.net/images/user-empty.svg"
      : state.profileImageUrl;

  return (
    <header>
      <div
        className={styles.header}
        style={{ background: "rgb(24, 25, 26)", boxShadow: "none" }}
      >
        <div className={styles.headerLogo}>
          <div>
            <Link to="/feed">
              <img alt="logo" src={logo} />
            </Link>
          </div>
        </div>
        <div className={styles.menu} style={{ justifyContent: "center" }}>
          {trip && (
            <>
              <p
                style={{ fontSize: 30, color: "aliceblue", fontWeight: "700" }}
              >
                {trip.name}
                <span
                  style={{
                    fontSize: 20,
                    paddingLeft: 15,
                    color: "#999",
                    fontWeight: "700",
                  }}
                >
                  {trip.beginDate}
                </span>
              </p>
            </>
          )}
        </div>
        <div className={styles.profile}>
          <div className={styles.profileList}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link
                to={`/profile/${user.username}`}
                style={{ color: "aliceblue" }}
              >
                <div className={styles.profileIcon}>
                  <img className="w_km" alt="profile" src={src} />
                </div>
                <div>
                  <span>{user.username}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
