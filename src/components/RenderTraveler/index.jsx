import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getListUser } from "../../store/actions/user.action";
import Traveler from "./../Traveller/traveler";
import SkeletonTraveler from "../SkeletonCard/SkeletonTraveler";
import { useIsLogin } from "./../../hooks/useIsLogin";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  row-gap: 20px;
  column-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  margin: auto;
  justify-content: start;
`;
export default function RenderTraveler() {
  const dispatch = useDispatch();
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isLogin } = useIsLogin();
  useEffect(
    () => {
      dispatch(
        getListUser(page, userList, setUserList, setTotalPages, setLoading, 4)
      );
    },
    // eslint-disable-next-line
    [page]
  );

  return userList.length === 0 ? (
    <Grid>
      <SkeletonTraveler />
    </Grid>
  ) : (
    <>
      <Grid>
        {userList
          .sort(function (a, b) {
            return b.trips.length - a.trips.length;
          })
          .map((listUser, index) => {
            return <Traveler listUser={listUser} key={index} />;
          })}
      </Grid>
      {isLogin && (
        <div
          className="w_i-"
          style={{ justifyContent: "center", marginTop: "35px" }}
        >
          {loading ? (
            <button
              disabled
              className="w_ih w_ik w_cy"
              style={{ width: "auto" }}
            >
              <span className="w_ia">Load More</span>
              <div className="loadingio-spinner-ripple-ormwzc5m72e">
                <div className="ldio-gw2gg1659v">
                  <div />
                  <div />
                </div>
              </div>
            </button>
          ) : (
            <>
              {totalPages !== page && (
                <button
                  onClick={() => setPage(page + 1, setLoading(true))}
                  className="w_ih w_ik w_cy"
                  style={{ width: "auto" }}
                >
                  <span className="w_ia">Load More</span>
                </button>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
