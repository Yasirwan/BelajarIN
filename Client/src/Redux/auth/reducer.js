import * as types from "./types";
const TOKEN = localStorage.getItem("token");
const initialState = {
  userLogin: { loading: false, error: false, message: "" },
  data: {
    isAuthenticated: !!TOKEN,
    token: TOKEN,
    user: null,
  },
};
export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.LOGIN_STUDENT_REQUEST ||
      types.LOGIN_ADMIN_REQUEST ||
      types.LOGIN_TUTOR_REQUEST:
      return {
        ...state,
        userLogin: { loading: true, error: false },
      };
    case types.LOGIN_STUDENT_SUCCESS ||
      types.LOGIN_ADMIN_SUCCESS ||
      types.LOGIN_TUTOR_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        userLogin: { loading: false, error: false, message: payload.message },
        data: {
          isAuthenticated: payload.token ? true : false,
          token: payload.token,
          user: payload.user,
        },
      };
    case types.LOGIN_STUDENT_ERROR ||
      types.LOGIN_ADMIN_ERROR ||
      types.LOGIN_TUTOR_ERROR:
      return {
        ...state,
        userLogin: { loading: false, error: true, message: payload.message },
      };

    case types.AUTH_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        userLogin: { loading: false, error: false, message: "" },
        data: {
          isAuthenticated: false,
          token: null,
          user: null,
        },
      };
    default:
      return state;
  }
}