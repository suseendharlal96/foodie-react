import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = (props) => {
  return (
    <Bar
      data={{
        labels: props.hotel,
        datasets: [
          {
            label: "Orders",
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

export default BarChart;