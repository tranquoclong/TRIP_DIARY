import LandingPage from "../pages/landing";
import Err from "../pages/main/err";
import Feed from "../pages/main/feed";
import ForgotPassword from "../pages/main/forgotPassword";
import Login from "../pages/main/login";
import Trip from "../pages/main/Trip";
import Profile from "../pages/main/profile";
import Register from "../pages/main/register";
import ResetPassword from "../pages/main/resetPassword";
import SearchPage from "../pages/main/search";
import SettingProfile from "../pages/main/settingProfile";
import TripPage from "../pages/main/trippage";
import AllTrips from "../pages/main/alltrips";
import AllTravelers from "../pages/main/alltravelers";
import Dashboard from "../pages/admin/Dashboard";
import Meeting from "../components/Meeting";

export const signRouter = [
  {
    path: "/",
    exact: true,
    Component: LandingPage,
  },
  {
    path: "/login",
    exact: false,
    Component: Login,
  },
  {
    path: "/signUp",
    exact: false,
    Component: Register,
  },
  {
    path: "/sign/forgotten-password",
    exact: false,
    Component: ForgotPassword,
  },
  {
    path: `/user/:slug`,
    exact: false,
    Component: ResetPassword,
  },
];

export const mainRouter = [
  {
    path: "/feed",
    exact: true,
    Component: Feed,
  },
  {
    path: "/profile/:username",
    exact: true,
    Component: Profile,
  },
  {
    path: "/search",
    exact: true,
    Component: SearchPage,
  },
  {
    path: "/alltrips",
    exact: true,
    Component: AllTrips,
  },
  {
    path: "/alltravelers",
    exact: true,
    Component: AllTravelers,
  },
  {
    path: "/trip-page",
    exact: true,
    Component: TripPage,
  },
  {
    path: "/setting",
    exact: true,
    Component: SettingProfile,
  },
  {
    path: "/trip/:id?",
    exact: true,
    Component: Trip,
  },
  {
    path: "/trip/:id?/meeting/:id?",
    exact: true,
    Component: Meeting,
  },
  {
    Component: Err,
  },
];
export const adminRouter = [
  {
    path: "/admin",
    exact: true,
    Component: Dashboard,
  },
];
