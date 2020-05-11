import React, { useContext } from "react";

import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { ThemeContext } from "../../../shared/themecontext";

const NavigationItems = (props) => {
  const { theme } = useContext(ThemeContext);
  const { setTheme } = useContext(ThemeContext);

  const changeTheme = () => {
    const activetheme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.add("color-theme-in-transition");
    setTheme(activetheme);
    document.documentElement.setAttribute("data-theme", activetheme);
    window.setTimeout(() => {
      document.documentElement.classList.remove("color-theme-in-transition");
    }, 1000);
  };
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem link="/" exact>
        Hotels
      </NavigationItem>
      {props.isAuth ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {props.isAuth ? (
        <NavigationItem link="/logout">Logout</NavigationItem>
      ) : (
        <NavigationItem link="/auth">SignIn/Signup</NavigationItem>
      )}
      <button
        style={{
          outline: "none",
          borderRadius: "15px",
          padding: "9px",
          float: "right",
          color: " var(--primaryText)",
          backgroundColor: "var(--primaryBg)",
        }}
        onClick={changeTheme}
      >
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </ul>
  );
};

export default NavigationItems;
