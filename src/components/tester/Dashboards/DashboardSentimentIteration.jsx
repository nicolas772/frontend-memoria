import React, { useState, useEffect } from "react";
import DashboardIterationService from '../../../services/dashboardIteration.service'
import MetricCardList from "../../charts/MetricCardList";
import PieChart from "../../charts/PieChart";
import SimpleCarousel from "../../charts/Carousel";
import { Grid, Col } from "@tremor/react";
import BarChartWithNegatives from "../../charts/BarChartWithNegatives";
import WordCloudChart from "../../charts/WordCloudChart";
import Loader from "../../Loader";


const valueFormatter = (number) => `${number}`;

export default function DashboardSentimentIteration(props) {
  const { idIteration } = props;
  const [cardsContent, setCardsContent] = useState("");
  const [pieChartContent, setPieChartContent] = useState("")
  const [barChartContent, setBarChartContent] = useState("")
  const [carouselContent, setCarouselContent] = useState("")
  const [cloudContent, setCloudContent] = useState("")
  const [loading1, setLoading1] = useState(true)
  const [loading2, setLoading2] = useState(true)
  const [loading3, setLoading3] = useState(true)
  const [loading4, setLoading4] = useState(true)
  const [loading5, setLoading5] = useState(true)

  useEffect(() => {
    DashboardIterationService.getCardsContentSentiment(idIteration).then(
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
    DashboardIterationService.getPieChartContentSentiment(idIteration).then(
      (response) => {
        setPieChartContent(response.data)
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
    DashboardIterationService.getCarouselContentSentiment(idIteration).then(
      (response) => {
        setCarouselContent(response.data)
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
    DashboardIterationService.getBarChartContentSentiment(idIteration).then(
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

  useEffect(() => {
    DashboardIterationService.getCloudWordContentSentiment(idIteration).then(
      (response) => {
        setCloudContent(response.data)
        setLoading5(false)
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

  if (loading1 || loading2 || loading3 || loading4 || loading5) {
    return <Loader />
  }

  return (
    <div>
      <Grid numItemsSm={1} numItemsLg={3} className="gap-6">
        <MetricCardList content={cardsContent.sentimiento_general} color={cardsContent.color} />
        <PieChart title="Porcentaje por Tipo de Opinión" color="blue" content={pieChartContent} widthChart='105%'/>
        <SimpleCarousel content={carouselContent.opiniones} title="Opiniones"></SimpleCarousel>
      </Grid>
      <div style={{margin:'2%'}}></div>
      <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
        <BarChartWithNegatives 
        title="Score por Usuario"
        data={barChartContent.chartData}
        categories={barChartContent.categories}/>
        <WordCloudChart content={cloudContent.data} title="Tags Opiniones"/>
      </Grid>
    </div>
  );
}