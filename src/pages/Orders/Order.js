import React, { useState } from "react";
import { Route } from "react-router-dom";

import Modal from "../../components/Modal/Modal";
import OrderDetail from "./OrderDetail/OrderDetail";
import styles from "./Order.module.css";
import Button from "../../pages/Button/Button";

const Order = (props) => {
  const [continuePurchase, setcontinuePurchase] = useState(false);

  const closeModalHandler = () => {
    setcontinuePurchase(false);
    props.history.replace("/orders");
  };

  const details = () => {
    setcontinuePurchase(true);
    props.history.replace("/orders/details");
  };

  console.log(props);

  const ingredientOutput = props.orderData.menu.map((ig) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
        key={ig.name}
      >
        {ig.name} ({ig.quantity})
      </span>
    );
  });
  return (
    <div className={styles.Order}>
      <p>
        <strong>Hotel Name: </strong>
        {props.orderData.name}
      </p>
      <p>
        <strong>Address: </strong>
        {props.orderData.address}
      </p>
      <p>Items ordered: {ingredientOutput}</p>
      <p>
        Total Price:{" "}
        <strong>
          {"\u20B9"}
          {props.orderData.total}
        </strong>
      </p>
      <p>
        Ordered on:
        <strong>{new Date(props.date).toString()}</strong>
      </p>
      <div>
        <Button btntype="Success" clicked={details}>
          Details
        </Button>
        <Route
          path={props.match.path + "/details"}
          render={() => (
            <Modal show={continuePurchase} closeModal={closeModalHandler}>
              <OrderDetail
                id={props.id}
                date={props.date}
                custDetails={props.custDetails}
                menu={props.orderData.menu}
                price={props.orderData.total}
                delete={props.delete}
              />
            </Modal>
          )}
        />
      </div>
    </div>
  );
};

export default Order;
