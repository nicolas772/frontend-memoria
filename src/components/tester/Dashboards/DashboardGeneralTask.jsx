import React, { useState, useEffect } from "react";
import MetricCard from "../../charts/MetricCard";
import { Grid, Col } from "@tremor/react";
import BarChartGraphic from "../../charts/BarChartGraphic";
import DashboardTaskService from "../../../services/dashboardTask.service";
import Loader from "../../Loader";

const valueFormatter = (number) => {
  const percentage = new Intl.NumberFormat("us", { style: 'percent', minimumFractionDigits: 1 }).format(number);
  return percentage;
};

const valueFormatter2 = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
};

export default function DashboardGeneralTask(props) {
  const { idTask } = props;
  const [cardsContent, setCardsContent] = useState("");
  const [barChartContent, setBarChartContent] = useState("")
  const [loading1, setLoading1] = useState(true)
  const [loading2, setLoading2] = useState(true)

  useEffect(() => {
    DashboardTaskService.getCardsContentGeneral(idTask).then(
      (response) => {
        setCardsContent(response.data)
        setLoading1(false)
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setCardsContent(_content);
      }
    );
  }, []);

  useEffect(() => {
    DashboardTaskService.getBarChartContentGeneral(idTask).then(
      (response) => {
        setBarChartContent(response.data)
        setLoading2(false)
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setBarChartContent(_content);
      }
    );
  }, []);


  if (loading1 || loading2) {
    return <Loader />
  }

  return (
    <div>
      <Grid numItemsSm={2} numItemsLg={4} className="gap-4">
        <MetricCard
          metric={cardsContent.porcentaje_exito}
          title="Porcentaje Éxito"
          color="blue"
        ></MetricCard>
        <MetricCard
          metric={cardsContent.tiempo_promedio}
          title="Tiempo Promedio"
          color="gray"
        ></MetricCard>
        <MetricCard
          metric={cardsContent.diferencia}
          title="Diferencia de Tiempo "
          color="amber"
        ></MetricCard>
        <MetricCard
          metric={cardsContent.tiempo_optimo}
          title="Tiempo Óptimo"
          color="emerald"
        ></MetricCard>
        <Col numColSpan={2} numColSpanLg={2}>
          <BarChartGraphic
            content={barChartContent.chartData1}
            valueFormatter={valueFormatter}
            title="Porcentaje Éxito por rango etario y conocimiento tecnológico"
            categories={barChartContent.categories}
            color={barChartContent.colors}
            stack={false} />
        </Col>
        <Col numColSpan={2} numColSpanLg={2}>
          <BarChartGraphic
            content={barChartContent.chartData2}
            valueFormatter={valueFormatter2}
            title="Tiempo Promedio por rango etario y conocimiento tecnológico"
            categories={barChartContent.categories}
            color={barChartContent.colors}
            stack={false} />
        </Col>
      </Grid>
    </div>
  );
}