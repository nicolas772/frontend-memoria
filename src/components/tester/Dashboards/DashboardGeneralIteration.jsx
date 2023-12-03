import React, { useState, useEffect } from "react";
import { Grid, Col } from "@tremor/react";
import MetricCardList from "../../charts/MetricCardList";
import TableDashGeneralIteration from "../../tables/TableDashGeneralIteration";
import DashboardIterationService from '../../../services/dashboardIteration.service'
import PieChart from "../../charts/PieChart";
import BarChartGraphic from "../../charts/BarChartGraphic";
import { loadingButtonClasses } from "@mui/lab";

const valueFormatter = (number) => `${new Intl.NumberFormat("us").format(number).toString()}`;

export default function DashboardGeneralIteration(props) {
  const { idIteration } = props;
  const [cardsContent, setCardsContent] = useState("");
  const [tableTimeContent, setTableTimeContent] = useState("");
  const [pieChartContent, setPieChartContent] = useState("")
  const [barChartContent, setBarChartContent] = useState("")
  const [loading1, setLoading1] = useState(true)
  const [loading2, setLoading2] = useState(true)
  const [loading3, setLoading3] = useState(true)
  const [loading4, setLoading4] = useState(true)

  useEffect(() => {
    DashboardIterationService.getCardsContentGeneral(idIteration).then(
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
    DashboardIterationService.getTableTimeContentGeneral(idIteration).then(
      (response) => {
        setTableTimeContent(response.data)
        setLoading2(false)
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
    DashboardIterationService.getPieChartContentGeneral(idIteration).then(
      (response) => {
        setPieChartContent(response.data)
        setLoading3(false)
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
    DashboardIterationService.getBarChartContentGeneral(idIteration).then(
      (response) => {
        setBarChartContent(response.data)
        setLoading4(false)
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

  

  if (loading1 || loading2 || loading3 || loading4) {
    return <div>Cargando...</div>
  }
  return (
    <div>
      <Grid numItemsSm={1} numItemsLg={3} className="gap-4">
        <MetricCardList content={cardsContent.tiempo_promedio} color="amber" />
        <MetricCardList content={cardsContent.tareas_completadas} color="emerald" />
        <PieChart title="Distribución Porcentual de Tareas" color="blue" content={pieChartContent} />
      </Grid>
      <Grid numItemsSm={1} numItemsLg={2} className="gap-4 mt-3">
        <TableDashGeneralIteration title="Tabla Comparativa de Tiempo" content={tableTimeContent} />
        <BarChartGraphic
          content={barChartContent.chartData}
          valueFormatter={valueFormatter}
          title="Relación Cantidad Usuarios que completaron Tarea"
          categories={barChartContent.categories}
          color={barChartContent.colors}
          stack={true} />
      </Grid>

    </div>
  );
}