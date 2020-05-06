import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Hotels from "./pages/Hotels";
import Orders from "./pages/Orders";
import Checkout from "./components/Checkout/Checkout";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Hotels}></Route>
        <Route exact path="/auth" component={LoginPage}></Route>
        <Route path="/checkout" component={Checkout}></Route>
        <Route exact path="/order/:id" component={Orders}></Route>
        {/* <Redirect from="/*" to="/" /> */}
      </Switch>
    </div>
  );
}

export default App;
