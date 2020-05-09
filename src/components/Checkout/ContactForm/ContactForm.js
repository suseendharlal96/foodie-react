import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as orderActions from "../../../store/actions/index";

import Button from "../../../pages/Button/Button";
import styles from "./ContactForm.module.css";
import Input from "../../../pages/Input/Input";

const ContactForm = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
        autoFocus: "autoFocus",
      },
      value: "",
      validation: {
        isRequired: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        isRequired: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code(5 charac)",
      },
      value: "",
      validation: {
        isRequired: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        isRequired: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-Mail",
        readOnly: "readOnly",
      },
      value: props.email ? props.email : localStorage.getItem("email"),
      validation: {},
      valid: true,
      touched: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "",
      validation: {
        isRequired: true,
      },
      valid: false,
    },
  });

  const [formIsValid, setformIsValid] = useState(false);

  useEffect(() => {
    console.log(props);
    const orderId = props.history.location.pathname.split("/")[3];
    const updateData = props.orders.find((data) => data.id === orderId);
    const formValue = { ...orderForm };
    for (let key in updateData.customerDetails) {
      formValue[key].value = updateData.customerDetails[key];
    }
    setOrderForm(formValue);
    setformIsValid(true);
  }, []);

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.isRequired) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  const inputChangedHandler = (event, id) => {
    event.preventDefault();
    const copy = { ...orderForm };
    const deepCopy = { ...copy[id] };
    deepCopy.value = event.target.value;
    deepCopy.valid = checkValidity(deepCopy.value, deepCopy.validation);
    deepCopy.touched = true;
    copy[id] = deepCopy;
    let formIsValid = true;
    for (let inputIdentifier in copy) {
      formIsValid = copy[inputIdentifier].valid && formIsValid;
    }
    setOrderForm(copy);
    setformIsValid(formIsValid);
  };

  const formSubmit = (event) => {
    event.preventDefault();
    const formValue = {};
    for (let values in orderForm) {
      formValue[values] = orderForm[values].value;
    }
    const order = {
      orderData: props.orderData,
      customerDetails: formValue,
      orderDate: new Date(),
      userId: props.localId ? props.localId : localStorage.getItem("userId"),
    };
    const a = props.token ? props.token : localStorage.getItem("token");
    if (props.location.pathname.search("edit") !== -1) {
      const orderId = props.history.location.pathname.split("/")[3];
      const order = {
        orderData: props.orderData,
        customerDetails: formValue,
        orderDate: new Date(),
        userId: props.localId ? props.localId : localStorage.getItem("userId"),
      };
      props.updateFood(order, a, orderId);
    } else {
      props.onPurchaseFood(order, a);
    }
  };

  let formData = [];
  for (let key in orderForm) {
    formData.push({ id: key, inputData: orderForm[key] });
  }
  let button = (
    <Button disabled={!formIsValid} btntype="Success">
      PLACE ORDER
    </Button>
  );
  if (props.loading) {
    button = (
      <Button btntype="Success" disabled={true}>
        PLACING ORDER...
      </Button>
    );
  }

  let form = (
    <form onSubmit={formSubmit}>
      {formData.map((data) => {
        return (
          <Input
            key={data.id}
            elementType={data.inputData.elementType}
            elementConfig={data.inputData.elementConfig}
            value={data.inputData.value}
            invalid={!data.inputData.valid}
            shouldValidate={data.inputData.validation}
            touched={data.inputData.touched}
            changed={(event) => inputChangedHandler(event, data.id)}
          />
        );
      })}
      {button}
    </form>
  );
  return (
    <div className={styles.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.idToken,
    localId: state.authReducer.localId,
    email: state.authReducer.email,
    loading: state.orderReducer.loading,
    purchased: state.orderReducer.purchased,
    orderData: state.orderReducer.orders,
    orders: state.orderReducer.actualOrders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseFood: (orderData, token) =>
      dispatch(orderActions.purchaseFood(orderData, token)),
    updateFood: (orderData, token, id) =>
      dispatch(orderActions.updateOrder(orderData, token, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
