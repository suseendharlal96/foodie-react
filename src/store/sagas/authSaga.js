import axios from "axios";
import { put, delay } from "redux-saga/effects";

import * as actions from "../actions/index";

export function* authStartSaga({ isSignup, routeData, orderData, loginData }) {
  yield put(actions.authInit());
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7PnaRbqVCROuKHtA0B6_GPsL2V_vN3k0";
  if (isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7PnaRbqVCROuKHtA0B6_GPsL2V_vN3k0";
  }
  try {
    const res = yield axios.post(url, loginData);
    if (res) {
      yield put(actions.loginSuccess(res.data, loginData.email));
      localStorage.setItem("userId", res.data.localId);
      localStorage.setItem("token", res.data.idToken);
      localStorage.setItem("email", loginData.email);
      yield put(actions.authLogout(res.data));
      if (orderData && orderData.name) {
        routeData.history.replace("/checkout");
      } else {
        routeData.history.replace("/");
      }
    }
  } catch (err) {
    yield put(actions.loginFail(err.response.data.error.message));
  }
}

export function* authLogoutSaga({ token }) {
  yield delay(+token.expiresIn * 10000);
  yield put(actions.logout());
}
