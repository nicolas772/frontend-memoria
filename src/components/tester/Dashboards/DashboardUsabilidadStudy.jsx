import React, { useState, useEffect } from "react";
import DashboardStudyService from "../../../services/dashboardStudy.service";
import { Grid, Col } from "@tremor/react";
import MetricCard from "../../charts/MetricCard";
import BoxPlotChart from "../../charts/BoxPlotChart";
import BarChartGraphic from "../../charts/BarChartGraphic";
import Loader from "../../Loader";

const valueFormatter = (number) => `${new Intl.NumberFormat("us").format(number).toString()}`;

const DashboardUsabilidadStudy = (props) => {
   const { idStudy } = props
   const [cardsContent, setCardsContent] = useState("");
   const [barChartContent, setBarChartContent] = useState("");
   const [boxPlotContent, setBoxPlotContent] = useState("")
   const [loading1, setLoading1] = useState(true)
   const [loading2, setLoading2] = useState(true)
   const [loading3, setLoading3] = useState(true)

   useEffect(() => {
      DashboardStudyService.getCardsContentUsability(idStudy).then(
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
      DashboardStudyService.getBarChartContentUsability(idStudy).then(
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

            setCardsContent(_content);
         }
      );
   }, []);

   useEffect(() => {
      DashboardStudyService.getBoxPlotContentUsability(idStudy).then(
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
               title="Promedio Score SUS"
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
               <BarChartGraphic
                  content={barChartContent.chartData}
                  valueFormatter={valueFormatter}
                  title="Promedio CSUQ por Iteración"
                  categories={barChartContent.categories}
                  color={barChartContent.colors}
                  stack={false} />
            </Col>
            <Col numColSpan={2} numColSpanLg={2}>
               <BoxPlotChart
                  title="Box Plot Puntaje Promedio Total por Iteración"
                  content={boxPlotContent}
               />
            </Col>
         </Grid>
      </div>
   )
}

export default DashboardUsabilidadStudy