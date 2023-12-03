import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, Title } from "@tremor/react";

const BoxPlotChart = (props) => {
  const {content, title} = props
  const [chartState] = useState({
    series: content.series,
    options: {
      chart: {
        type: 'boxPlot',
        height: 350
      },
      plotOptions: {
        boxPlot: {
          colors: {
            upper: '#5C4742',
            lower: '#A5978B'
          }
        }
      }
    }
  });

  return (
    <Card>
      <Title>{title}</Title>
      <div style={{margin: "2%"}}></div>
      <ReactApexChart
        options={chartState.options}
        series={chartState.series}
        type="boxPlot"
        height={296} />
    </Card>
  );
};

export default BoxPlotChart;
