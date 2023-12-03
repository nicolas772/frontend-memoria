import axios from "axios";
import authHeader from "./auth-header";
import link from "./host-link";

//const API_URL = "http://localhost:8080/api/dashboard/task/";
const API_URL = link + "api/dashboard/task/"

//DASHBOARD GENERAL ESTUDIO

const getCardsContentGeneral = (idTask) => {
    return axios.get(API_URL + "general/cards", { headers: authHeader(), params: { idTask: idTask }  });
};

const getBarChartContentGeneral = (idTask) => {
    return axios.get(API_URL + "general/bar-chart", { headers: authHeader(), params: { idTask: idTask }  });
}

const DashboardTaskService = {
    getCardsContentGeneral,
    getBarChartContentGeneral,
};

export default DashboardTaskService;