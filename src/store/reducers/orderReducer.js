import * as actionType from "../actions/actionType";

const initState = {
  orders: null,
  actualOrders: [],
  purchased: false,
  loading: false,
  error: null,
};

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.INIT_ORDER:
      return {
        ...state,
        orders: action.orderData,
        error: null,
        purchased: false,
      };
    case actionType.INIT_PURCHASE:
      return {
        ...state,
        loading: true,
        purchased: false,
        error: null,
      };
    case actionType.PLACE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        purchased: true,
        error: null,
      };
    case actionType.SET_FETCHED_ORDERS:
      return {
        ...state,
        actualOrders: action.orderData,
        loading: false,
        purchased: false,
        error: null,
      };
    case actionType.PLACE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        purchased: false,
        error: null,
      };
    case actionType.ORDERS_FAILED:
      return {
        ...state,
        loading: false,
        purchased: false,
        error: action.error,
      };
    case actionType.INIT_FETCH:
      return {
        ...state,
        loading: true,
        purchased: false,
        error: null,
        // actualOrders: (state.actualOrders = []),
      };
    case actionType.INIT_DELETE:
      return {
        ...state,
        loading: true,
        purchased: false,
        error: null,
      };
    case actionType.DELETE_ORDER:
      return {
        ...state,
        actualOrders: state.actualOrders.filter(
          (data) => data.id !== action.delId
        ),
        loading: false,
        purchased: false,
        error: null,
      };
    case actionType.UPDATE_ORDER:
      return {
        ...state,
        actualOrders: state.actualOrders.filter((data) =>
          data.id === action.id ? action.updatedData : data
        ),
        loading: false,
        purchased: true,
        error: null,
      };
    default:
      return state;
  }
};

export default orderReducer;
