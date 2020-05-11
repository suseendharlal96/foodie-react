import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Hotels from "./pages/Hotels";
import Orders from "./pages/Orders";
import Checkout from "./components/Checkout/Checkout";
import Success from "./pages/SuccessPage/SuccessPage";
import MyOrder from "./pages/Orders/Orders";
import Layout from "./components/Layout/Layout";
import Logout from "./pages/Auth/logout/logout";
import ThemeContext from "./shared/themecontext";

function App() {
  return (
    <div>
      <Switch>
        <ThemeContext>
          <Layout>
            <Route exact path="/" component={Hotels}></Route>
            <Route exact path="/auth" component={LoginPage}></Route>
            <Route path="/checkout" component={Checkout}></Route>
            <Route path="/success" component={Success}></Route>
            <Route path="/orders" component={MyOrder}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route exact path="/order/:id" component={Orders}></Route>
            <Route exact path="/hotel/:id/edit" component={Hotels}></Route>
            <Route
              exact
              path="/order/:name/:id/edit"
              component={Orders}
            ></Route>
            {/* <Redirect from="/*" to="/" /> */}
          </Layout>
        </ThemeContext>
      </Switch>
    </div>
  );
}

export default App;
