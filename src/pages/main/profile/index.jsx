import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Load from "../../../components/Load";
//import MapComponent from "../../../components/map";
import FutureTrips from "../../../components/profile/FutureTrips";
import Header from "../../../components/profile/Header";
import PastTrips from "../../../components/profile/PastTrips";
//import Map from "../../../components/profile/Map";
// import TabGroup from "../../../components/profile/MapNav/TabGroup";
import SkeletonProfile from "../../../components/SkeletonCard/SkeletonProfile";
import { getMe, getUser } from "../../../store/actions/user.action";
import Err from "../err";

const Profile = () => {
  const { username } = useParams();
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  let futureTrips = [];
  let pastTrips = [];
  useEffect(
    () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (user?.username === username) {
        dispatch(getMe(username, setErrUser));
      } else {
        dispatch(getUser(username, setErrUser));
      }
    },
    // eslint-disable-next-line
    [username]
  );


  const [errUser, setErrUser] = useState(null);
  const { loading } = useSelector((state) => state.common);
  const { users } = useSelector((state) => state.user);

  if (!loading && users) {
    const today = moment(new Date()).format("YYYY-MM-DD");
    futureTrips = users.trips.filter((trip) =>
      moment(today, "YYYY-MM-DD").isBefore(trip.beginDate, "YYYY-MM-DD")
    );
    pastTrips = users.trips.filter((trip) =>
      !moment(today, "YYYY-MM-DD").isBefore(trip.beginDate, "YYYY-MM-DD")
    );
  }

  console.log(futureTrips, pastTrips);
  return (
    <>
      {errUser !== null ? (
        <Err />
      ) : (
        <>
          {loading || !users ? (
            <>
              <SkeletonProfile />
              <Load />
            </>
          ) : (
            <>
              <Header users={users} />
              {/* <TabGroup /> */}
              <FutureTrips trips={futureTrips} users={users} />
              <PastTrips trips={pastTrips} />
              {/* <CountryList /> */}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
