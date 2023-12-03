import React, { useState, useEffect } from "react";
import TaskService from "../../services/task.service";
import UserService from "../../services/user.service";
import InfoModal from "../user/InfoModal"

const FormTask = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [dificulty, setDificulty] = useState("Fácil");
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [study, setStudy] = useState("");
  const [iteration, setIteration] = useState("");
  const [inSelection, setInSelection] = useState(true)
  const [content, setContent] = useState([]);
  const [contentIterations, setContentIterations] = useState([]);
  const [faltaStudyIteration, setFaltaStudyIteration] = useState(false)
  const [warning, setWarning] = useState("")
  const [faltanInputs, setFaltanInputs] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [bodyModal, setBodyModal] = useState('')
  const [loading, setLoading] = useState(true)

  const handleShowInfoModal = () => setShowInfoModal(true)
  const handleCloseInfoModal = () => setShowInfoModal(false)

  const handleMinutesChange = (event) => {
    setMinutes(event.target.value);
  };

  const handleSecondsChange = (event) => {
    setSeconds(event.target.value);
  };

  const onChangeTitulo = (e) => {
    const titulo = e.target.value;
    setTitulo(titulo);
  };
  const onChangeDescripcion = (e) => {
    const descripcion = e.target.value;
    setDescripcion(descripcion);
  };
  const onChangeDificulty = (e) => {
    const dificulty = e.target.value;
    setDificulty(dificulty);
  };
  const onChangeStudy = (e) => {
    const study = e.target.value;
    setStudy(study);
  };
  const onChangeIteration = (e) => {
    const iteration = e.target.value;
    setIteration(iteration);
  };
  const handleNext = () => {
    if (!study) {
      setWarning("Por favor, selecciona un estudio.")
      setFaltaStudyIteration(true)
      return
    }
    if (!iteration) {
      setWarning("Por favor, selecciona una iteración.")
      setFaltaStudyIteration(true)
      return
    }
    const iterationState = contentIterations.find(iterationAux => iterationAux.id === parseInt(iteration, 10))?.state;
    if (iterationState === "Activa" || iterationState === "Finalizada") {
      setTitleModal('Información')
      setBodyModal("No es posible crea una Tarea en una Iteración Activa o Finalizada")
      handleShowInfoModal()
      return
    }
    setFaltaStudyIteration(false)
    setInSelection(false)
  }
  const handleBack = () => {
    setInSelection(true)
    setFaltanInputs(false)
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

  useEffect(() => {
    //if para filtrar si estudio es vacio o no
    if (study) {
      UserService.getIterations(study).then(
        (response) => {
          setContentIterations(response.data);
          setIteration("")
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setContentIterations(_content);
        }
      );
    }
  }, [study]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (titulo === "" || descripcion === "" || !minutes || !seconds) {
      setFaltanInputs(true)
      return
    }
    TaskService.create(iteration, titulo, descripcion, dificulty, minutes, seconds).then(
      (response) => {
        setTitulo("")
        setDescripcion("")
        setDificulty("Fácil")
        setMinutes()
        setSeconds()
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
    return <div>Cargando...</div>
  }
  return (
    <>
      <div className="background-image container-create-form">
        <div className="column">
          <div className="createForm-div">
            <h1>📌 Crear Tarea</h1>
            <p>
              <strong>Cada iteración</strong> de un estudio tiene <strong>variadas tareas</strong> a realizar por los
              usuarios que testearan tu software. En este formulario, puedes
              <strong> seleccionar el estudio y la iteración </strong>para
              la cual deseas crear una tarea, proporcionando <strong>instrucciones
                lo suficientemente claras</strong> para que los usuarios puedan completarla
              sin dificultades.
            </p>
          </div>
        </div>
        <div className="column">
          {inSelection ? (
            <div className='box-createForm' style={{ top: '23%' }}>
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
              <div className="inputBox">
                <select className="form-control"
                  style={{ width: "60%", textAlign: "center" }}
                  value={iteration}
                  onChange={onChangeIteration}
                  required>
                  <option value="" disabled>Opciones</option>
                  {contentIterations.map((iteration, index) => (
                    <option key={index} value={iteration.id}>
                      Iteración {iteration.iteration_number}
                    </option>
                  ))}
                </select>
              </div>
              <div className="labelBox">
                <label>Selecciona una Iteración</label>
              </div>
              {faltaStudyIteration && (
                <div className="alert alert-danger" role="alert">
                  {warning}
                </div>
              )}
              <div className="buttons-div">
                <button type="button" onClick={handleNext}>
                  Siguiente
                </button>
              </div>
            </div>


          ) : (

            <div className='box-createForm' style={{ top: '10%' }}>
              <div className="inputBox">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingresa un título"
                  value={titulo}
                  onChange={onChangeTitulo}
                  maxLength={85}
                >
                </input>
              </div>
              <div className="labelBox">
                <label>Título de la tarea</label>
              </div>
              <div className="inputBox">
                <textarea
                  className="form-control"
                  id="miTextarea2"
                  rows={4}
                  placeholder="Ingresa descripción de la tarea"
                  value={descripcion}
                  onChange={onChangeDescripcion}
                >
                </textarea>
              </div>
              <div className="labelBox">
                <label>Descripción de la Tarea</label>
              </div>
              <div className="inputBox">
                <select className="form-control"
                  style={{ width: "60%", textAlign: "center" }}
                  value={dificulty}
                  onChange={onChangeDificulty}
                  required>
                  <option>Fácil</option>
                  <option>Medio</option>
                  <option>Difícil</option>
                </select>
              </div>
              <div className="labelBox">
                <label>Dificultad de la tarea</label>
              </div>
              <div className="container-duracion-optima">
                <div className="column-duracion-optima-right">
                  <select className="form-control"
                    style={{ width: "70%", textAlign: "center" }}
                    value={minutes}
                    onChange={handleMinutesChange}
                    required>
                    <option value="">Minutos</option>
                    {Array.from({ length: 60 }, (_, index) => (
                      <option key={index} value={index}>
                        {index}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="column-dots">:</div>
                <div className="column-duracion-optima-left">
                  <select className="form-control"
                    style={{ width: "70%", textAlign: "center" }}
                    value={seconds}
                    onChange={handleSecondsChange}
                    required>
                    <option value="">Segundos</option>
                    {Array.from({ length: 60 }, (_, index) => (
                      <option key={index} value={index}>
                        {index}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="labelBox">
                <label>Duración óptima de la tarea</label>
              </div>
              {faltanInputs && (
                <div className="alert alert-danger" role="alert">
                  Debes completar todos los campos para crear una tarea.
                </div>
              )}
              <div className="buttons-div">
                <button type="button" onClick={handleBack}>
                  Volver
                </button>
                <button type="button" onClick={handleSubmit}>
                  Crear Tarea
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

export default FormTask;