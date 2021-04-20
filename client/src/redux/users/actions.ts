import userTypes from "./types";

export const setUser = (payload: any) => {
  return {
    type: userTypes.SET_USERNAME,
    info: "Action to set the username",
    payload: payload,
  };
};
