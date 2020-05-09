import axios from "axios";

import * as actionType from "./actionType";

export const initOrder = (data) => {
  return {
    type: actionType.INIT_ORDER,
    orderData: data,
  };
};

export const setOrderSuccess = (orderData) => {
  return {
    type: actionType.PLACE_ORDER_SUCCESS,
    orderData: orderData,
  };
};

export const setOrderFail = () => {
  return {
    type: actionType.PLACE_ORDER_FAIL,
  };
};

export const initPurchase = () => {
  return {
    type: actionType.INIT_PURCHASE,
  };
};

export const purchaseFood = (orderData, token) => {
  return (dispatch) => {
    dispatch(initPurchase());
    axios
      .post(
        "https://foodie-react.firebaseio.com/orders.json?auth=" + token,
        orderData
      )
      .then((response) => {
        const order = { ...orderData, orderId: response.data.name };
        dispatch(setOrderSuccess(order));
      })
      .catch((error) => {
        dispatch(setOrderFail());
      });
  };
};

export const setFetchedOrders = (orderData) => {
  return {
    type: actionType.SET_FETCHED_ORDERS,
    orderData: orderData.reverse(),
  };
};

export const setFetchedOrdersFail = (error) => {
  return {
    type: actionType.ORDERS_FAILED,
    error: error,
  };
};
export const initFetch = () => {
  return {
    type: actionType.INIT_FETCH,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(initFetch());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("https://foodie-react.firebaseio.com/orders.json" + queryParams)
      .then((res) => {
        const a = [];
        for (let key in res.data) {
          a.push({ ...res.data[key], id: key });
        }
        dispatch(setFetchedOrders(a));
      })
      .catch((err) => {
        dispatch(setFetchedOrdersFail("Unauthenticated to access"));
      });
  };
};

export const deleteStateOrder = (id) => {
  return {
    type: actionType.DELETE_ORDER,
    delId: id,
  };
};

export const updateStateOrder = (data, id) => {
  return {
    type: actionType.UPDATE_ORDER,
    updatedData: data,
    id: id,
  };
};

export const initDel = () => {
  return {
    type: actionType.INIT_DELETE,
  };
};

export const deleteOrder = (id, obj, token) => {
  return (dispatch) => {
    dispatch(initDel());
    axios
      .delete(
        `https://foodie-react.firebaseio.com/orders/${id}.json?auth=${token}`
      )
      .then((res) => {
        dispatch(deleteStateOrder(id));
        obj.history.replace("/orders");
      })
      .catch((err) => {
      });
  };
};

export const updateOrder = (obj, token, id) => {
  return (dispatch) => {
    dispatch(initPurchase());
    axios
      .put(
        `https://foodie-react.firebaseio.com/orders/${id}.json?auth=${token}`,
        obj
      )
      .then((res) => {
        dispatch(updateStateOrder(obj, id));
      })
      .catch((err) => {
      });
  };
};
