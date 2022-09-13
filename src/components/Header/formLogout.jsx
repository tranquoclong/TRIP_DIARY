import { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";
import {
  IoSettingsOutline,
  IoLogOutOutline,
  IoChevronDownOutline,
} from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { useDetectOutsideClick } from "../useDetectOutsideClick";
import { actLogout } from "../../store/actions/user.action";
import { useDispatch } from "react-redux";
import { useIsLogin } from "../../hooks/useIsLogin";

export default function FormLogout() {
  const dispatch = useDispatch();
  const { isLoginToAdmin } = useIsLogin();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  function handleLogout(e) {
    e.preventDefault();
    dispatch(actLogout());
  }

  return (
    <div>
      <button onClick={onClick}>
        <div className={styles.profileIcon}>
          <div className={styles.dropdown}>
            <IoChevronDownOutline />
          </div>
        </div>
        <span />
      </button>
      <div
        ref={dropdownRef}
        className={`${styles.popupContent} ${
          isActive ? `${styles.active}` : "inactive"
        }`}
        style={{ right: "24px" }}
      >
        <div className={styles.dropdownTop} style={{ left: "90% " }}>
          <svg
            data-testid="arrow"
            className={styles.popupArrow}
            viewBox="0 0 32 16"
            style={{ position: "absolute" }}
          >
            <path d="M16 0l16 16H0z" fill="currentcolor" />
          </svg>
        </div>
        <div className={styles.formLogout}>
          {isLoginToAdmin === 2 && (
            <div className={styles.logout}>
              <div className={styles.logoutContent}>
                <Link to="/admin">
                  <div className={styles.logoutIcon}>
                    <MdAdminPanelSettings />
                  </div>
                  <div className={styles.logoutTitle}>
                    <span>Dashboard</span>
                  </div>
                </Link>
              </div>
            </div>
          )}
          <div className={styles.logout}>
            <div className={styles.logoutContent}>
              <Link to="/setting">
                <div className={styles.logoutIcon}>
                  <IoSettingsOutline />
                </div>
                <div className={styles.logoutTitle}>
                  <span>Settings</span>
                </div>
              </Link>
            </div>
          </div>
          <div className={styles.logout}>
            <div className={styles.logoutContent}>
              <Link
                to="/"
                className={styles.logoutTitle}
                onClick={handleLogout}
              >
                <div className={styles.logoutIcon}>
                  <IoLogOutOutline />
                </div>
                <div className={styles.logoutTitle}>
                  <span>Log out</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
