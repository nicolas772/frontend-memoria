import React from "react";
import ReactApexChart from "react-apexcharts";

function ApexChart2() {
  const state = {
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        type: 'donut',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 100,
          },
          legend: {
            position: 'bottom',
          },
        },
      }],
    },
  };

  return (

    <ReactApexChart options={state.options} series={state.series} type="donut" />

  );
}

export default ApexChart2;
