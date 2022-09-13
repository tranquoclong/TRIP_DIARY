import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { IoArrowBack } from "react-icons/io5";
// import { MdAdminPanelSettings } from "react-icons/md";
import { useIsHidden } from "../../../hooks/useIsHidden";
import { postLogin } from "./../../../store/actions/user.action";
import styles from "./login.module.css";
import LoginGoogle from "./loginGoogle";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import { validateLogin } from "../../../components/validateInput/validateInput";
import Validate from "../../../components/validateInput";
import useForm from "./../../../components/useForm/useForm";
import { useIsLogin } from "../../../hooks/useIsLogin";
import Load from "../../../components/Load";
function Login() {
  const { hidden, handleClick } = useIsHidden();
  const dispatch = useDispatch();
  const { loading } = useIsLogin();
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validateLogin
  );
  function login() {
    dispatch(postLogin(values.username, values.password));
  }
  return (
    <div>
      <div>
        <div className={styles.container}>
          <img
            src="images/imagelogin1.png"
            alt="custom/travelers-1"
            className={styles.travelers}
            style={{ right: "calc(50% + 350px)" }}
          />
          <img
            src="images/imagelogin2.png"
            alt="custom/travelers-2"
            className={styles.travelers}
            style={{ left: "calc(50% + 350px)" }}
          />
          <div className={styles.logo}>
            <Link to="/">
              <img alt="logo" src="images/3bl.png" />
            </Link>
          </div>
          <div />
          <div className={styles.login}>
            <div
              className={classNames(
                `${styles.formLogin}`,
                hidden && `${styles.formLoginHidden}`
              )}
            >
              <div className={styles.title}>
                <h1>Login</h1>
              </div>
              <Link to="/sign/fb-login" style={{ background: "#4359ac" }}>
                <div className={styles.icons}>
                  <img
                    src="fonts/src_app_components_components_svgIcon_icons_commonsprite-afce76.svg#socials-fbbR-usage"
                    alt="common/socials-fb"
                  />
                </div>
                <div>
                  <span>With Facebook (update soon)</span>
                </div>
              </Link>
              <LoginGoogle />
              {/* <button
                style={{
                  background: "#222",
                  marginBottom: "16px",
                  color: "#fff",
                }}
                onClick={handleClick}
              >
                <div className={styles.icons}>
                  <MdAdminPanelSettings />
                </div>
                <div>
                  <span>With Admin</span>
                </div>
              </button> */}
              <button
                style={{
                  background: "linear-gradient(114deg,#00e1d6,#66ede7)",
                  marginBottom: "16px",
                  color: "#fff",
                }}
                onClick={handleClick}
              >
                <div className={styles.icons}>
                  <img
                    src="fonts/src_app_components_components_svgIcon_icons_commonsprite-afce76.svg#email_fullW-usage"
                    alt="common/email_full"
                  />
                </div>
                <div>
                  <span>With Email</span>
                </div>
              </button>
            </div>
            <div
              className={classNames(
                `${styles.formLoginHidden}`,
                hidden && `${styles.formLoginEmail}`
              )}
            >
              <div className={styles.title}>
                <button className={styles.back} onClick={handleClick}>
                  <div className={styles.icons}>
                    <IoArrowBack />
                    <div>
                      <span>Back</span>
                    </div>
                  </div>
                </button>
                <h1>Login</h1>
              </div>
              <form
                className={styles.loginEmail}
                onSubmit={handleSubmit}
                noValidate
              >
                <div className={styles.input}>
                  <div className={styles.inputEmail}>
                    <input
                      type="text"
                      name="username"
                      placeholder="Fill your email Or UserName address"
                      onChange={handleChange}
                      value={values.username || ""}
                      required
                    />
                    <Validate errors={errors.username} />
                  </div>
                </div>
                <div className={styles.input}>
                  <div className={styles.inputEmail}>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      value={values.password || ""}
                      required
                    />
                    <Validate errors={errors.password} />
                  </div>
                </div>
                {loading ? (
                  <button disabled style={{ opacity: ".4" }}>
                    <span>Log in</span>
                    <Load isSmall={true} />
                  </button>
                ) : (
                  <button>
                    <span>Log in </span>
                  </button>
                )}
              </form>
              <div className={styles.register} style={{ background: "none" }}>
                <Link to="/sign/forgotten-password">
                  <span>Forgot your password?</span>
                </Link>
              </div>
            </div>
            <div className={styles.register}>
              <span>Are you new to Pack&Go?</span>
              <Link to="/signUp">
                <span>Register</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
}

export default Login;
