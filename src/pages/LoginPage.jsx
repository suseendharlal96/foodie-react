import React, { useState } from "react";
import { connect } from "react-redux";

import "../styles/LoginStyle.css";
import Front from "../images/FB.jpg";
import Input from "./Input/Input";
import Button from "./Button/Button";
import styles from "./Auth/Auth.module.css";
import * as authActions from "../store/actions/index";

const LoginPage = (props) => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email",
      },
      value: "",
      validation: {
        isRequired: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        isRequired: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
    confirmpassword: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "confirm Password",
      },
      value: "",
      validation: {
        isRequired: true,
        checkmatch: true,
      },
      valid: false,
      touched: false,
    },
  });
  const [isSignup, setIsSignUp] = useState(true);
  const [formIsValid, setformIsValid] = useState(false);

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.isRequired) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      if (authForm.confirmpassword && authForm.confirmpassword.value) {
        isValid = value.trim() === authForm.confirmpassword.value && isValid;
      }
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.checkmatch) {
      isValid = value.trim() === authForm.password.value && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  const inputChangedHandler = (event, id) => {
    event.preventDefault();
    const copy = { ...authForm };
    const deepCopy = { ...copy[id] };
    deepCopy.value = event.target.value;
    deepCopy.valid = checkValidity(deepCopy.value, deepCopy.validation);
    deepCopy.touched = true;
    copy[id] = deepCopy;
    let formIsValid = true;
    for (let inputIdentifier in copy) {
      formIsValid = copy[inputIdentifier].valid && formIsValid;
    }
    setAuthForm(copy);
    setformIsValid(formIsValid);
  };

  const changeMode = () => {
    setIsSignUp(!isSignup);
    const newform = {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          isRequired: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          isRequired: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
      confirmpassword: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "confirm Password",
        },
        value: "",
        validation: {
          isRequired: true,
          checkmatch: true,
        },
        valid: false,
        touched: false,
      },
    };
    if (isSignup !== true) {
      setAuthForm(newform);
    } else {
      const oldform = {
        email: {
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "Email",
          },
          value: "",
          validation: {
            isRequired: true,
            isEmail: true,
          },
          valid: false,
          touched: false,
        },
        password: {
          elementType: "input",
          elementConfig: {
            type: "password",
            placeholder: "Password",
          },
          value: "",
          validation: {
            isRequired: true,
            minLength: 6,
          },
          valid: false,
          touched: false,
        },
      };
      setAuthForm(oldform);
    }
  };

  const formSubmit = (event, isSignup) => {
    console.log(isSignup);
    event.preventDefault();
    props.submitForm(isSignup, authForm, props, props.orderData);
  };

  let formData = [];
  for (let key in authForm) {
    formData.push({ id: key, inputData: authForm[key] });
  }
  let button = (
    <Button
      btntype="Success"
      disabled={isSignup ? (formIsValid ? false : true) : false}
    >
      {isSignup
        ? props.loading
          ? "Signing up..."
          : "SignUp"
        : props.loading
        ? "Signing in..."
        : "SignIn"}
    </Button>
  );
  let error = null;
  if (props.error) {
    error = <p style={{ color: "red" }}>{props.error}</p>;
  }

  let modeButton = (
    <Button disabled={props.loading ? true : false} clicked={changeMode}>
      {isSignup ? "Switch to Signin" : "Switch to Signup"}
    </Button>
  );

  let form = (
    <form onSubmit={(event) => formSubmit(event, isSignup)}>
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
    <div className="row" style={{ width: "100%" }}>
      <div className="col-md-7">
        <img src={Front} className="img-fluid" alt="Banner" />
      </div>

      <div className="col-md-5">
        <div className={styles.Auth}>
          <h1 id="logoApp">FOODIE</h1>
          <h2 style={{ color: "var(--secondaryText)" }}>LOG IN</h2>
          {error}
          {form}
          {modeButton}
        </div>
        <br />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    orderData: state.orderReducer.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (isSignup, loginData, routeData, orderData) =>
      dispatch(
        authActions.authStart(isSignup, loginData, routeData, orderData)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
