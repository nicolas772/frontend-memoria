import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, Title } from "@tremor/react";

const PieChart = (props) => {
   const { title, color, content, legendPosition = 'bottom', widthChart = '100%' } = props
   const [chartState] = useState({
      series: content.series,
      options: {
         chart: {
            type: 'pie',
         },
         labels: content.labels,
         colors: content.colors,
         legend: {
            position: legendPosition,
         },
         responsive: [
            {
               breakpoint: 480,
               options: {
                  chart: {
                     width: widthChart,
                  },
                  legend: {
                     position: 'bottom',
                  },
               },
            },
         ],
      },
   });

   return (
      <Card
         decoration="top"
         decorationColor={color}       
      >
         <Title className='mb-2'>{title}</Title>

         <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Centrar horizontalmente
            
         }}>
            <ReactApexChart options={chartState.options} series={chartState.series} type="pie" width={widthChart} />
         </div>
      </Card>
   );
};

export default PieChart;
