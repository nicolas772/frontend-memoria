import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';
import { FaHome } from 'react-icons/fa'; // Importa el ícono de Home de Font Awesome
import InfoModal from './InfoModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const likertScale = [
  "Totalmente en desacuerdo",
  "Bastante en desacuerdo",
  "En desacuerdo",
  "Indiferente",
  "De acuerdo",
  "Bastante de acuerdo",
  "Totalmente de acuerdo"
];

const preguntas = [
  '1. En general, estoy satisfecho con lo facil que es utilizar este software.',
  '2. Fue simple utilizar este software.',
  '3. Soy capaz de completar mi trabajo rápidamente utilizando este software.',
  '4. Me siento comodo utilizando este software.',
  '5. Fue fácil aprender a utilizar este software.',
  '6. Creo que me volví experto rapidamente utilizando este software.',
  '7. El software muestra mensajes de error que me dicen claramente cómo resolver los problemas.',
  '8. Cada vez que cometo un error utilizando el software, lo resuelvo fácil y rapidamente.',
  '9. La información (como ayuda en linea, mensajes en pantalla y otra documentación) que provee el software es clara.',
  '10. Es fácil encontrar en el software la información que necesito.',
  '11. La información que proporciona el software fue efectiva ayudándome a completar las tareas.',
  '12. La organización de la información del software en la pantalla fue clara.',
  '13. La interfaz del software fue placentera.',
  '14. Me gustó utilizar el software.',
  '15. El software tuvo todas las herramientas que esperaba que tuviera.',
  '16. En general, estuve satisfecho con el software.'
];

const subtitulo = `El siguiente cuestionario consta de 16 enunciados, 
  los cuales fueron diseñados para evaluar tu satisfacción como usuario del software. 
  Para cada uno de ellos debes responder de forma sincera, seleccionando la opción que mejor 
  te represente.`


const FormCSUQ = () => {

  const [selectedValue, setSelectedValue] = useState(null);
  const [actualQuestion, setActualQuestion] = useState(0)
  const [firstQuestion, setFirstQuestion] = useState(true)
  const [lastQuestion, setLastQuestion] = useState(false)
  const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill(null));
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [bodyModal, setBodyModal] = useState('')
  const { iditeration } = useParams();
  const navigate = useNavigate()

  const handleShowInfoModal = () => setShowInfoModal(true)
  const handleCloseInfoModal = () => setShowInfoModal(false)

  const handleRespuestaChange = (index, valor) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = valor;
    setRespuestas(nuevasRespuestas);
  };

  const handleRadioClick = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleNextQuestion = () => {
    if (selectedValue === null) {
      setTitleModal('Información')
      setBodyModal('Selecciona una opción de respuesta antes de continuar')
      handleShowInfoModal()
    } else {
      handleRespuestaChange(actualQuestion, selectedValue)
      if (actualQuestion === 14) {
        setLastQuestion(true)
      }
      if (actualQuestion === 0) {
        setFirstQuestion(false)
      }
      setSelectedValue(respuestas[actualQuestion + 1])
      setActualQuestion(actualQuestion + 1)
    }
  }

  const handlePrevQuestion = () => {
    handleRespuestaChange(actualQuestion, selectedValue)
    if (actualQuestion === 1) {
      setFirstQuestion(true)
    }
    if (actualQuestion === 15) {
      setLastQuestion(false)
    }
    setSelectedValue(respuestas[actualQuestion - 1])
    setActualQuestion(actualQuestion - 1)
  }

  const handleEnviarCuestionario = () => {
    if (selectedValue === null) {
      setTitleModal('Información')
      setBodyModal('Selecciona una opción de respuesta antes de continuar')
      handleShowInfoModal()
    } else {
      toast.info('Cuestionario CSUQ Finalizado', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      let respuestasInt = respuestas.map(str => parseInt(str));
      respuestasInt[actualQuestion]=parseInt(selectedValue)
      const user = AuthService.getCurrentUser();
      UserService.postCSUQAnswers(iditeration, user.id, respuestasInt).then(
        (response) => {
          navigate(`/user/doQuestion/${iditeration}`)
        },
        (error) => {
          console.log(error)
        }
      )
    }
  };

  return (
    <>
      <div className="gradient-background-csuq">
        <a href="/homeUser" className="home-link">
          <FaHome className="home-icon" />
          <span className="home-text">Volver a Inicio</span>
        </a>
        <div className="title-container-csuq">
          <h1 className="component-title">Cuestionario CSUQ</h1>
          <h2 className="component-subtitle-csuq">{subtitulo}</h2>
        </div>
        <div className="box-csuq">
          <p>{preguntas[actualQuestion]}</p>
          <div className="range">
            {[1, 2, 3, 4, 5, 6, 7].map((value) => (
              <div className="range__level" key={value}>
                <input
                  id={value}
                  type="radio"
                  name="range"
                  value={value}
                  checked={selectedValue === value.toString()}
                  onChange={handleRadioClick}
                />
                <label htmlFor={value} className={`range__radio ${selectedValue === value.toString() ? "selected" : "unselected"}`} data-label={`${likertScale[value - 1]}`}></label>
              </div>
            ))}

          </div>

          <div className="buttons-div">
            <button type="button" onClick={handlePrevQuestion} disabled={firstQuestion}>
              Anterior
            </button>
            {lastQuestion ? (
              <button type="button" onClick={handleEnviarCuestionario}>
                Enviar Respuestas
              </button>
            ) : (
              <button type="button" onClick={handleNextQuestion}>
                Siguiente
              </button>
            )}

          </div>
        </div>
        <div className="page-indicator">
          {actualQuestion + 1} de 16
        </div>
      </div>
      <InfoModal
        show={showInfoModal}
        handleClose={handleCloseInfoModal}
        title={titleModal}
        body={bodyModal}
      />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>

  );
}

export default FormCSUQ;
