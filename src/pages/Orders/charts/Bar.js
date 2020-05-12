import React from "react";
import { Bar } from "react-chartjs-2";
import "../../../Theme.css";

const BarChart = (props) => {
  return (
    <React.Fragment>
      {props.hotelOrder && props.hotelOrder.length ? (
        <Bar
          data={{
            labels: props.hotel,
            datasets: [
              {
                label:
                  props.label.search("price") !== -1
                    ? "Total ordered price"
                    : "Orders",
                backgroundColor: props.bgColors,
                hoverBackgroundColor: props.hoverColors,
                data:
                  props.hotelOrder && props.hotelOrder.length
                    ? props.hotelOrder
                    : [],
              },
            ],
          }}
          options={{
            title: {
              display: true,
              fontColor: "green",
              text: props.label,
              fontSize: 20,
            },
            legend: {
              display: false,
              position: "right",
            },
          }}
        />
      ) : null}
    </React.Fragment>
  );
};

export default BarChart;
