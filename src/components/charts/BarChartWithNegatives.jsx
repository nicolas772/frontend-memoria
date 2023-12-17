import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, Title } from '@tremor/react'

const BarChartWithNegatives = (props) => {
	const {data, categories, title} = props
	const [state] = React.useState({
		series: [
			{
				data: data,
			},
		],
		options: {
			chart: {
				type: 'bar',
			},
			plotOptions: {
				bar: {
					colors: {
						ranges: [
							{
								from: -100,
								to: -46,
								color: '#F15B46',
							},
							{
								from: -45,
								to: 0,
								color: '#FEB019',
							},
						],
					},
					columnWidth: '80%',
				},
			},
			dataLabels: {
				enabled: false,
			},
			yaxis: {
				title: {
					text: 'Score Promedio',
				},
			},
			xaxis: {
				type: 'string',
				categories: categories,
			},
		},
	});

	return (
		<Card>
			<Title>{title}</Title>
			<div style={{margin:"4%"}}></div>
			<ReactApexChart options={state.options} series={state.series} type="bar" height={300} />
		</Card>
	);
};

export default BarChartWithNegatives;
