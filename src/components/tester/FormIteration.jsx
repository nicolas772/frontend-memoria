import React, { useState, useEffect } from "react";
import IterationService from "../../services/iteration.service";
import UserService from "../../services/user.service";
import InfoModal from "../user/InfoModal"
import DatePicker from "react-datepicker"
import Loader from "../Loader";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import { useDemoUser } from "../../hooks/useDemoUser";
registerLocale('es', es)

const FormIteration = () => {
  const [objetivo, setObjetivo] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [badEndDate, setBadEndDate] = useState(false)
  const [study, setStudy] = useState("");
  const [inSelection, setInSelection] = useState(true)
  const [content, setContent] = useState([]);
  const [faltanInputs, setFaltanInputs] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [bodyModal, setBodyModal] = useState('')
  const [faltaStudy, setFaltaStudy] = useState(false)
  const [loading, setLoading] = useState(true)
  const {isDemoUser} = useDemoUser()

  const handleShowInfoModal = () => setShowInfoModal(true)
  const handleCloseInfoModal = () => setShowInfoModal(false)

  const handleNext = () => {
    if (!study) {
      setFaltaStudy(true)
      return
    }
    setInSelection(false)
    setFaltaStudy(false)
  }
  const handleBack = () => {
    setInSelection(true)
    setFaltanInputs(false)
  }

  const onChangeObjetivo = (e) => {
    const objetivo = e.target.value;
    setObjetivo(objetivo);
  };

  const onChangeStudy = (e) => {
    const study = e.target.value;
    setStudy(study);
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

  useEffect(() => {
    UserService.getStudies().then(
      (response) => {
        setContent(response.data);
        setLoading(false)
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (objetivo === "" || !startDate || !endDate) {
      setFaltanInputs(true)
      return
    }
    IterationService.create(study, objetivo, startDate, endDate).then(
      (response) => {
        setObjetivo("")
        setStartDate(null)
        setEndDate(null)
        setBadEndDate(false)
        setTitleModal('Información')
        setBodyModal(response.data.message)
        handleShowInfoModal()
        setFaltanInputs(false)
        setInSelection(true)
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
  
  if (loading) {
    return <Loader />
  }
  return (
    <>
      <div className="background-image container-create-form">
        <div className="column">
          <div className="createForm-div">
            <h1>🔃 Crear Iteración</h1>
            <p>
              Un estudio de usabilidad puede experimentar <strong>múltiples iteraciones de mejora
                continua</strong>. En este contexto, tienes la posibilidad de crear una nueva
              iteración, <strong>seleccionando el estudio</strong> deseado en el menú desplegable y
              <strong> completando los campos </strong>requeridos en siguiente formulario.
            </p>
          </div>
        </div>
        <div className="column">
          {inSelection ? (
            <div className='box-createForm' style={{ top: '27%' }}>
              <div className="inputBox">
                <select className="form-control"
                  style={{ width: "60%", textAlign: "center" }}
                  value={study}
                  onChange={onChangeStudy}
                  required>
                  <option value="" disabled>Opciones</option>
                  {content.map((study, index) => (
                    <option key={index} value={study.id}>
                      {study.software_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="labelBox">
                <label>Selecciona un estudio</label>
              </div>
              {faltaStudy && (
                <div className="alert alert-danger" role="alert">
                  Por favor, selecciona un estudio.
                </div>
              )}
              <div className="buttons-div">
                <button type="button" onClick={handleNext}>
                  Siguiente
                </button>
              </div>
            </div>
          ) : (
            <div className='box-createForm' style={{ top: '15%' }}>
              <div className="inputBox">
                <textarea
                  className="form-control"
                  id="miTextarea"
                  rows={2}
                  placeholder="Ingresa objetivo"
                  value={objetivo}
                  onChange={onChangeObjetivo}
                  maxLength={250}
                >
                </textarea>
              </div>
              <div className="labelBox">
                <label>Objetivo de la Iteración</label>
              </div>
              <div className="inputBox">
                <DatePicker
                  locale="es"
                  selected={startDate}
                  onChange={handleStartCalendar}
                  minDate={new Date()}
                  showDisabledMonthNavigation
                  placeholderText="mm/dd/aaaa"
                  className="form-control"
                />
              </div>
              <div className="labelBox">
                <label>Fecha de Inicio Iteración</label>
              </div>
              <div className="inputBox">
                <DatePicker
                  locale="es"
                  selected={endDate}
                  onChange={handleEndCalendar}
                  minDate={new Date()}
                  showDisabledMonthNavigation
                  placeholderText="mm/dd/aaaa"
                  className="form-control"
                />
              </div>
              <div className="labelBox">
                <label>Fecha de Término Iteración</label>
              </div>
              {badEndDate && (
                <div className="alert alert-danger" role="alert">
                  La fecha de término de Iteración debe ser posterior a la fecha de inicio.
                </div>
              )}
              {faltanInputs && (
                <div className="alert alert-danger" role="alert">
                  Debes completar todos los campos para crear una iteración.
                </div>
              )}
              <div className="buttons-div">
                <button type="button" onClick={handleBack}>
                  Volver
                </button>
                <button type="button" onClick={handleSubmit} disabled={isDemoUser}>
                  Crear Iteración
                </button>
              </div>
            </div>

          )}
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

export default FormIteration;