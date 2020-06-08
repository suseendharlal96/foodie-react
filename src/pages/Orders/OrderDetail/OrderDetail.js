import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Button from "../../Button/Button";

const orderDetail = (props) => {
  let detail;
  if (props) {
    let button;
    if (props.loading) {
      button = (
        <Button btntype="Danger" disabled={true}>
          Deleting...
        </Button>
      );
    } else {
      button = (
        <Button btntype="Danger" clicked={props.delete}>
          Delete
        </Button>
      );
    }
    detail = (
      <div>
        <h2 style={{ color: "var(--primaryText)" }}>Order Detail:</h2>
        <p style={{ color: "var(--primaryTheme)" }}>
          Ordered on:{" "}
          <strong style={{ color: "var(--primaryText)" }}>
            {new Date(props.date).toString()}
          </strong>
        </p>
        <p style={{ color: "var(--primaryTheme)" }}>Customer Details:</p>
        {Object.keys(props.custDetails).map((ing) => {
          return (
            <li style={{ color: "var(--primaryTheme)" }} key={ing}>
              {ing}{" "}
              <span style={{ color: "var(--primaryText)" }}>
                :{props.custDetails[ing]}
              </span>
            </li>
          );
        })}
        <p style={{ color: "var(--primaryTheme)" }}>Items ordered:</p>
        {props.menu.map((ing, i) => {
          return (
            <li key={i}>
              <strong style={{ color: "var(--primaryText)" }}>
                {" "}
                {ing.name}
              </strong>
              <span style={{ color: "var(--primaryTheme)" }}>
                price:
                <strong style={{ color: "var(--primaryText)" }}>
                  {"\u20B9"} {ing.price}(1)
                </strong>
              </span>
              <span style={{ color: "var(--primaryTheme)" }}>
                quantity:
                <strong style={{ color: "var(--primaryText)" }}>
                  {" "}
                  {ing.quantity}
                </strong>
              </span>
              <span style={{ color: "var(--primaryTheme)" }}>
                total:
                <strong style={{ color: "var(--primaryText)" }}>
                  {" "}
                  {"\u20B9"}
                  {ing.quantity * ing.price}
                </strong>
              </span>
            </li>
          );
        })}
        <hr />
        <p style={{ color: "var(--primaryTheme)" }}>
          Grand Total:{" "}
          <strong style={{ color: "var(--primaryText)" }}>
            {"\u20B9"}
            {props.price.toFixed(2)}
          </strong>
        </p>
        {button}
      </div>
    );
  } else {
    detail = <Redirect to="/orders" />;
  }

  return <div>{detail}</div>;
};

const mapStateToProps = (state) => {
  return {
    loading: state.orderReducer.loading,
  };
};

export default connect(mapStateToProps)(orderDetail);
