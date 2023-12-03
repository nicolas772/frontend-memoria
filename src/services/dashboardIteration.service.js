import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/dashboard/iteration/";

//DASHBOARD GENERAL ITERACIÓN

const getCardsContentGeneral = (idIteration) => {
    return axios.get(API_URL + "general/cards", { headers: authHeader(), params: { idIteration: idIteration }  });
};

const getTableTimeContentGeneral = (idIteration) => {
    return axios.get(API_URL + "general/table-time", { headers: authHeader(), params: { idIteration: idIteration }  });
}

const getPieChartContentGeneral = (idIteration) => {
    return axios.get(API_URL + "general/pie-chart", { headers: authHeader(), params: { idIteration: idIteration }  });
}

const getBarChartContentGeneral = (idIteration) => {
    return axios.get(API_URL + "general/bar-chart", { headers: authHeader(), params: { idIteration: idIteration }  });
}

//DASHBOARD DEMOGRÁFICO ITERACIÓN

const getCardsContentDemogr = (idIteration) => {
    return axios.get(API_URL + "demogr/cards", { headers: authHeader(), params: { idIteration: idIteration }  });
};

const getPieChartContentDemogr = (idIteration) => {
    return axios.get(API_URL + "demogr/pie-chart", { headers: authHeader(), params: { idIteration: idIteration }  });
}

const getBarChartContentDemogr = (idIteration) => {
    return axios.get(API_URL + "demogr/bar-chart", { headers: authHeader(), params: { idIteration: idIteration }  });
}

//DASHBOARD USABILITY ITERACIÓN

const getCardsContentUsability = (idIteration) => {
    return axios.get(API_URL + "usability/cards", { headers: authHeader(), params: { idIteration: idIteration }  });
};

const getTableAvgContentUsability = (idIteration) => {
    return axios.get(API_URL + "usability/table-avg", { headers: authHeader(), params: { idIteration: idIteration }  });
};

const getBoxPlotContentUsability = (idIteration) => {
    return axios.get(API_URL + "usability/box-plot", { headers: authHeader(), params: { idIteration: idIteration }  });
};

//DASHBOARD SENTIMIENTOS ITERACIÓN

const getCardsContentSentiment = (idIteration) => {
    return axios.get(API_URL + "sentiment/cards", { headers: authHeader(), params: { idIteration: idIteration }  });
};

const getPieChartContentSentiment = (idIteration) => {
    return axios.get(API_URL + "sentiment/pie-chart", { headers: authHeader(), params: { idIteration: idIteration }  });
};

const getCarouselContentSentiment = (idIteration) => {
    return axios.get(API_URL + "sentiment/carousel", { headers: authHeader(), params: { idIteration: idIteration }  });
};

const getBarChartContentSentiment = (idIteration) => {
    return axios.get(API_URL + "sentiment/bar-chart", { headers: authHeader(), params: { idIteration: idIteration }  });
};

const getCloudWordContentSentiment = (idIteration) => {
    return axios.get(API_URL + "sentiment/cloud-word", { headers: authHeader(), params: { idIteration: idIteration }  });
};

const DashboardIterationService = {
    getCardsContentGeneral,
    getTableTimeContentGeneral,
    getPieChartContentGeneral,
    getBarChartContentGeneral,
    getCardsContentDemogr,
    getPieChartContentDemogr,
    getBarChartContentDemogr,
    getCardsContentUsability,
    getTableAvgContentUsability,
    getBoxPlotContentUsability,
    getCardsContentSentiment,
    getPieChartContentSentiment,
    getCarouselContentSentiment,
    getBarChartContentSentiment,
    getCloudWordContentSentiment,
};

export default DashboardIterationService;