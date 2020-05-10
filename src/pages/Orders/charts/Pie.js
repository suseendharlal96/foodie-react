import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = (props) => {
  return (
    <Pie
      data={{
        labels: props.hotel,
        datasets: [
          {
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
          display: true,
          position: "right",
        },
      }}
    />
  );
};

export default PieChart;
