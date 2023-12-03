import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];

function ApexChart3() {
  const [chartData, setChartData] = useState({
    series: [
      {
        data: sparklineData,
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 160,
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: 'straight',
      },
      fill: {
        opacity: 0.3,
      },
      yaxis: {
        min: 0,
      },
      colors: ['#DCE6EC'],
      title: {
        text: '$424,652',
        offsetX: 0,
        style: {
          fontSize: '24px',
        },
      },
      subtitle: {
        text: 'Sales',
        offsetX: 0,
        style: {
          fontSize: '14px',
        },
      },
    },
  });

  useEffect(() => {
    // Código de efecto aquí si es necesario
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <div id="chart-spark1">
            <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={160} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApexChart3;
