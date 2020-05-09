import React from "react";
import { connect } from "react-redux";

import "../styles/OrderStyle.css";
import Menu from "../components/Menu";
import data from "../data/data.json";
import MyCart from "../components/MyCart";
import * as action from "../store/actions/index";

class Orders extends React.Component {
  constructor() {
    super();
    this.state = {
      list: data,
      id: "",
      newList: [],
      price: "",
      name: [],
      total: 0,
      quantity: 0,
      clickable: false,
    };
  }

  componentDidMount() {
    this.initOrderData();
  }

  initOrderData = () => {
    const hotel = this.props.history.location.pathname.split("/")[2];
    const editId = this.props.history.location.pathname.split("/")[3];
    const List = this.state.list.filter(function (rec) {
      return rec.name === hotel;
    });
    const arr = [];
    List.map((list) => {
      arr.push({
        id: list.id,
        name: list.name,
        address: list.address,
        menu: list.menu.map((m) => {
          return {
            id: m.id,
            name: m.name,
            price: m.price,
            description: m.desc,
            quantity: 0,
          };
        }),
      });
    });
    this.setState({
      id: hotel,
      newList: arr,
    });
    if (editId) {
      this.initEditData(editId, arr);
    }
  };

  initEditData = (editId, arr) => {
    const a = this.props.orders.find((data) => data.id === editId).orderData;
    let updatedMenu = [];
    if (arr && arr.length) {
      a.menu.map((m) => {
        const ind = arr[0].menu.findIndex((data) => data.id === m.id);
        if (ind !== -1) {
          arr[0].menu[ind] = m;
        }
      });
      updatedMenu = arr[0].menu;
      if (a) {
        this.setState({
          newList: [
            { id: a.id, name: a.name, address: a.address, menu: updatedMenu },
          ],
        });
        this.setState({ total: a.total });
      }
    }
  };

  childHandler = (ChildPrice, ChildQuantity, id) => {
    const b = this.calcQuantity("add", id);
    const totalPrice = +this.state.price + ChildPrice * ChildQuantity;
    this.setState({
      newList: b,
    });
    this.total();
  };

  incrementQuantity = (id) => {
    const b = this.calcQuantity("add", id);
    this.setState({
      newList: b,
    });
    this.total();
  };

  decrementQuantity = (id) => {
    const b = this.calcQuantity("less", id);
    this.setState({
      newList: b,
    });
    this.total();
  };

  calcQuantity = (type, id) => {
    const b = [...this.state.newList];
    b.map((m) => {
      m.menu.map((me) => {
        if (me.id === id) {
          me.quantity = type === "add" ? me.quantity + 1 : me.quantity - 1;
        }
      });
    });
    return b;
  };

  total = () => {
    let tot = 0;
    this.state.newList[0].menu.map((m) => {
      tot = tot + m.price * m.quantity;
    });
    this.setState({
      total: tot,
    });
  };

  placeOrder = () => {
    const a = this.state.newList[0];
    const obj = {
      menu: [],
      total: this.state.total,
    };
    for (let key in a) {
      if (key !== "menu") {
        obj[key] = a[key];
      }
    }
    a.menu.map((m) => {
      if (m.quantity > 0) {
        obj.menu.push(m);
      }
    });

    this.props.initOrder(obj);
    if (this.props.email || localStorage.getItem("token") !== null) {
      if (this.props.history.location.pathname.split("/")[3]) {
        this.props.history.replace(
          `/checkout/${this.props.location.pathname.split("/")[3]}/edit`
        );
      } else {
        this.props.history.replace("/checkout");
      }
    } else {
      this.props.history.replace("/auth");
    }
  };

  render() {
    return (
      <div id="content">
        <div className="row">
          <div className="col-md-8">
            <div style={{ backgroundColor: "black" }}>
              <h1 className="hname">{this.state.newList.map((x) => x.name)}</h1>
              <h5 className="aname">
                <i className="fa fa-map-marker" style={{ fontSize: 18 }}></i>{" "}
                {this.state.newList.map((x) => x.address)}
              </h5>
            </div>
            <div id="items">
              <center>
                <h2>Order Now</h2>
              </center>
              <br />

              {this.state.newList.map((x) =>
                x.menu.map((item, index) => {
                  return (
                    <Menu
                      key={index}
                      ind={item.id}
                      id={item.id}
                      desc={item.description}
                      quantity={item.quantity}
                      price={item.price}
                      name={item.name}
                      action={this.childHandler}
                    />
                  );
                })
              )}
            </div>
          </div>
          <div className="col-md-4">
            <div id="logo"></div>
            <div id="right">
              <div id="right-in">
                <h4>My Cart</h4>
                {this.state.newList.length
                  ? this.state.newList[0].menu.map((cart, index) => {
                      if (cart.quantity >= 1) {
                        return (
                          <MyCart
                            key={index}
                            ind={cart.id}
                            name={cart.name}
                            price={cart.price}
                            quantity={cart.quantity}
                            increment={(ind) => this.incrementQuantity(ind)}
                            decrement={(ind) => this.decrementQuantity(ind)}
                          ></MyCart>
                        );
                      }
                    })
                  : null}

                <div id="total">
                  <p id="total">
                    {" "}
                    Grand Total:
                    <span className="spn">
                      {"\u20B9"} {this.state.total}
                    </span>
                  </p>
                  <button
                    disabled={
                      this.state.total === 0 &&
                      (this.props.email !== "" ||
                        localStorage.getItem("token") !== null)
                    }
                    style={
                      this.state.total === 0 &&
                      (this.props.email !== "" ||
                        localStorage.getItem("token") !== null)
                        ? { cursor: "no-drop" }
                        : { cursor: "pointer" }
                    }
                    id="pay"
                    onClick={this.placeOrder}
                  >
                    {this.props.email || localStorage.getItem("token") !== null
                      ? "Place Order"
                      : "Login to Order"}
                  </button>
                  <button
                    id="pay"
                    onClick={() => this.props.history.replace("/")}
                  >
                    Back to Hotels
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.authReducer.email,
    orders: state.orderReducer.actualOrders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initOrder: (data) => dispatch(action.initOrder(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
