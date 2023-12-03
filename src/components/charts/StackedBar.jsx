import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function StackedBar(props) {
  const { chartTitle, series, categories, titleXAxis } = props;
  if (!series || !categories) {
    return <p>Cargando gráfico...</p>;
  }
  
  const chartData = {
    series: series,
    options: {
      chart: {
        type: 'bar',
        height: 300,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: '13px',
                fontWeight: 900
              }
            }
          }
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: chartTitle
      },
      xaxis: {
        categories: categories,
        labels: {
          formatter: function (val) {
            return Math.round(val); // Redondear el valor a un número entero
          }
        },
        title: {
          text: titleXAxis,
        },
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
    }
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={chartData.options.chart.height}
      />
    </div>
  );
}

export default StackedBar;
