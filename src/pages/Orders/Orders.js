import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// import { Bar, Pie, Doughnut } from "react-chartjs-2";

import BarChart from "./charts/Bar";
import PieChart from "./charts/Pie";
import LineChart from "./charts/Line";
import Order from "../Orders/Order";
import * as action from "../../store/actions/index";
import Button from "../../pages/Button/Button";

const Orders = (props) => {
  const [priceCheck, setpriceCheck] = useState("");
  const [dateCheck, setdateCheck] = useState("");
  const [alphaCheck, setalphaCheck] = useState("");
  const [mode, setMode] = useState("list");

  useEffect(() => {
    if (!props.token) {
      props.fetchOrders(
        localStorage.getItem("token"),
        localStorage.getItem("userId")
      );
    } else {
      props.fetchOrders(props.token, props.localId);
    }
  }, []);

  const changeMode = (event) => {
    event.persist();
    console.log(event);
    console.log(event.target.value);
    setMode(event.target.value);
  };

  const sort = (event) => {
    console.log(event.target.value);
    if (event.target.value === "low") {
      props.orders.sort((a, b) => +a.orderData.total - +b.orderData.total);
      setpriceCheck(event.target.value);
      setdateCheck("");
      setalphaCheck("");
    } else if (event.target.value === "high") {
      props.orders.sort((a, b) => +b.orderData.total - +a.orderData.total);
      setpriceCheck(event.target.value);
      setdateCheck("");
      setalphaCheck("");
    } else if (event.target.value === "old") {
      props.orders.sort(
        (a, b) =>
          new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
      );
      setpriceCheck("");
      setdateCheck(event.target.value);
      setalphaCheck("");
    } else if (event.target.value === "new") {
      props.orders.sort(
        (a, b) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      );
      setpriceCheck("");
      setdateCheck(event.target.value);
      setalphaCheck("");
    } else if (event.target.value === "asc") {
      console.log(1);
      props.orders.sort((a, b) =>
        compareName(a.orderData.name, b.orderData.name)
      );
      setalphaCheck(event.target.value);
      setpriceCheck("");
      setdateCheck("");
    } else if (event.target.value === "desc") {
      console.log(2);
      props.orders.sort((a, b) =>
        compareName(b.orderData.name, a.orderData.name)
      );
      setalphaCheck(event.target.value);
      setpriceCheck("");
      setdateCheck("");
    }
  };

  const compareName = (a, b) => {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return a < b ? -1 : a > b ? 1 : 0;
  };

  const deleteHandler = (orderId) => {
    const token = props.token ? props.token : localStorage.getItem("token");
    props.deleteOrders(orderId, { ...props }, token);
  };

  let filter = null;
  let error = null;
  if (props.error) {
    error = (
      <div>
        <p>{props.error}</p>
        <Button
          btntype="Success"
          clicked={() => props.history.replace("/auth")}
        >
          click to Signup/in
        </Button>
      </div>
    );
  }
  if (!props.error && props.orders && props.orders.length > 0) {
    filter = (
      <div>
        <h2>My Orders:</h2>
        <div style={{ fontWeight: "bold" }}>Filter By:</div>
        <div className="float-right" style={{ marginRight: "20px" }}>
          <label style={{ marginRight: "15px" }} htmlFor="dispmode">
            Display Mode:
          </label>
          <span>
            <select
              name="dispmode"
              id="dispmode"
              value={mode}
              onChange={changeMode}
            >
              <option value="list">List</option>
              <option value="chart">Chart</option>
            </select>
          </span>
        </div>
        <span style={{ marginRight: "10px" }}>
          <label style={{ marginRight: "10px" }}>
            <strong>Date:</strong>
          </label>
          old:
          <input
            type="radio"
            name="price"
            value="old"
            onChange={(event) => sort(event)}
            checked={dateCheck === "old"}
          />
          new:
          <input
            type="radio"
            name="price"
            value="new"
            onChange={(event) => sort(event)}
            checked={dateCheck === "new"}
          />
        </span>
        <span style={{ marginRight: "10px" }}>
          <label style={{ marginRight: "10px" }}>
            <strong>Hotel Name:</strong>
          </label>
          A-z:
          <input
            type="radio"
            name="price"
            value="asc"
            onChange={(event) => sort(event)}
            checked={alphaCheck === "asc"}
          />
          Z-a:
          <input
            type="radio"
            name="price"
            value="desc"
            onChange={(event) => sort(event)}
            checked={alphaCheck === "desc"}
          />
        </span>
        <span>
          <label style={{ marginRight: "10px" }}>
            <strong>Price:</strong>
          </label>
          low:
          <input
            type="radio"
            name="price"
            value="low"
            onChange={(event) => sort(event)}
            checked={priceCheck === "low"}
          />
          high:
          <input
            type="radio"
            name="price"
            value="high"
            onChange={(event) => sort(event)}
            checked={priceCheck === "high"}
          />
        </span>
      </div>
    );
  } else if (!props.error) {
    filter = <p>Loading...</p>;
  } else {
    filter = <p>No orders placed yet!</p>;
  }
  let a = [];
  let ind = 1;
  for (let i = 0; i < 12; i++) {
    a.push(0);
  }
  console.log("a", a);
  let hotel = [];
  let hotelOrder = [];
  let hotelPrice = [];
  let bgColors = [];
  while (bgColors.length < 12) {
    do {
      var color = Math.floor(Math.random() * 1000000 + 1);
    } while (bgColors.indexOf(color) >= 0);
    bgColors.push("#" + ("000000" + color.toString(16)).slice(-6));
  }
  let hoverColors = [];
  while (hoverColors.length < 12) {
    do {
      var color = Math.floor(Math.random() * 1000000 + 1);
    } while (hoverColors.indexOf(color) >= 0);
    hoverColors.push("#" + ("000000" + color.toString(16)).slice(-6));
  }

  if (props.orders && props.orders.length) {
    props.orders.map((or, i) => {
      const month = or.orderDate.split("-")[1].replace(/0/g, "");
      a[month - 1] = a[month - 1] + 1;
      if (ind === 1) {
        hotel.push(or.orderData.name);
        hotelOrder.push(0);
        hotelPrice.push(0);
        ind = ind + 1;
        console.log(hotel, hotelOrder);
      } else {
        const hIndex = hotel.findIndex((data) => data === or.orderData.name);
        if (hIndex === -1) {
          hotel.push(or.orderData.name);
          hotelOrder.push(0);
          hotelPrice.push(0);
        }
      }
      if (hotel && hotel.length) {
        const index = hotel.findIndex((data) => data === or.orderData.name);
        hotelOrder[index] = hotelOrder[index] + 1;
        hotelPrice[index] = hotelPrice[index] + or.orderData.total;
      }
    });
  }

  const listData = (
    <div style={{ height: "530px", width: "100%", overflow: "auto" }}>
      {props.token || localStorage.getItem("token") !== null
        ? props.orders.map((order) => (
            <Order
              {...props}
              key={order.id}
              id={order.id}
              custDetails={order.customerDetails}
              date={order.orderDate}
              orderData={order.orderData}
              delete={() => deleteHandler(order.id)}
            />
          ))
        : null}
    </div>
  );

  const chartData = (
    <div
      className="col-md-12"
      style={{ height: "530px", width: "100%", overflow: "auto" }}
    >
      <div className="row">
        <div className="col-md-6">
          <BarChart
            label={"Orders(based on hotel)"}
            hotel={hotel}
            hotelOrder={hotelOrder}
            bgColors={bgColors}
            hoverColors={hoverColors}
          />
        </div>
        <div className="col-md-6">
          <PieChart
            label={"Orders(based on hotel)"}
            hotel={hotel}
            hotelOrder={hotelOrder}
            bgColors={bgColors}
            hoverColors={hoverColors}
          />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <BarChart
            label={"Orders(based on hotel & price)"}
            hotel={hotel}
            hotelOrder={hotelPrice}
            bgColors={bgColors}
            hoverColors={hoverColors}
          />
        </div>
        <div className="col-md-6">
          <PieChart
            label={"Orders(based on hotel & price)"}
            hotel={hotel}
            hotelOrder={hotelPrice}
            bgColors={bgColors}
            hoverColors={hoverColors}
          />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <LineChart
            label={"Orders(based on hotel)"}
            hotel={hotel}
            hotelOrder={hotelOrder}
            bgColors={bgColors}
            hoverColors={hoverColors}
          />
        </div>
        <div className="col-md-6">
          <LineChart
            label={"Orders(based on hotel & price)"}
            hotel={hotel}
            hotelOrder={hotelPrice}
            bgColors={bgColors}
            hoverColors={hoverColors}
          />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <BarChart
            label={"Orders(based on months)"}
            hotel={[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]}
            hotelOrder={a}
            bgColors={bgColors}
            hoverColors={hoverColors}
          />
        </div>
        <div className="col-md-6">
          <PieChart
            label={"Orders(based on months)"}
            hotel={[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]}
            hotelOrder={a}
            bgColors={bgColors}
            hoverColors={hoverColors}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {error}
      {filter}
      {mode === "list"
        ? listData
        : props.orders && props.orders.length
        ? chartData
        : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.orderReducer.actualOrders,
    token: state.authReducer.idToken,
    localId: state.authReducer.localId,
    error: state.orderReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (token, userId) => dispatch(action.fetchOrders(token, userId)),
    deleteOrders: (id, props, token) =>
      dispatch(action.deleteOrder(id, props, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
