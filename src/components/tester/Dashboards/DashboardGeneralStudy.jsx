import React, { useState, useEffect } from "react";
import { Grid, Col } from "@tremor/react";
import MetricCardList from "../../charts/MetricCardList";
import DashboardStudyService from '../../../services/dashboardStudy.service'
import BarChartGraphic from "../../charts/BarChartGraphic";
import BarListGraphic from "../../charts/BarListGraphic";
import TableDashGeneralStudy from "../../tables/TableDashGeneralStudy";
import Loader from "../../Loader";

const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

const valueFormatter = (number) => `${new Intl.NumberFormat("us").format(number).toString()}`;

const DashboardGeneralStudy = (props) => {
  const { idStudy } = props
  const [cardsContent, setCardsContent] = useState("");
  const [barListContent, setBarListContent] = useState("");
  const [barChartContent, setBarChartContent] = useState("");
  const [tableTimeContent, setTableTimeContent] = useState("");
  const [loading1, setLoading1] = useState(true)
  const [loading2, setLoading2] = useState(true)
  const [loading3, setLoading3] = useState(true)
  const [loading4, setLoading4] = useState(true)

  useEffect(() => {
    DashboardStudyService.getCardsContentGeneral(idStudy).then(
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
    DashboardStudyService.getBarListContentGeneral(idStudy).then(
      (response) => {
        setBarListContent(response.data);
        setLoading2(false)
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setBarListContent(_content);
      }
    );
  }, []);

  useEffect(() => {
    DashboardStudyService.getBarChartContentGeneral(idStudy).then(
      (response) => {
        setBarChartContent(response.data);
        setLoading3(false)
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

  useEffect(() => {
    DashboardStudyService.getTableTimeContentGeneral(idStudy).then(
      (response) => {
        setTableTimeContent(response.data);
        setLoading4(false)
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

  if (loading1 || loading2 || loading3 || loading4) {
    return <Loader />
  }

  return (
    <div>
      <Grid numItemsSm={2} numItemsLg={2} className="gap-4">
        <MetricCardList content={cardsContent.total_iteraciones} color="amber" />
        {/*<MetricCardList content={cardsContent.total_usuarios} color="emerald" />*/}
        
          <BarListGraphic
            content={barListContent.chartData}
            valueFormatter={formatTime}
            title="Tiempo Promedio de Usuario por Iteración"
            columnA="Iteración"
            columnB="Tiempo" />
        
        
          <BarChartGraphic
            content={barChartContent.chartData}
            valueFormatter={valueFormatter}
            title="Promedio de Tareas de Usuario por Iteración"
            categories={barChartContent.categories}
            color={barChartContent.colors}
            stack={true} />
        
          <TableDashGeneralStudy content = {tableTimeContent} title="Tabla Comparativa de Tiempo"/>
       
      </Grid>
    </div>
  );
}

export default DashboardGeneralStudy