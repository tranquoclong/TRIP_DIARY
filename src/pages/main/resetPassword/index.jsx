import React from "react";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import Load from "../../../components/Load";
import useForm from "../../../components/useForm/useForm";
import Validate from "../../../components/validateInput";
import { validateResetPassword } from "../../../components/validateInput/validateInput";
import { useIsLogin } from "../../../hooks/useIsLogin";
import { postResetPassword } from "../../../store/actions/user.action";
import styles from "../forgotPassword/forgotPassword.module.css";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function ResetPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading } = useIsLogin();
  const query = useQuery();

  const token = query.get("token") || "token";

  const { values, errors, handleChange, handleSubmit } = useForm(
    handleSubmits,
    validateResetPassword
  );
  function handleSubmits() {
    dispatch(postResetPassword(token, values.password, history));
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
              <img alt="Worldee logo" src="images/3bl.png" />
            </Link>
          </div>
          <div />
          <div className={styles.login}>
            <div className={styles.formLogin}>
              <h1>Change password</h1>
              <form
                className={styles.loginEmail}
                onSubmit={handleSubmit}
                noValidate
              >
                <div className={styles.input}>
                  <div className={styles.inputEmail}>
                    <input
                      type="password"
                      name="password"
                      placeholder="Fill your new password"
                      onChange={handleChange}
                      value={values.password || ""}
                      required
                    />
                    <Validate errors={errors.password} />
                  </div>
                </div>
                <div className={styles.input}>
                  <div className={styles.inputEmail}>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Fill your new password"
                      onChange={handleChange}
                      value={values.confirmPassword || ""}
                      required
                    />
                    <Validate errors={errors.confirmPassword} />
                  </div>
                </div>
                {loading ? (
                  <button disabled style={{ opacity: ".4" }}>
                    <span>Save password </span>
                    <Load isSmall={true} />
                  </button>
                ) : (
                  <button>
                    <span>Save password</span>
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
}

export default ResetPassword;
