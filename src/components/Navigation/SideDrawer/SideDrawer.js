import React from "react";
import { connect } from "react-redux";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import styles from "./SideDrawer.module.css";
import Backdrop from "../../Backdrop/Backdrop";

const sideDrawer = (props) => {
  let attachedClasses = [styles.SideDrawer, styles.Close];
  if (props.open) {
    attachedClasses = [styles.SideDrawer, styles.Open];
  }
  let user = null;
  if (props.email || localStorage.getItem("email") !== null) {
    const a = props.email ? props.email : localStorage.getItem("email");
    user = <span style={{ color: "brown" }}>{"Welcome " + a}</span>;
  }
  return (
    <div>
      <Backdrop show={props.open} click={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        {user}
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.authReducer.email,
  };
};

export default connect(mapStateToProps)(sideDrawer);
