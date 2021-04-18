import { combineReducers } from "redux";
import cardListReducer from "./cards/reducer";

const rootReducer = combineReducers({
  cardList: cardListReducer,
});

export default rootReducer;
