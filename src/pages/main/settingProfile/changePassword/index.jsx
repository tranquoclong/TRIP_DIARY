import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import useForm from "../../../../components/useForm/useForm";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import { validateChangePassword } from "../../../../components/validateInput/validateInput";
import { useIsLogin } from "../../../../hooks/useIsLogin";
import { postChangePassword } from "../../../../store/actions/user.action";
import styles from "./changePassword.module.css";
import Validate from "../../../../components/validateInput";
function ChangePassword() {
  const dispatch = useDispatch();
  const { loading } = useIsLogin();
  const { values, errors, handleChange, handleSubmit } = useForm(
    handleSubmits,
    validateChangePassword
  );
  function handleSubmits() {
    dispatch(postChangePassword(values.confirmPassword, values.password));
  }
  return (
    <div className={styles.accountPageContent}>
      <div className={styles.titleHeader}>
        <h1>Password change</h1>
      </div>
      <div className={styles.content}>
        <form onSubmit={handleSubmit} noValidate>
          {/* <div className={styles.boxInput}>
            <label>password</label>
            <div className={styles.inputAnother}>
              <input
                id={styles.frmChangePasswordFormHeslo2}
                type="password"
                name="currentPassword"
                placeholder="currentPassword"
                onChange={handleChange}
                value={values.currentPassword || ""}
                required
              />
              <Validate errors={errors.currentPassword} />
            </div>
          </div> */}
          <div className={styles.boxInput}>
            <label>New password</label>
            <div className={styles.inputAnother}>
              <input
                id={styles.frmChangePasswordFormHeslo2}
                type="password"
                name="password"
                placeholder="New password"
                onChange={handleChange}
                value={values.password || ""}
                required
              />
              <Validate errors={errors.password} />
            </div>
          </div>
          <div className={styles.boxInput}>
            <label>Password confirmation</label>
            <div className={styles.inputAnother}>
              <input
                id={styles.frmChangePasswordFormHeslo3}
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                onChange={handleChange}
                value={values.confirmPassword || ""}
                required
              />
              <Validate errors={errors.confirmPassword} />
            </div>
          </div>
          {loading ? (
            <button
              className={styles.button}
              disabled
              style={{ opacity: ".4" }}
            >
              <span>Save password </span>
              <div className="loadingio-spinner-ripple-ormwzc5m72e">
                <div className="ldio-gw2gg1659v">
                  <div />
                  <div />
                </div>
              </div>
            </button>
          ) : (
            <button className={styles.button}>
              <span>Save password</span>
            </button>
          )}
        </form>
      </div>
      <NotificationContainer />
    </div>
  );
}
export default ChangePassword;
