import axios from "axios";
import authHeader from "./auth-header";
import link from "./host-link";

//const API_URL = "http://localhost:8080/api/dashboard/study/";
const API_URL = link + "api/dashboard/study/"

//DASHBOARD GENERAL ESTUDIO

const getCardsContentGeneral = (idStudy) => {
    return axios.get(API_URL + "general/cards", { headers: authHeader(), params: { idStudy: idStudy }  });
};

const getBarListContentGeneral = (idStudy) => {
    return axios.get(API_URL + "general/bar-list", { headers: authHeader(), params: { idStudy: idStudy }  });

}

const getBarChartContentGeneral = (idStudy) => {
    return axios.get(API_URL + "general/bar-chart", { headers: authHeader(), params: { idStudy: idStudy }  });
}

const getTableTimeContentGeneral = (idStudy) => {
    return axios.get(API_URL + "general/table-time", { headers: authHeader(), params: { idStudy: idStudy }  });
}

//DASHBOARD DEMOGRÁFICO ESTUDIO

const getCardsContentDemogr = (idStudy) => {
    return axios.get(API_URL + "demogr/cards", { headers: authHeader(), params: { idStudy: idStudy }  });
};

const getPieChartContentDemogr = (idStudy) => {
    return axios.get(API_URL + "demogr/pie-chart", { headers: authHeader(), params: { idStudy: idStudy }  });
}

const getBarChartContentDemogr = (idStudy) => {
    return axios.get(API_URL + "demogr/bar-chart", { headers: authHeader(), params: { idStudy: idStudy }  });
}

const getStackedChartContentDemogr = (idStudy) => {
    return axios.get(API_URL + "demogr/stacked-chart", { headers: authHeader(), params: { idStudy: idStudy }  });
}

//DASHBOARD USABILITY ESTUDIO

const getCardsContentUsability = (idStudy) => {
    return axios.get(API_URL + "usability/cards", { headers: authHeader(), params: { idStudy: idStudy }  });
};

const getBoxPlotContentUsability = (idStudy) => {
    return axios.get(API_URL + "usability/box-plot", { headers: authHeader(), params: { idStudy: idStudy }  });
};

const getBarChartContentUsability = (idStudy) => {
    return axios.get(API_URL + "usability/bar-chart", { headers: authHeader(), params: { idStudy: idStudy }  });
};

//DASHBOARD SENTIMIENTOS STUDY

const getCardsContentSentiment = (idStudy) => {
    return axios.get(API_URL + "sentiment/cards", { headers: authHeader(), params: { idStudy: idStudy }  });
};

const getPieChartContentSentiment = (idStudy) => {
    return axios.get(API_URL + "sentiment/pie-chart", { headers: authHeader(), params: { idStudy: idStudy }  });
};

const getCarouselContentSentiment = (idStudy) => {
    return axios.get(API_URL + "sentiment/carousel", { headers: authHeader(), params: { idStudy: idStudy }   });
};

const getBarChartContentSentiment = (idStudy) => {
    return axios.get(API_URL + "sentiment/bar-chart", { headers: authHeader(), params: { idStudy: idStudy }  });
};

const getCloudWordContentSentiment = (idStudy) => {
    return axios.get(API_URL + "sentiment/cloud-word", { headers: authHeader(), params: { idStudy: idStudy }   });
};

const DashboardStudyService = {
    getCardsContentGeneral,
    getBarListContentGeneral,
    getBarChartContentGeneral,
    getTableTimeContentGeneral,
    getCardsContentDemogr,
    getPieChartContentDemogr,
    getBarChartContentDemogr,
    getStackedChartContentDemogr,
    getCardsContentUsability,
    getBoxPlotContentUsability,
    getBarChartContentUsability,
    getCardsContentSentiment,
    getPieChartContentSentiment,
    getCarouselContentSentiment,
    getBarChartContentSentiment,
    getCloudWordContentSentiment,
};

export default DashboardStudyService;