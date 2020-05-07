import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Order from "../Orders/Order";
import * as action from "../../store/actions/index";
import Button from "../../pages/Button/Button";

const Orders = (props) => {
  const [priceCheck, setpriceCheck] = useState("");
  const [dateCheck, setdateCheck] = useState("");

  useEffect(() => {
    console.log(props.token);
    if (!props.token) {
      props.fetchOrders(
        localStorage.getItem("token"),
        localStorage.getItem("userId")
      );
    } else {
      props.fetchOrders(props.token, props.localId);
    }
  }, []);

  const sort = (event) => {
    if (event.target.value === "low") {
      props.orders.sort((a, b) => +a.orderData.total - +b.orderData.total);
      setpriceCheck(event.target.value);
      setdateCheck("");
    } else if (event.target.value === "high") {
      props.orders.sort((a, b) => +b.orderData.total - +a.orderData.total);
      setpriceCheck(event.target.value);
      setdateCheck("");
    } else if (event.target.value === "old") {
      props.orders.sort(
        (a, b) =>
          new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
      );
      setpriceCheck("");
      setdateCheck(event.target.value);
    } else if (event.target.value === "new") {
      props.orders.sort(
        (a, b) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      );
      setpriceCheck("");
      setdateCheck(event.target.value);
    }
  };

  const deleteHandler = (orderId) => {
    console.log(orderId);
    const token = props.token ? props.token : localStorage.getItem("token");
    props.deleteOrders(orderId, { ...props }, token);
  };

  let filter = null;
  let error = null;
  if (props.error) {
    error = (
      <div>
        <p>{props.error}</p>
        <Button
          btntype="Success"
          clicked={() => props.history.replace("/auth")}
        >
          click to Signup/in
        </Button>
      </div>
    );
  }
  if (!props.error && props.orders && props.orders.length > 0) {
    filter = (
      <div>
        <h2>My Orders:</h2>
        <div style={{ fontWeight: "bold" }}>Filter By:</div>
        <span>
          <label>Date:</label>
          <br />
          old:
          <input
            type="radio"
            name="price"
            value="old"
            onChange={(event) => sort(event)}
            checked={dateCheck === "old"}
          />
          new:
          <input
            type="radio"
            name="price"
            value="new"
            onChange={(event) => sort(event)}
            checked={dateCheck === "new"}
          />
        </span>
        <br />
        <span>
          <label>Price:</label>
          <br />
          <span>
            low:
            <input
              type="radio"
              name="price"
              value="low"
              onChange={(event) => sort(event)}
              checked={priceCheck === "low"}
            />
            high:
            <input
              type="radio"
              name="price"
              value="high"
              onChange={(event) => sort(event)}
              checked={priceCheck === "high"}
            />
          </span>
        </span>
      </div>
    );
  } else if (!props.error) {
    filter = <p>No Orders found!</p>;
  }
  console.log(props.orders);
  return (
    <div>
      {error}
      {filter}

      {props.token || localStorage.getItem("token") !== null
        ? props.orders.map((order) => {
            return (
              <Order
                {...props}
                key={order.id}
                id={order.id}
                custDetails={order.customerDetails}
                date={order.orderDate}
                orderData={order.orderData}
                delete={() => deleteHandler(order.id)}
              />
            );
          })
        : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.orderReducer.actualOrders,
    token: state.authReducer.idToken,
    localId: state.authReducer.localId,
    error: state.orderReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (token, userId) => dispatch(action.fetchOrders(token, userId)),
    deleteOrders: (id, props, token) =>
      dispatch(action.deleteOrder(id, props, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
