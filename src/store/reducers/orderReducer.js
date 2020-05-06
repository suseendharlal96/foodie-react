import * as actionType from "../actions/actionType";

const initState = {
  orders: null,
  purchased: false,
};

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.INIT_ORDER:
      return {
        ...state,
        orders: action.orderData,
        // purchased: true,
      };
    default:
      return state;
  }
};

export default orderReducer;
