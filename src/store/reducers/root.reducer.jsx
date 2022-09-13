import { combineReducers } from "redux";
import commonReducer from "./common.reducer";
import mapReducer from "./map.reducer";
import { modalReducer } from "./modal.reducer";
import tripReducer from "./trip.reducer";
import userReducer from "./user.reducer";
const rootReducer = combineReducers({
  user: userReducer,
  common: commonReducer,
  trip: tripReducer,
  map: mapReducer,
  modal: modalReducer,
});

export default rootReducer;
