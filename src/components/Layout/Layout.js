import React, { useState } from "react";
import { connect } from "react-redux";

import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  const [showSideDrawer, setshowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setshowSideDrawer(false);
  };

  const sidebarToggleHandler = () => {
    setshowSideDrawer(!showSideDrawer);
  };
  return (
    <React.Fragment>
      <Toolbar
        isAuth={props.isAuth}
        drawerToggleClicked={sidebarToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuth}
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
      />
      <main className={styles.Content}>{props.children}</main>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth:
      state.authReducer.idToken !== null ||
      localStorage.getItem("token") !== null,
  };
};

export default connect(mapStateToProps)(Layout);
