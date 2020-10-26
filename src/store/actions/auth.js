import * as actionType from "./actionType";

export const loginSuccess = (data, email) => ({
  type: actionType.AUTH_SUCCESS,
  idToken: data.idToken,
  email: email,
  localId: data.localId,
});

export const loginFail = (error) => ({
  type: actionType.AUTH_FAIL,
  error: error,
});

export const authInit = () => ({
  type: actionType.AUTH_START,
});

export const logout = () => ({
  type: actionType.AUTH_LOGOUT,
});

export const authLogout = (token) => ({
  type: actionType.AUTH_LOGOUT_SAGA,
  token,
});

export const authStart = (isSignup, data, routeData, orderData) => ({
  type: actionType.AUTH_START_SAGA,
  loginData: {
    email: data.email.value,
    password: data.password.value,
    returnSecureToken: true,
  },
  isSignup,
  data,
  routeData,
  orderData,
});
