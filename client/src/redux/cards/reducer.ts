import cardListTypes from "./types";

const INITIAL_STATE = {
  cardList: [],
};

const cardListReducer = (
  state = INITIAL_STATE,
  action: { type: any; payload: any }
) => {
  //console.log(action.payload);
  switch (action.type) {
    case cardListTypes.SET_CARD_LIST: {
      return {
        ...state,
        cardList: action.payload,
      };
    }
    default:
      return state;
  }
};

export default cardListReducer;
