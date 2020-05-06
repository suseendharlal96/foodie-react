import axios from "axios";

import * as actionType from "./actionType";

export const initOrder = (data) => {
  return {
    type: actionType.INIT_ORDER,
    orderData: data,
  };
};

export const purchaseFood = (data) => {
  return {
    type: actionType.PLACE_ORDER,
    orderData: data,
  };
};
