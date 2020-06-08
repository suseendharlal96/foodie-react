import React from "react";

import styles from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;
  const inputClasses = [styles.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(styles.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <React.Fragment>
          <input
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            name={props.elementConfig.name}
            value={props.value}
            onChange={props.changed}
          />
        </React.Fragment>
      );
      break;
    case "select":
      inputElement = (
        <React.Fragment>
          <select
            className={inputClasses}
            value={props.value}
            onChange={props.changed}
          >
            <option value="" disabled>
              Select delivery mode
            </option>
            {props.elementConfig.options.map((op, index) => {
              return (
                <option key={index} value={op.value}>
                  {op.displayValue}
                </option>
              );
            })}
          </select>
        </React.Fragment>
      );
      break;
    default:
      inputElement = (
        <React.Fragment>
          <input
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            name={props.elementConfig.name}
            value={props.value}
            onChange={props.changed}
          />
        </React.Fragment>
      );
  }

  return (
    <div className={styles.Input}>
      <label
        className={styles.Label}
        style={{ color: " var(--primaryText)" }}
        htmlFor={props.elementConfig.name}
      >
        {props.label}
      </label>
      <div className="row">{inputElement}</div>
    </div>
  );
};

export default Input;
