import { Link } from "react-router-dom";
import logo from "../../assets/images/logos/logo-black-3.png";
import styles from "./header.module.css";
export default function HeaderNotLogin() {
  return (
    <header>
      <div className={styles.header}>
        <div className={styles.headerLogo}>
          <div>
            <Link to="/">
              <img alt="logo" src={logo} />
            </Link>
          </div>
        </div>
        <div className={styles.menu}></div>
        <div className={styles.profile}>
          <div className={styles.profileList}>
            <div
              className={styles.headerNotLogin}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Link to="/login" style={{ color: "#202d3d" }}>
                <div>
                  <span>login</span>
                </div>
              </Link>
              <Link to="/sign/up" style={{ background: "#202d3d" }}>
                <div>
                  <span>Join Pack&Go</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
