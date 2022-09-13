import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./comment.module.css";
import InputComment from "./inputComment";

function FormComment({
  isSub = false,
  comment,
  onDelete,
  onReply,
  setUpdated,
  popup,
  updated,
  loading
}) {
  const [popupReply, setPopupReply] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [replyContent, setReplyContent] = useState("");

  return (
    <div className={styles.formComment}>
      <div className={styles.comment}>
        <Link to={`/profile/${comment.username}`}>
          <img
            alt="profile"
            src={
              comment.avatar ||
              "https://wrld-se-prod.b-cdn.net/images/user-empty.svg"
            }
          />
        </Link>
      </div>
      <div className={styles.comment_right}>
        <div className={styles.content_box}>
          <div className={styles.content}>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Link to={`/profile/${comment.username}`}>
                  <span style={{ marginRight: "8px" }}>{comment.username}</span>
                </Link>
                <p>{comment.time}</p>
              </div>
              <div className={styles.main}>{comment.content}</div>
            </div>
          </div>
          <div
            className={styles.comment_actions}
            style={{ display: "inline-flex" }}
          >
            {!isSub && (
              <button onClick={() => setPopupReply(!popupReply)}>
                <span>Reply</span>
              </button>
            )}
            {comment.username === user.username && (
              <>
                <button onClick={() => onDelete(comment)}>
                  <span>Delete</span>
                </button>
                <button onClick={() => setUpdated(comment)}>
                  <span>Edit</span>
                </button>
              </>
            )}
          </div>
        </div>
        {comment.extraComment === undefined ? (
          <></>
        ) : (
          comment.extraComment.map((comment, index) => (
            <FormComment
              key={index}
              isSub={true}
              comment={comment}
              onDelete={onDelete}
              onReply={onReply}
              popup={false}
              setUpdated={setUpdated}
            />
          ))
        )}
        {popupReply && (
          <div style={{ marginBottom: "20px" }}>
            <InputComment
              loading={loading}
              content={replyContent}
              setContent={setReplyContent}
              avatar={
                user.avatar ||
                "https://wrld-se-prod.b-cdn.net/images/user-empty.svg"
              }
              addComment={async () => {
                if (!replyContent || replyContent.trim().length === 0) {
                  return;
                }
                await onReply(comment.id, replyContent);
                setReplyContent("");
                setPopupReply(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default FormComment;
