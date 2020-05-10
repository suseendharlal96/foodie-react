import React from "react";

import classes from "./SuccessPage.module.css";
import Button from "../Button/Button";
import Front from "../../images/FB.jpg";

const success = (props) => {
  return (
    <div className={classes.Successpage}>
      <h2>Your order has been successfully placed!</h2>
      <Button btntype="Success" clicked={() => props.history.replace("/")}>
        Place New Order!
      </Button>
      <Button
        btntype="Success"
        clicked={() => props.history.replace("/orders")}
      >
        Go to My Orders!
      </Button>
      <img src={Front} className="img-fluid" alt="Banner" />
    </div>
  );
};

export default success;
