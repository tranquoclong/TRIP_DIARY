import React, { useEffect, useState } from "react";
import Tab from "./tab";
import styles from "./Tabs.module.css";
import { FcLikePlaceholder, FcLike, FcComments, FcShare } from "react-icons/fc";
import { FacebookShareButton } from "react-share";
import Comment from "../Comment";
import { useSelector } from "react-redux";
import { TRIP_MODE } from "../../store/constants/trip.const";
import {
  getComments,
  getUsersLiked,
  likeTrip,
  unlikeTrip,
} from "../../services/trip/useTrip";
import { useHistory } from "react-router-dom";

function Tabs(props) {
  const [activeTab, setActiveTab] = useState(props.children[0].props.label);
  const { user } = useSelector((state) => state.user);
  const [formComment, setFormComment] = useState(false);
  const { trip, mode } = useSelector((state) => state.trip);
  const [numOfLikes, setNumOfLikes] = useState(trip.numOfLikes);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);

  const history = useHistory();

  const loadComments = async () => {
    if (trip.id) {
      const cms = await getComments(trip.id);

      setComments(cms);
    }
  };

  useEffect(() => {
    setNumOfLikes(trip.numOfLikes);
  }, [trip.numOfLikes]);

  useEffect(
    () => {
      loadComments();
      loadLike();
    },
    // eslint-disable-next-line
    [trip.id]
  );

  const loadLike = async () => {
    const likedUsers = await getUsersLiked(trip.id);
    if (likedUsers.find((item) => item.username === user.username)) {
      setLiked(true);
    }
  };

  const onClickTabItem = (tab) => {
    setActiveTab(tab);
  };

  const onClickLikeTrip = async () => {
    if (!user) {
      history.push("/login");
      return;
    }
    try {
      if (liked) {
        const res = await unlikeTrip(trip.id);
        if (res.status === 200) {
          setNumOfLikes((prev) => prev - 1);
          setLiked(false);
        }
      } else {
        const res = await likeTrip(trip.id);
        if (res.status === 200) {
          setNumOfLikes((prev) => prev + 1);
          setLiked(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const shareTrip = () => {
    if (!user) {
      history.push("/login");
      return;
    }
  };

  const countNumOfComments = () => {
    if (!comments) {
      return 0;
    }
    let count = comments.length;
    comments.forEach((cmt) => {
      count += cmt.extraComment && cmt.extraComment.length;
    });

    return count;
  };

  return (
    <div className="w_CS" style={{ minWidth: "fit-content" }}>
      <div style={{ background: "#071125" }} className={styles.tabs}>
        {props.children.map((child) => {
          const { label, Icon } = child.props;
          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={onClickTabItem}
              Icon={Icon}
            />
          );
        })}
      </div>
      <div style={{ flex: "1 1", display: "flex", flexDirection: "column" }}>
        {props.children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
        {mode !== TRIP_MODE.CREATE && (
          <div style={{ borderTop: "1px solid #d0d8e6" }}>
            <div style={{ display: "flex" }}>
              <div className={styles.interactive} style={{ display: "flex" }}>
                <button onClick={onClickLikeTrip}>
                  <div>{liked ? <FcLike /> : <FcLikePlaceholder />}</div>
                  <span>{numOfLikes}</span>
                </button>
                <button
                  onClick={() => {
                    if (!user) {
                      history.push("/login");
                      return;
                    }
                    setFormComment(!formComment);
                  }}
                >
                  <div>
                    <FcComments />
                  </div>
                  <span>{countNumOfComments()}</span>
                </button>
                {!user ? (
                  <button onClick={shareTrip}>
                    <div>
                      <FcShare />
                    </div>
                  </button>
                ) : (
                  <FacebookShareButton
                    url={`https://daihoc.fpt.edu.vn/tag/fptu`}
                    hashtag={"#pack&go"}
                  >
                    <div>
                      <FcShare />
                    </div>
                  </FacebookShareButton>
                )}
              </div>
            </div>
            {user && formComment && (
              <Comment
                loadComments={loadComments}
                tripId={trip.id}
                currentUser={user}
                comments={comments}
                setComments={setComments}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tabs;
