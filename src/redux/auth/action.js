import { auth } from "./constant";

export const loginAction = (data) => ({
  type: auth.LOGIN,
  payload: data,
});

export const signupAction = (data) => ({
  type: auth.SIGNUP,
  payload: data,
});

export const logoutAction = () => ({
  type: auth.LOGOUT,
});
