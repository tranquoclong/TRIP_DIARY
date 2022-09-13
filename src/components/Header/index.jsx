import { Link, useHistory } from "react-router-dom";
import {
  IoEarthSharp,
  IoSearch,
  IoLocationSharp,
  IoNotifications,
} from "react-icons/io5";
import logo from "../../assets/images/logos/logo-black-3.png";
import FormLogout from "./formLogout";
import styles from "./header.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useIsLogin } from "../../hooks/useIsLogin";
import NotificationBox from "../NotificationBox";
import { useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";
import { actLogout } from "../../store/actions/user.action";

const SIZE = 5;

export default function Header() {
  const dispatch = useDispatch();
  const [notificationActive, setNotificationActive] = useState(false);
  const [notifications, setNotifications] = useState(null);
  const { user } = useIsLogin();
  const [state, setState] = useState({});
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isReachingEnd, setIsReachingEnd] = useState(false);

  const history = useHistory();
  useEffect(
    () => {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/users/${user.username}/trips`
        )
        .then((res) => {
          const persons = res.data;
          setState(persons);
        })
        .catch((error) => console.log(error));
    },
    // eslint-disable-next-line
    []
  );

  useEffect(
    () => {
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/notifications?page=${page}&size=${SIZE}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((res) => {
          setNotifications((prev) =>
            prev ? [...prev, ...res.data.data] : res.data.data
          );
          setLoading(false);
          if (page === res.data.total) {
            setIsReachingEnd(true);
          }
        })
        .catch((error) => {
          setLoading(false);
          dispatch(actLogout());
          NotificationManager.error("session has expired please login again");
        });
    },
    // eslint-disable-next-line
    [page]
  );

  const onSearch = (e) => {
    e.preventDefault();
    if (!text || text.length === 0) {
      return;
    }
    setText("");
    history.push(`/search?text=${text}`);
  };

  const src =
    state.profileImageUrl == null
      ? "https://wrld-se-prod.b-cdn.net/images/user-empty.svg"
      : state.profileImageUrl;

  const numOfUnRead = notifications?.filter((item) => !item.read).length || 0;

  return (
    <header>
      <div className={styles.header}>
        <div className={styles.headerLogo}>
          <div>
            <Link to="/feed">
              <img alt="logo" src={logo} />
            </Link>
          </div>
        </div>
        <div className={styles.menu}>
          <form
            onSubmit={onSearch}
            className={styles.search}
            aria-describedby="popup-1"
          >
            <div className={styles.searchAll}>
              <div className={styles.searchInput}>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  type="text"
                  placeholder="Search here..."
                />
              </div>
              <div className={styles.searchIcon}>
                <button type="submit">
                  <div>
                    <div style={{ color: "#343a40" }}>
                      <IoSearch />
                    </div>
                    <span />
                  </div>
                </button>
              </div>
            </div>
          </form>
          <div className={styles.grow} />
          <Link to="/">
            <div className={styles.menuIcon}>
              <IoEarthSharp />
            </div>
            <span>Home</span>
          </Link>
          <Link to="/trip">
            <div className={styles.menuIcon}>
              <IoLocationSharp />
            </div>
            <span>Create</span>
          </Link>
          <div
            className={styles.menuButton}
            aria-describedby="popup-3"
            style={{ position: "relative" }}
          >
            <button onClick={() => setNotificationActive((prev) => !prev)}>
              <div className={styles.menuIcon}>
                <IoNotifications />
                {numOfUnRead !== 0 && (
                  <span className={styles.unread}>{numOfUnRead}</span>
                )}
              </div>
              <span>Notifications</span>
            </button>
            <NotificationBox
              isActive={notificationActive}
              setIsActive={setNotificationActive}
              notifications={notifications}
              setNotifications={setNotifications}
              setPage={setPage}
              loading={loading}
              isReachingEnd={isReachingEnd}
            />
          </div>
        </div>
        <div className={styles.profile}>
          <div className={styles.profileList}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link to={`/profile/${user.username}`}>
                <div className={styles.profileIcon}>
                  <img className="w_km" alt="profile" src={src} />
                </div>
                <div>
                  <span>{user.username}</span>
                </div>
              </Link>
              <FormLogout />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
