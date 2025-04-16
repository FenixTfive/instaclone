const initialState = {
  version: "0.0.1",
  auth: {
    token: "",
    userInfo: {},
  },
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_AUTH":
      return {
        ...state,
        auth: {
          token: action.payload.token,
          userInfo: action.payload.userInfo,
        },
      };
    case "RESET_AUTH":
      return {
        ...state,
        auth: {
          token: "",
          userInfo: {},
        },
      };
    default:
      return state;
  }
};
export default authReducer;
