import { combineReducers } from "redux";
import cardListReducer from "./cards/reducer";
import userReducer from "./users/reducer";

const rootReducer = combineReducers({
  cardList: cardListReducer,
  username: userReducer,
});

export default rootReducer;
