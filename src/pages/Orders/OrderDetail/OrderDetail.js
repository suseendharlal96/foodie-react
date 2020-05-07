import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Button from "../../Button/Button";

const orderDetail = (props) => {
  console.log(props.date);
  // console.log(props.id);
  // console.log(props.ingredients);
  // console.log(props.price);
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
        <h2>Order Detail:</h2>
        <p>Ordered on: {new Date(props.date).toString()}</p>
        <p>Customer Details:</p>
        {Object.keys(props.custDetails).map((ing) => {
          return (
            <li key={ing}>
              {ing} <span>:{props.custDetails[ing]}</span>
            </li>
          );
        })}
        <p>Items ordered:</p>
        {props.menu.map((ing, i) => {
          return (
            <li key={i}>
              <strong> {ing.name}</strong>
              <span>
                price:
                <strong>
                  {"\u20B9"} {ing.price}(1)
                </strong>
              </span>
              <span>
                quantity:<strong> {ing.quantity}</strong>
              </span>
              <span>
                total:
                <strong>
                  {" "}
                  {"\u20B9"}
                  {ing.quantity * ing.price}
                </strong>
              </span>
            </li>
          );
        })}
        <hr />
        <p>
          Grand Total:{" "}
          <strong>
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
