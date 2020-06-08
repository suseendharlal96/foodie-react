import React from "react";
import { Doughnut } from "react-chartjs-2";

const PieChart = (props) => {
  return (
    <Doughnut
      data={{
        labels: props.hotel,
        datasets: [
          {
            fontColor: "green",
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
          fontColor: "red",
          display: true,
          position: "right",
        },
      }}
    />
  );
};

export default PieChart;
