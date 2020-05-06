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
        <h3>Hotel Name: {props.orderData.name}</h3>
        <p>Address: {props.orderData.address}</p>
        {props.orderData.menu.map((m, index) => {
          return (
            <ol key={index}>
              <li>
                Name: {m.name} -- Price: {"\u20B9"} {m.price}(1) -- Quantity:{" "}
                {m.quantity} -- Total: {"\u20B9"}
                {m.price * m.quantity}
              </li>
            </ol>
          );
        })}
        <p>
          Total Price:{" "}
          <strong>
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
