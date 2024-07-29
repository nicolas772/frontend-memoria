import React, { useState } from "react";
import StudyService from "../../services/study.service";
import AuthService from "../../services/auth.service";
import InfoModal from "../user/InfoModal"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)
import { useDemoUser } from "../../hooks/useDemoUser";


const FormStudy = () => {
  const currentUser = AuthService.getCurrentUser();
  const [softwareName, setSoftwareName] = useState("");
  const [softwareType, setSoftwareType] = useState("App Desktop");
  const [softwareUrl, setSoftwareUrl] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [badEndDate, setBadEndDate] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [bodyModal, setBodyModal] = useState('')
  const [faltanInputs, setFaltanInputs] = useState(false)
  const {isDemoUser} = useDemoUser()

  const handleShowInfoModal = () => setShowInfoModal(true)
  const handleCloseInfoModal = () => setShowInfoModal(false)

  const onChangeSoftwareName = (e) => {
    const softwareName = e.target.value;
    setSoftwareName(softwareName);
  };
  const onChangeSoftwareType = (e) => {
    const softwareType = e.target.value;
    setSoftwareType(softwareType);
  };
  const onChangeSoftwareUrl = (e) => {
    const softwareUrl = e.target.value;
    setSoftwareUrl(softwareUrl);
  };
  const handleStartCalendar = (date) => {
    setStartDate(date)
    if (date > endDate && endDate !== null) {
      setBadEndDate(true)
    } else {
      setBadEndDate(false)
    }
  }
  const handleEndCalendar = (date) => {
    setEndDate(date)
    if (date < startDate) {
      setBadEndDate(true)
    } else {
      setBadEndDate(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí manejar campos vacios!!
    if (softwareName === "" || softwareUrl === "") {
      setFaltanInputs(true)
      return
    }
    StudyService.create(currentUser.id, softwareName, softwareType, softwareUrl, startDate, endDate).then(
      (response) => {
        setSoftwareName("")
        setSoftwareType("App Desktop")
        setSoftwareUrl("")
        setStartDate()
        setEndDate()
        setBadEndDate(false)
        setTitleModal('Información')
        setBodyModal(response.data.message)
        handleShowInfoModal()
        setFaltanInputs(false)
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setTitleModal('Error')
        setBodyModal(resMessage)
        handleShowInfoModal()
      }
    );
  }

  return (
    <>
      <div className="background-image container-create-form">
        <div className="column">
          <div className="createForm-div">
            <h1>📘 Crear Estudio</h1>
            <p>
              Para dar inicio a tu experiencia en la plataforma <strong>Feel UX</strong> y
              comenzar a realizar tus estudios de usabilidad, es esencial crear un estudio,
              <strong> completando todos los campos</strong> del formulario que se presenta a
              continuación.
            </p>
          </div>
        </div>
        <div className="column">
          <div className='box-createForm' style={{ top: '20%' }}>
            <div className="inputBox">
              <input
                type="text"
                className="form-control"
                value={softwareName}
                onChange={onChangeSoftwareName}
              >
              </input>
            </div>
            <div className="labelBox">
              <label>Nombre del Software</label>
            </div>
            <div className="inputBox">
              <select className="form-control"
                style={{ width: "60%", textAlign: "center" }}
                value={softwareType}
                onChange={onChangeSoftwareType}
              >
                <option>App Desktop</option>
                <option>App Móvil</option>
                <option>App Web</option>
                <option>Otro</option>
              </select>
            </div>
            <div className="labelBox">
              <label>Tipo de Software</label>
            </div>
            <div className="inputBox">
              <input
                type="text"
                className="form-control"
                value={softwareUrl}
                onChange={onChangeSoftwareUrl}
              >
              </input>
            </div>
            <div className="labelBox">
              <label>URL del Software</label>
            </div>
            {faltanInputs && (
              <div className="alert alert-danger" role="alert">
                Debes completar todos los campos para crear Estudio.
              </div>
            )}
            <div className="buttons-div">
              <button type="button" onClick={handleSubmit} disabled={isDemoUser}>
                Crear Estudio
              </button>
            </div>

          </div>
        </div>
      </div>
      <InfoModal
        show={showInfoModal}
        handleClose={handleCloseInfoModal}
        title={titleModal}
        body={bodyModal}
      />
    </>
  )
}

export default FormStudy;