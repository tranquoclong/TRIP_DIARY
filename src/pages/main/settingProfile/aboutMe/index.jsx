import React from "react";
import NoteEditor from "./../../../../components/NoteEditor/index";
import styles from "../settingProfile.module.css";
import classNames from "classnames";
function AboutMe({ profileAboutMe, setProfileAboutMe }) {
  return (
    <div className={classNames(`${styles.boxInput}`, `${styles.w100}`)}>
      <label htmlFor="ome-text-editor"> About me </label>
      <div className={styles.input}>
        <div
          className={classNames(
            `${styles.trumbowygBox}`,
            `${styles.trumbowygEditorVisible}`,
            `${styles.trumbowygEn}`,
            `${styles.trumbowyg}`
          )}
        >
          <NoteEditor html={profileAboutMe || ""} setHtml={setProfileAboutMe} />
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
