import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListTrip } from "../../store/actions/user.action";
import TripItem from "./../TripItem/TripItem";
import { useIsLogin } from "./../../hooks/useIsLogin";
import SkeletonTripItem from "../SkeletonCard/SkeletonTripItem";
export default function RenderTripItem() {
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(getListTrip(page));
    },
    // eslint-disable-next-line
    []
  );
  const { listTrip } = useSelector((state) => state.user);
  const { loading } = useIsLogin();
  const [page, setPage] = useState(1);
  console.log("🚀 ~ file", page);
  const onClick = () => setPage(page + 1);
  return loading ? (
    <div className="w_cw">
      <div className="w_cW w_cX ">
        <div className="w_cx">
          <SkeletonTripItem />
        </div>
      </div>
    </div>
  ) : (
    <div className="w_cw">
      <div className="w_cW w_cX ">
        <div className="w_cx">
          {listTrip.slice(0, 9).map((listTrip, index) => (
            <TripItem listTrip={listTrip} key={index} />
          ))}
        </div>
        <div className="w_i-" style={{ justifyContent: "center" }}>
          <button
            onClick={onClick}
            className="w_ih w_ik w_cy"
            style={{ width: "auto" }}
          >
            <span className="w_ia">Load More</span>
          </button>
        </div>
      </div>
    </div>
  );
}
