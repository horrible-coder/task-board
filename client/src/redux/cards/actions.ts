import cardListTypes from "./types";

export const setCardList = (payload: any) => {
  return {
    type: cardListTypes.SET_CARD_LIST,
    info: "Action to set the cardList state",
    payload: payload,
  };
};

export const filterCards = (payload: any) => {
  return {
    type: cardListTypes.FILTER_CARDS,
    info: "Action to filter the cards",
    payload: payload,
  };
};
