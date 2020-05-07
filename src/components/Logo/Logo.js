import React from "react";

import burgerLogo from "../../images/logo.jpg";
import styles from "./Logo.module.css";

const logo = (props) => (
  <div className={styles.Logo} style={{ height: props.height }}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default logo;
