import { Component } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "./settingProfile.module.css";
import Tabs from "./tabSettingProfile/tabs";
import { FaUserCircle, FaUnlockAlt } from "react-icons/fa";
import MyAccount from "./myAccount";
import ChangePassword from "./changePassword";

class SettingProfile extends Component {
  render() {
    return (
      <div className={styles.pageContent}>
        <div className={styles.accountPage}>
          <div className={styles.container}>
            <Tabs>
              <div label="My account" Icon={FaUserCircle}>
                <MyAccount />
              </div>
              <div label="Password change" Icon={FaUnlockAlt}>
                <ChangePassword />
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}
export default SettingProfile;
