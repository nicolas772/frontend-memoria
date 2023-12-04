import React, { useState, useEffect } from "react";
import DashboardIterationService from '../../../services/dashboardIteration.service'
import { Grid, Col } from "@tremor/react";
import MetricCard from "../../charts/MetricCard";
import TableDashUsabilityIteration from "../../tables/TableDashUsabilityIteration";
import BoxPlotChart from "../../charts/BoxPlotChart";
import Loader from "../../Loader";

const DashboardUsabilidadIteration = (props) => {
   const { idIteration } = props
   const [cardsContent, setCardsContent] = useState("");
   const [tableAvgContent, setTableAvgContent] = useState("")
   const [boxPlotContent, setBoxPlotContent] = useState("")
   const [loading1, setLoading1] = useState(true)
   const [loading2, setLoading2] = useState(true)
   const [loading3, setLoading3] = useState(true)

   useEffect(() => {
      DashboardIterationService.getCardsContentUsability(idIteration).then(
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
      DashboardIterationService.getTableAvgContentUsability(idIteration).then(
         (response) => {
            setTableAvgContent(response.data)
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
      DashboardIterationService.getBoxPlotContentUsability(idIteration).then(
         (response) => {
            setBoxPlotContent(response.data)
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

   if (loading1 || loading2 || loading3) {
      return <Loader />
   }

   return (
      <div>
         <Grid numItemsSm={2} numItemsLg={4} className="gap-4">
            <MetricCard
               metric={cardsContent.promedio_scoresus}
               title="Score SUS"
               color="blue"
            ></MetricCard>
            <MetricCard
               metric={cardsContent.promedio_intqual}
               title="Promedio Interfaz Quality"
               color="gray"
            ></MetricCard>
            <MetricCard
               metric={cardsContent.promedio_infoqual}
               title="Promedio Info Quality"
               color="emerald"
            ></MetricCard>
            <MetricCard
               metric={cardsContent.promedio_sysuse}
               title="Promedio System Usability"
               color="amber"
            ></MetricCard>
            <Col numColSpan={2} numColSpanLg={2}>
               <TableDashUsabilityIteration title="Tabla Detalle por Pregunta" content={tableAvgContent} />
            </Col>
            <Col numColSpan={2} numColSpanLg={2}>
               <BoxPlotChart
                  title="Box Plot Puntaje Promedio por Categoría de Evaluación"
                  content={boxPlotContent}
               />
            </Col>
         </Grid>
      </div>
   )
}

export default DashboardUsabilidadIteration