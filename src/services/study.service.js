import axios from "axios";

const API_URL = "http://localhost:8080/api/study/";

const create = (testerId, softwareName, softwareType, softwareUrl, startDate, endDate) => {
  //alert(testerId + softwareName + softwareType + softwareUrl + startDate + endDate)
  return axios.post(API_URL + "create", {
    softwareName,
    softwareType,
    softwareUrl,
    testerId,
    startDate,
    endDate,
  });
};

const update = (idstudy, softwareName, softwareType, softwareUrl, startDate, endDate) => {
  return axios.put(API_URL + "update", {
    idstudy,
    softwareName,
    softwareType,
    softwareUrl,
    startDate,
    endDate,
  })
}

const deleteStudy = (idStudy) => {
  return axios.delete(API_URL + "delete", { params: { idStudy: idStudy }  })
}

const StudyService = {
  create,
  update,
  deleteStudy,
};

export default StudyService;