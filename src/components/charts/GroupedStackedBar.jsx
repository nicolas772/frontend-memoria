import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, Title } from "@tremor/react";

const GroupedStackedBar = (props) => {
   const {series, colors, categories} = props

   const options = {
      chart: {
         type: 'bar',
         height: 350,
         stacked: true,
      },
      stroke: {
         width: 1,
         colors: ['#fff'],
      },
      dataLabels: {
         formatter: (val) => {
            return val;
         },
      },
      plotOptions: {
         bar: {
            horizontal: false,
         },
      },
      xaxis: {
         categories: categories,
      },
      fill: {
         opacity: 1,
      },
      colors: colors,
      yaxis: {
         labels: {
            formatter: (val) => {
               return Math.round(val); // Redondear valores a enteros
            },
         },
         tickAmount: 1, // Mostrar solo valores enteros
      },
      legend: {
         position: 'top',
         horizontalAlign: 'left',
         customLegendItems: ["Niños", "Adolescentes", "Jovenes", "Adultos", "Adulto Mayores"],
         markers: {
            fillColors: ['#28a745',
            '#ffc107',
            '#6f42c1',
            '#007bff',
            '#fd7e14'],
         }
         
      },
   };

   return (
      <Card>
         <Title>
            Usuarios por Conocimiento tecnológico, Rango Etario e Iteración
         </Title>
         <ReactApexChart options={options} series={series} type="bar" height={350} />
      </Card>
   );
};

export default GroupedStackedBar;
