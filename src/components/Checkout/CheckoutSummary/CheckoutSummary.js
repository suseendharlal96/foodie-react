import React, { useEffect } from "react";

import Button from "../../../pages/Button/Button";
import styles from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <div className={styles.CheckoutSummary}>
      <div style={{ width: "100%", margin: "auto" }}>
        <h3 style={{ color: "var(--primaryText)" }}>
          Hotel Name: {props.orderData.name}
        </h3>
        <p style={{ color: "var(--primaryText)" }}>
          Address: {props.orderData.address}
        </p>
        <ol style={{ color: "var(--primaryText)" }}>
          {props.orderData.menu.map((m, index) => {
            return (
              <li key={index} style={{ color: "var(--primaryText)" }}>
                Name: {m.name} -- Price: {"\u20B9"} {m.price}(1) -- Quantity:{" "}
                {m.quantity} -- Total: {"\u20B9"}
                {m.price * m.quantity}
              </li>
            );
          })}
        </ol>
        <p style={{ color: "var(--primaryTheme)" }}>
          Total Price:{" "}
          <strong style={{ color: "var(--primaryText)" }}>
            {"\u20B9"}
            {props.orderData.total}
          </strong>
        </p>
      </div>
      <Button btntype="Success" clicked={props.continue}>
        Confirm
      </Button>
      <Button btntype="Danger" clicked={props.closeSummary}>
        Cancel
      </Button>
    </div>
  );
};

export default CheckoutSummary;
