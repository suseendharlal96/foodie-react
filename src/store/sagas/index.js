import { takeLatest, takeEvery, all } from "redux-saga/effects";

import * as actionType from "../actions/actionType";
import { authStartSaga, authLogoutSaga } from "./authSaga";
import {
  fetchOrdersSaga,
  purchaseFoodSaga,
  deleteOrderSaga,
  updateOrderSaga,
} from "./orderSaga";

export function* watchAuthSaga() {
  yield all([
    takeEvery(actionType.AUTH_START_SAGA, authStartSaga),
    takeEvery(actionType.AUTH_LOGOUT_SAGA, authLogoutSaga),
  ]);
}

export function* watchOrdersSaga() {
  yield all([
    takeLatest(actionType.FETCH_ORDERS_SAGA, fetchOrdersSaga),
    takeLatest(actionType.PURCHASE_FOOD_SAGA, purchaseFoodSaga),
    takeLatest(actionType.DELETE_ORDER_SAGA, deleteOrderSaga),
    takeLatest(actionType.UPDATE_ORDER_SAGA, updateOrderSaga),
  ]);
}
