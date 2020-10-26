import axios from "../../util/baseApi";
import { put } from "redux-saga/effects";

import * as actions from "../actions/index";

export function* fetchOrdersSaga({ token, userId }) {
  yield put(actions.initFetch());
  const queryParams =
    "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
  try {
    const res = yield axios.get(".json" + queryParams);
    if (res) {
      const a = [];
      for (let key in res.data) {
        a.push({ ...res.data[key], id: key });
      }
      yield put(actions.setFetchedOrders(a));
    }
  } catch (err) {
    yield put(actions.setFetchedOrdersFail("Unauthenticated to access"));
  }
}

export function* deleteOrderSaga({ id, obj, token }) {
  yield put(actions.initDel());
  try {
    const res = yield axios.delete(`/${id}.json?auth=${token}`);
    if (res) {
      yield put(actions.deleteStateOrder(id));
      obj.history.replace("/orders");
    }
  } catch (err) {
    console.log(err);
  }
}

export function* updateOrderSaga({ id, obj, token }) {
  yield put(actions.initPurchase());
  try {
    const res = yield axios.put(`/${id}.json?auth=${token}`, obj);
    if (res) {
      yield put(actions.updateStateOrder(obj, id));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* purchaseFoodSaga({ orderData, token }) {
  yield put(actions.initPurchase());
  try {
    const res = yield axios.post(".json?auth=" + token, orderData);
    if (res) {
      const order = { ...orderData, orderId: res.data.name };
      yield put(actions.setOrderSuccess(order));
    }
  } catch (err) {
    yield put(actions.setOrderFail());
  }
}
