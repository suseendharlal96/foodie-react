import * as actionType from "./actionType";

export const initOrder = (data) => ({
  type: actionType.INIT_ORDER,
  orderData: data,
});

export const setOrderSuccess = (orderData) => ({
  type: actionType.PLACE_ORDER_SUCCESS,
  orderData: orderData,
});

export const setOrderFail = () => ({
  type: actionType.PLACE_ORDER_FAIL,
});

export const initPurchase = () => ({
  type: actionType.INIT_PURCHASE,
});

export const purchaseFood = (orderData, token) => ({
  type: actionType.PURCHASE_FOOD_SAGA,
  orderData,
  token,
});

export const setFetchedOrders = (orderData) => ({
  type: actionType.SET_FETCHED_ORDERS,
  orderData: orderData.sort(
    (a, b) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
  ),
});

export const setFetchedOrdersFail = (error) => ({
  type: actionType.ORDERS_FAILED,
  error: error,
});

export const initFetch = () => ({
  type: actionType.INIT_FETCH,
});

export const fetchOrders = (token, userId) => ({
  type: actionType.FETCH_ORDERS_SAGA,
  token,
  userId,
});

export const deleteStateOrder = (id) => ({
  type: actionType.DELETE_ORDER,
  delId: id,
});

export const updateStateOrder = (data, id) => ({
  type: actionType.UPDATE_ORDER,
  updatedData: data,
  id: id,
});

export const initDel = () => ({
  type: actionType.INIT_DELETE,
});

export const deleteOrder = (id, obj, token) => ({
  type: actionType.DELETE_ORDER_SAGA,
  id,
  obj,
  token,
});

export const updateOrder = (obj, token, id) => ({
  type: actionType.UPDATE_ORDER_SAGA,
  obj,
  token,
  id,
});
