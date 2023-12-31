import React, { useState, useEffect } from "react";
import DashboardIterationService from '../../../services/dashboardIteration.service'
import MetricCardList from "../../charts/MetricCardList";
import PieChart from "../../charts/PieChart";
import SimpleCarousel from "../../charts/Carousel";
import { Grid, Col } from "@tremor/react";
import BarChartWithNegatives from "../../charts/BarChartWithNegatives";
import WordCloudChart from "../../charts/WordCloudChart";
import Loader from "../../Loader";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

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
  const [sentiment, setSentiment] = useState("")
  const [cardColor, setCardColor] = useState("")
  const [porcentajeOpiniones, setPorcentajeOpiniones] = useState("")
  const [scorePromedioData, setScorePromedioData] = useState("")


  useEffect(() => {
    DashboardIterationService.getCardsContentSentiment(idIteration).then(
      (response) => {
        setCardsContent(response.data)
        setSentiment(response.data.sentimiento_general_IA)
        setCardColor(response.data.color_IA)
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
        setPorcentajeOpiniones(response.data.IA)
        setLoading2(false)
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setPieChartContent(_content);
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

        setCarouselContent(_content);
      }
    );
  }, []);

  useEffect(() => {
    DashboardIterationService.getBarChartContentSentiment(idIteration).then(
      (response) => {
        setBarChartContent(response.data)
        setScorePromedioData(response.data.chartDataIA)
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

        setCloudContent(_content);
      }
    );
  }, []);

  const [value, setValue] = useState("Basado en IA")

  const handleDropdown = (option) => {
    setLoading1(true)
    setValue(option);
    if (option === "Basado en IA") {
      setSentiment(cardsContent.sentimiento_general_IA)
      setCardColor(cardsContent.color_IA)
      setPorcentajeOpiniones(pieChartContent.IA)
      setScorePromedioData(barChartContent.chartDataIA)
    } else {
      setSentiment(cardsContent.sentimiento_general_lexicon)
      setCardColor(cardsContent.color_lexicon)
      setPorcentajeOpiniones(pieChartContent.lexicon)
      setScorePromedioData(barChartContent.chartDataLexicon)
    }
    setLoading1(false)
  };

  if (loading1 || loading2 || loading3 || loading4 || loading5) {
    return <Loader />
  }

  return (
    <div>
      <div className="mb-3 d-flex align-items-center">
        <p className="m-0">Tipo de Análisis: </p>
        <DropdownButton id="dropdown-basic-button" title={value} className="ml-2">
          <Dropdown.Item onClick={() => handleDropdown("Basado en IA")}>Basado en IA</Dropdown.Item>
          <Dropdown.Item onClick={() => handleDropdown("Basado en Lexicon")}>Basado en Lexicon</Dropdown.Item>
        </DropdownButton>
      </div>
      <Grid numItemsSm={1} numItemsLg={3} className="gap-6">
        <MetricCardList content={sentiment} color={cardColor} />
        <PieChart title="Porcentaje por Tipo de Opinión" color="blue" content={porcentajeOpiniones} widthChart='105%' />
        <SimpleCarousel content={carouselContent.opiniones} title="Opiniones"></SimpleCarousel>
      </Grid>
      <div style={{ margin: '2%' }}></div>
      <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
        <BarChartWithNegatives
          title="Score promedio por Conocimiento tecnológico"
          data={scorePromedioData}
          categories={barChartContent.categories} />
        <WordCloudChart content={cloudContent.data} title="Tags Opiniones" />
      </Grid>
    </div>
  );
}

//EN CARDS, es cambiar cardsContent.sentimiento_general_lexicon por cardsContent.sentimiento_general_IA y cardsContent.color_lexicon por cardsContent.color_IA
//En pie chart, es cambiar pieChartContent.lexicon por pieChartContent.IA
//en barchart, es cambiar data={barChartContent.chartDataLexicon} por data={barChartContent.chartDataIA}