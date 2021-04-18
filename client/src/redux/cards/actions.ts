import cardListTypes from "./types";

export const setCardList = (payload: any) => {
  return {
    type: cardListTypes.SET_CARD_LIST,
    info: "Action to set the cardList state",
    payload: payload,
  };
};
