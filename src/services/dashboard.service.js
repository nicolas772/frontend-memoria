import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/dashboard/";

//DASHBOARD HOME TESTER

const getCardsContentMain= () => {
  return axios.get(API_URL + "main/cards", { headers: authHeader() });
};

const getColumnChartContentMain= () => {
    return axios.get(API_URL + "main/columnChart", { headers: authHeader() });
};

const getStackedBarContentMain= () => {
  return axios.get(API_URL + "main/stackedBar", { headers: authHeader() });
};


const DashboardService = {
  getCardsContentMain,
  getColumnChartContentMain,
  getStackedBarContentMain,
};

export default DashboardService;