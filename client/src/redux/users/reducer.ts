import userTypes from "./types";

const INITIAL_STATE = {
  username: "",
  isAuthenticated: false,
};

const userReducer = (
  state = INITIAL_STATE,
  action: { type: any; payload: any }
) => {
  //console.log(action.payload);
  switch (action.type) {
    case userTypes.SET_USERNAME: {
      return {
        ...state,
        username: action.payload,
        isAuthenticated: action.payload === "" ? false : true,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
