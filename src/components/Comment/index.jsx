// import moment from "moment";
import React, { useCallback, useRef, useState } from "react";
import {
  commentTrip,
  deleteComment,
  replyComment,
  updateComment,
} from "../../services/trip/useTrip";
import styles from "./comment.module.css";
import FormComment from "./formComment";
import InputComment from "./inputComment";

function Comment({ tripId, comments, setComments, currentUser, loadComments }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingReply, setLoadingReply] = useState(false);

  const [updated, setUpdated] = useState();
  const ref = useRef(null);

  const addComment = async () => {
    if (!comment || comment.trim().length === 0) {
      return;
    }
    setLoading(true);

    try {
      const res = await commentTrip(tripId, comment);
      console.log(res);
      if (res.status === 200) {
        await loadComments();
        setComment("");
        // ref.scrollTo({
        //   top: ref.current.scrollHeight,
        //   left: 0,
        //   behavior: "smooth"
        // })
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    } catch (err) {
      console.log("ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = useCallback(
    (comment) => {
      const deleteCmt = async () => {
        const res = await deleteComment(comment.id);
        if (res.status === 200) {
          loadComments();
        }
      };

      deleteCmt();
    },
    // eslint-disable-next-line
    []
  );

  const onUpdate = () => {
    if (!updated || updated.content?.trim().length === 0) {
      return;
    }

    const updateCmt = async () => {
      setLoading(true);
      const res = await updateComment(updated);
      if (res.status === 200) {
        await loadComments();
        setUpdated(null);
      }
      setLoading(false);
    };
    updateCmt();
  };

  const onReply = useCallback(
    async (id, content) => {
      if (!content || content?.trim().length === 0) {
        return;
      }
      setLoadingReply(true);
      const res = await replyComment(id, content);
      if (res.status === 200) {
        await loadComments();
      }
      setLoadingReply(false);

    }, // eslint-disable-next-line
    []
  );

  return (
    <div className={styles.container}>
      <div className={styles.container_comments} ref={ref}>
        {comments.map((comment, index) => (
          <FormComment
            comment={comment}
            onDelete={onDelete}
            onReply={onReply}
            setUpdated={setUpdated}
            popup={true}
            updated={updated}
            key={comment.id}
            loading={loadingReply}
          />
        ))}
      </div>
      <div className={styles.root_input}>
        <InputComment
          avatar={
            currentUser?.profileImageUrl ||
            "https://wrld-se-prod.b-cdn.net/images/user-empty.svg"
          }
          content={comment}
          updated={updated}
          setUpdated={setUpdated}
          setContent={setComment}
          addComment={addComment}
          onUpdate={onUpdate}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default Comment;
