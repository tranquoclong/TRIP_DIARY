import React from "react";
import { Link } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import styles from "./comment.module.css";

function InputComment({
  avatar,
  content,
  updated,
  setUpdated,
  setContent,
  addComment,
  onUpdate,
  loading,
}) {
  return (
    <>
      {!updated ? (
        <div className={styles.formComment}>
          <div className={styles.comment}>
            <Link to="/">
              <img alt="comment-trip-diary" src={avatar} />
            </Link>
          </div>
          <div className={styles.comment_box}>
            <input
              type="text"
              value={content || ""}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Enter comment..."
            />
            <div>
              {loading ? (
                <p>Sending...</p>
              ) : (
                <button onClick={addComment}>
                  <IoSend />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.formComment}>
          <div className={styles.comment}>
            <Link to="/">
              <img
                alt="profile"
                src={
                  avatar ||
                  "https://wrld-se-prod.b-cdn.net/images/user-empty.svg"
                }
              />
            </Link>
          </div>
          <div className={styles.comment_box}>
            <input
              type="text"
              value={updated.content}
              onChange={(event) =>
                setUpdated({
                  ...updated,
                  content: event.target.value,
                })
              }
              placeholder="Enter comment..."
            />
            <div>
              {loading ? (
                <p>Sending...</p>
              ) : (
                <button onClick={onUpdate}>
                  <IoSend />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InputComment;
