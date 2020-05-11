import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = (props) => {
  return (
    <Line
      data={{
        labels: props.hotel,
        datasets: [
          {
            fill: false,
            lineTension: 0.5,
            borderColor: "rgb(222, 184, 135)",
            label:
              props.label.search("price") !== -1
                ? "Total ordered price"
                : "Orders",
            backgroundColor: props.bgColors,
            hoverBackgroundColor: props.hoverColors,
            data: props.hotelOrder,
          },
        ],
      }}
      options={{
        title: {
          display: true,
          text: props.label,
          fontColor: "green",
          fontSize: 20,
        },
        legend: {
          display: false,
          position: "right",
        },
      }}
    />
  );
};

export default LineChart;
