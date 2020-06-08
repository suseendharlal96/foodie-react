import axios from "axios";

import * as actionType from "./actionType";

export const loginSuccess = (data, email) => {
  return {
    type: actionType.AUTH_SUCCESS,
    idToken: data.idToken,
    email: email,
    localId: data.localId,
  };
};

export const loginFail = (error) => {
  return {
    type: actionType.AUTH_FAIL,
    error: error,
  };
};

export const authInit = () => {
  return {
    type: actionType.AUTH_START,
  };
};

export const logout = () => {
  localStorage.clear();
  return {
    type: actionType.AUTH_LOGOUT,
  };
};

export const authLogout = (token) => {
  return (dispatch) => {
    setTimeout(() => {
      localStorage.clear();
      dispatch(logout());
    }, +token.expiresIn * 10000);
  };
};

export const authStart = (isSignup, data, routeData, orderData) => {
  const loginData = {
    email: data.email.value,
    password: data.password.value,
    returnSecureToken: true,
  };
  return (dispatch) => {
    dispatch(authInit());
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7PnaRbqVCROuKHtA0B6_GPsL2V_vN3k0";
    if (isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7PnaRbqVCROuKHtA0B6_GPsL2V_vN3k0";
    }
    axios
      .post(url, loginData)
      .then((res) => {
        console.log(res.data);
        dispatch(loginSuccess(res.data, loginData.email));
        localStorage.setItem("userId", res.data.localId);
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("email", loginData.email);
        dispatch(authLogout(res.data));
        if (orderData && orderData.name) {
          routeData.history.replace("/checkout");
        } else {
          routeData.history.replace("/");
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(loginFail(err.response.data.error.message));
        // alert(err.message);
      });
  };
};
