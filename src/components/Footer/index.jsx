import styles from "./footer.module.css";
import logo from "../../assets/images/logos/logo-black-3.png";

import {
  IoLogoFacebook,
  IoLogoGoogle,
  IoLogoGithub,
  IoLogoFigma,
} from "react-icons/io5";
export default function Footer() {
  return (
    <footer>
      <div className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.col}>
            <a href="/" className={styles.footerLogo}>
              <img alt="Worldee logo" src={logo} />
            </a>
          </div>
          <div className={styles.col}>
            <h2>Company</h2>
            <a href="/homepage/about">
              <div>
                <span>About Us</span>
              </div>
            </a>
            <a href="https://blog.worldee.com/">
              <div>
                <span>Blog</span>
              </div>
            </a>
            <a href="/homepage/contact">
              <div>
                <span>Contact</span>
              </div>
            </a>
          </div>
          <div className={styles.col}>
            <h2>Useful Links</h2>
            <a href="/doc/privacy-policy">
              <div>
                <span>Privacy Policy</span>
              </div>
            </a>
            <a href="/doc/terms">
              <div>
                <span>Terms &amp; Conditions</span>
              </div>
            </a>
            <a href="/page/verified-itineraries">
              <div>
                <span>Verified Itineraries</span>
              </div>
            </a>
            <a href="/page/community">
              <div>
                <span>Community</span>
              </div>
            </a>
            <a href="/page/ambassador">
              <div>
                <span>Ambassadors</span>
              </div>
            </a>
            <a href="/page/buddy">
              <div>
                <span>Travel Buddies</span>
              </div>
            </a>
          </div>
          <div className={styles.col}>
            <h2>Find us at</h2>
            <a
              href="/"
              rel="noopener"
              target="_blank"
              className={styles.socialIcons}
            >
              <IoLogoFacebook />
            </a>
            <a
              href="/"
              rel="noopener"
              target="_blank"
              className={styles.socialIcons}
            >
              <IoLogoFigma />
            </a>
            <a
              href="/"
              rel="noopener"
              target="_blank"
              className={styles.socialIcons}
            >
              <IoLogoGithub />
            </a>
            <a
              href="/"
              rel="noopener"
              target="_blank"
              className={styles.socialIcons}
            >
              <IoLogoGoogle />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
