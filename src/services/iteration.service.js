import axios from "axios";
import link from "./host-link";

//const API_URL = "http://localhost:8080/api/iteration/";
const API_URL = link + "api/iteration/"

const create = (idstudy, objetivo, startDate, endDate) => {
  return axios.post(API_URL + "create", {
    idstudy,
    objetivo,
    startDate,
    endDate,
  });
}

const update = (iditeration, objetivo, startDate, endDate) => {
  return axios.put(API_URL + "update", {
    iditeration,
    objetivo,
    startDate,
    endDate,
  })
}

const setStateIteration = (iditeration, idStudy, state) => {
  return axios.put(API_URL + "setState", {
    iditeration,
    idStudy,
    state,
  })
}

const deleteIteration = (idIteration, idStudy) => {
  return axios.delete(API_URL + "delete", { params: { idIteration: idIteration, idStudy: idStudy }  })
}

const IterationService = {
  create,
  update,
  deleteIteration,
  setStateIteration,
};

export default IterationService;