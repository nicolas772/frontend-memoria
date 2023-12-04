import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Nav } from 'react-bootstrap';
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';
import { FaHome } from 'react-icons/fa'; // Importa el ícono de Home de Font Awesome
import InfoModal from './InfoModal';
import { MdOutlineSentimentNeutral, MdOutlineSentimentDissatisfied, MdOutlineSentimentSatisfied } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const enunciados = [
  '1. Expresa tu opinión general respecto al software.',
  '2. Elije el sentimiento que mejor te representa en relación al software testeado.'
];


const subtitulo = `Te invitamos a compartir tus impresiones generales del software. Tu aporte es esencial para nuestra mejora continua. 
Juntos, podemos perfeccionar la plataforma en base a tus comentarios.`

function FormSentimentAnalisis() {
  const { iditeration } = useParams();
  const [opinion, setOpinion] = useState("");
  const [selectedSentiment, setSelectedSentiment] = useState(null);
  const [actualQuestion, setActualQuestion] = useState(0)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [lastQuestion, setLastQuestion] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [bodyModal, setBodyModal] = useState('')
  const navigate = useNavigate()

  const handleShowInfoModal = () => setShowInfoModal(true)
  const handleCloseInfoModal = () => setShowInfoModal(false)

  const handleChangeOpinion = (event) => {
    setOpinion(event.target.value);
  };

  const handleSentimentClick = (sentiment) => {
    setSelectedSentiment(sentiment);
  };

  const handleNextQuestion = () => {
    if (opinion.trim().split(' ').length <= 1) {
      setTitleModal('Información')
      setBodyModal('Escribe una opinión más extensa')
      handleShowInfoModal()
    } else {
      setActualQuestion(actualQuestion + 1)
      setLastQuestion(true)
    }
  }

  const handlePrevQuestion = () => {
    setLastQuestion(false)
    setActualQuestion(actualQuestion - 1)
  }

  const handleSubmit = () => {
    if (!selectedSentiment) {
      setTitleModal('Información');
      setBodyModal('Selecciona una opción de sentimiento');
      handleShowInfoModal();
    } else {
      toast.info('Iteración Finalizada. Por favor, espera.', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      const user = AuthService.getCurrentUser();
      UserService.postOpenAnswer(iditeration, user.id, opinion, selectedSentiment).then(
        (response) => {
          // Redireccionar a inicio después de 3 segundos
          toast.info('A continuación, serás redirigido al Inicio.', {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // Agregar un retraso antes de navegar
          setTimeout(() => {
            navigate('/homeUser');
          }, 6000);
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(_content);
        }
      );
    }
  };



  return (
    <>
      <div className="gradient-background-tasks">
        <a href="/homeUser" className="home-link">
          <FaHome className="home-icon" />
          <span className="home-text">Volver a Inicio</span>
        </a>
        <div className="title-container-csuq">
          <h1 className="component-title">¡Valoramos tu opinión!</h1>
          <h2 className="component-subtitle-sentiment">{subtitulo}</h2>
        </div>
        <div className="box-sentiment">
          <p>{enunciados[actualQuestion]}</p>
          {lastQuestion ? (
            <>
              <div className="sentiment-container">
                <div
                  onClick={() => handleSentimentClick('negative')}
                  className={`sentiment-icon ${selectedSentiment === 'negative' ? 'selected' : ''}`}
                >
                  <MdOutlineSentimentDissatisfied className="h-12 w-12 mx-auto" />
                  <h6>Negativo</h6>
                </div>
                <div
                  onClick={() => handleSentimentClick('neutral')}
                  className={`sentiment-icon ${selectedSentiment === 'neutral' ? 'selected' : ''}`}
                >
                  <MdOutlineSentimentNeutral className="h-12 w-12 mx-auto" />
                  <h6>Neutro</h6>
                </div>
                <div
                  onClick={() => handleSentimentClick('positive')}
                  className={`sentiment-icon ${selectedSentiment === 'positive' ? 'selected' : ''}`}
                >
                  <MdOutlineSentimentSatisfied className="h-12 w-12 mx-auto" />
                  <h6>Positivo</h6>
                </div>
              </div>
              <div className="buttons-div-sentiment">
                <button type="button" onClick={handlePrevQuestion}>
                  Atras
                </button>
                <button type="button" onClick={handleSubmit}>
                  Terminar Estudio
                </button>
              </div>
            </>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={opinion}
                  onChange={handleChangeOpinion}
                  className="disable-resize" // Agrega la clase aquí
                  maxLength={240}
                />
              </Form.Group>
              <div className="buttons-div-sentiment">
                <button type="button" onClick={handleNextQuestion}>
                  Siguiente
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="page-indicator">
        {actualQuestion + 1} de 2
      </div>

      <InfoModal
        show={showInfoModal}
        handleClose={handleCloseInfoModal}
        title={titleModal}
        body={bodyModal}
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
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

export default FormSentimentAnalisis;
