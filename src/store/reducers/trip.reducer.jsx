import {
  ADD_DAY,
  ADD_TRIPMATE,
  CHANGE_MODE,
  REMOVE_DAY,
  REMOVE_TRIPMATE,
  SET_CONCURRENCY_UNIT,
  SET_DATE,
  SET_DESCRIPTION,
  SET_DESTINATION,
  SET_NOTE,
  SET_NOTIFY_DAY,
  SET_PREPARED_LIST,
  SET_PRICE_LIST,
  SET_THUMBNAIL,
  SET_TRANSPORTATION,
  SET_TRIP,
  SET_TRIP_ID,
  SET_TRIP_NAME,
  SET_TRIP_STATUS,
  TRIP_MODE,
  UPDATE_DAY,
} from "../constants/trip.const";

export const tripInitialState = {
  mode: TRIP_MODE.CREATE,
  trip: {
    name: null,
    beginDate: null,
    endDate: null,
    description: null,
    concurrencyUnit: "$",
    destination: null,
    note: null,
    notifyBefore: 0,
    preparedList: [],
    priceList: [],
    status: "private",
    thumbnailUrl: null,
    transportation: "plane",
    visitDays: [
      // {
      //     "dayNumber": 0,
      //     "description": "string",
      //     "visitPlaces": [
      //         {
      //             "description": "string",
      //             "images": [
      //                 {
      //                     "description": "string",
      //                     "url": "string"
      //                 }
      //             ],
      //             "latitude": 0,
      //             "longitude": 0
      //         }
      //     ]
      // }
    ],
    tripMates: [],
  },
  error: null,
};

const tripReducer = (state = tripInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_TRIP_NAME: {
      const newTripSate = {
        ...state,
        trip: {
          ...state.trip,
          name: payload,
        },
      };
      return newTripSate;
    }
    case SET_DATE: {
      const newTripSate = {
        ...state,
        trip: {
          ...state.trip,
          beginDate: payload.beginDate,
          endDate: payload.endDate,
        },
      };
      return newTripSate;
    }
    case SET_TRIP_STATUS: {
      const newTripSate = {
        ...state,
        trip: {
          ...state.trip,
          status: payload,
        },
      };
      return newTripSate;
    }
    case SET_THUMBNAIL: {
      const newTripSate = {
        ...state,
        trip: {
          ...state.trip,
          thumbnailUrl: payload,
        },
      };
      return newTripSate;
    }
    case SET_NOTIFY_DAY: {
      const newTripSate = {
        ...state,
        trip: {
          ...state.trip,
          notifyBefore: +payload,
        },
      };
      return newTripSate;
    }
    case SET_TRANSPORTATION: {
      const newTripSate = {
        ...state,
        trip: {
          ...state.trip,
          transportation: payload,
        },
      };
      return newTripSate;
    }
    case SET_DESCRIPTION: {
      const newTripSate = {
        ...state,
        trip: {
          ...state.trip,
          description: payload,
        },
      };
      return newTripSate;
    }
    case SET_DESTINATION: {
      const newTripSate = {
        ...state,
        trip: {
          ...state.trip,
          destination: payload,
        },
      };
      return newTripSate;
    }
    case ADD_DAY: {
      const newDays = state.trip.visitDays;
      newDays.splice(payload.order, 0, payload.day);
      const newTripSate = {
        ...state,
        trip: {
          ...state.trip,
          visitDays: newDays,
        },
      };
      return newTripSate;
    }
    case UPDATE_DAY: {
      const newDays = [...state.trip.visitDays];
      newDays[payload.order] = payload.day;
      const newTripSate = {
        ...state,
        trip: {
          ...state.trip,
          visitDays: newDays,
        },
      };
      return newTripSate;
    }
    case REMOVE_DAY: {
      const newDays = state.trip.visitDays;
      newDays.splice(payload, 1);
      console.log(newDays);
      const newTripSate = {
        ...state,
        trip: {
          ...state.trip,
          visitDays: newDays,
        },
      };
      return newTripSate;
    }
    case SET_PREPARED_LIST: {
      return {
        ...state,
        trip: {
          ...state.trip,
          preparedList: payload,
        },
      };
    }
    case SET_PRICE_LIST: {
      return {
        ...state,
        trip: {
          ...state.trip,
          priceList: payload,
        },
      };
    }
    case SET_NOTE: {
      return {
        ...state,
        trip: {
          ...state.trip,
          note: payload,
        },
      };
    }
    case SET_CONCURRENCY_UNIT: {
      return {
        ...state,
        trip: {
          ...state.trip,
          concurrencyUnit: payload,
        },
      };
    }
    case SET_TRIP: {
      return {
        ...state,
        mode: payload.mode,
        trip: payload.trip,
      };
    }
    case SET_TRIP_ID: {
      return {
        ...state,
        trip: {
          ...state.trip,
          id: payload,
        },
      };
    }
    case CHANGE_MODE:
      return {
        ...state,
        mode: payload,
      };
    case ADD_TRIPMATE:
      const newTripmates = state.trip.tripMates || [];
      newTripmates.push(payload);
      return {
        ...state,
        trip: {
          ...state.trip,
          tripMates: newTripmates,
        },
      };
    case REMOVE_TRIPMATE:
      const nTripmates = state.trip.tripMates.filter(
        (item) => item !== payload
      );
      console.log("NEW: ", nTripmates);
      return {
        ...state,
        trip: {
          ...state.trip,
          tripMates: nTripmates,
        },
      };
    default:
      return state;
  }
};

export default tripReducer;
