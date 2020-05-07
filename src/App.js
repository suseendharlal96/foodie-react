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

function App() {
  return (
    <div>
      <Switch>
        <Layout>
          <Route exact path="/" component={Hotels}></Route>
          <Route exact path="/auth" component={LoginPage}></Route>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/success" component={Success}></Route>
          <Route path="/orders" component={MyOrder}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route exact path="/order/:id" component={Orders}></Route>
          {/* <Redirect from="/*" to="/" /> */}
        </Layout>
      </Switch>
    </div>
  );
}

export default App;
