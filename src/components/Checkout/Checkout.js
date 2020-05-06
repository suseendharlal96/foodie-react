import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "./CheckoutSummary/CheckoutSummary";
import ContactForm from "./ContactForm/ContactForm";
import Modal from "../Modal/Modal";

const Checkout = (props) => {
  const [continuePurchase, setContinuePurchase] = useState(false);

  useEffect(() => {
    console.log(props);
  }, []);

  const formSubmit = () => {
    console.log("form");
    setContinuePurchase(true);
    props.history.replace("/checkout/contact-form");
  };

  const closeModalHandler = () => {
    setContinuePurchase(false);
  };
  let summary = <Redirect to="/" />;
  const isPurchased = props.isPurchased ? <Redirect to="/success" /> : null;
  if (props.orderData) {
    summary = (
      <div>
        {isPurchased}
        <CheckoutSummary
          orderData={props.orderData}
          closeSummary={() => props.history.replace("/")}
          continue={formSubmit}
        />
        <Route
          path={props.match.path + "/contact-form"}
          render={(props) => (
            <Modal show={continuePurchase} closeModal={closeModalHandler}>
              <ContactForm {...props} />
            </Modal>
          )}
        />
      </div>
    );
  }

  return summary;
};

const mapStateToProps = (state) => {
  return {
    isPurchased: state.orderReducer.purchased,
    orderData: state.orderReducer.orders,
  };
};

export default connect(mapStateToProps)(Checkout);
