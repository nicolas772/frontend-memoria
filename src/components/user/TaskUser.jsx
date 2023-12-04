import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";
import TaskService from "../../services/task.service";
import AuthService from "../../services/auth.service";
import { FaHome } from 'react-icons/fa'; // Importa el ícono de Home de Font Awesome
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../Loader";

const TaskUser = () => {
  const { iditeration, idtask } = useParams();
  const [actualTask, setActualTask] = useState(idtask)
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true)
  const [tareaIniciada, setTareaIniciada] = useState(false);
  const [tiempoInicio, setTiempoInicio] = useState();
  const [duration, setDuration] = useState()
  const [mostrarBotones, setMostrarBotones] = useState(true);
  const [taskQty, setTaskQty] = useState(0)
  const [taskForCont, setTaskForCont] = useState(0)
  const navigate = useNavigate()

  const handleIniciarTarea = () => {
    setTareaIniciada(true);
    setTiempoInicio(new Date()); // Guardar el tiempo de inicio
    toast.info('Tarea Iniciada.', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const handleFinalizarTarea = () => {
    if (tiempoInicio) {
      setTareaIniciada(false);
      const finalizacion = new Date()
      const tiempoDiferencia = finalizacion.getTime() - tiempoInicio.getTime();
      setDuration(tiempoDiferencia)
      setMostrarBotones(false);
      toast.info('Tarea Finalizada.', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const handleTareaCompletada = (complete) => {
    const stringTarea = complete ? "Tarea Completada" : "Tarea No Completada"
    toast.info(stringTarea, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    const user = AuthService.getCurrentUser();
    TaskService.createTaskInfo(user.id, iditeration, actualTask, complete, duration).then(
      (response) => {
        if (response.data.finish) {
          navigate(`/user/doCSUQ/${iditeration}`)
        } else {
          setTaskForCont(response.data.nextTaskForCont)
          setActualTask(response.data.nextTask)
          setMostrarBotones(true)
        }
      },
      (error) => {
        console.log(error)
      }
    )
  };

  useEffect(() => {
    if (!actualTask) {
      return;
    }
    UserService.getTask(actualTask).then(
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
  }, [actualTask]);

  useEffect(() => {
    UserService.getIterationWithDataStudy(iditeration).then(
      (response) => {
        setTaskQty(response.data.iteration.task_qty)
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
    const user = AuthService.getCurrentUser();
    UserService.getNextTaskForStudy(iditeration, user.id).then(
      (response) => {
        setTaskForCont(response.data.lastTaskForCont)
        setLoading(false)
      },
      (error) => {
        console.log(error)
      }
    )
  }, []);
  
  if (loading) {
    return <Loader />
  }
  return (
    <div className="gradient-background-tasks">
      <a href="/homeUser" className="home-link">
        <FaHome className="home-icon" />
        <span className="home-text">Volver a Inicio</span>
      </a>
      <div className="title-container">
        <h1 className="component-title">Tarea {taskForCont}</h1>
        <h2 className="component-subtitle">{content?.title || "Cargando..."}</h2>
      </div>
      <div className="box-task">
        {content?.description?.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
        {mostrarBotones ? (
          <div className="buttons-div">
            <button onClick={handleIniciarTarea} type="button" disabled={tareaIniciada}>
              Iniciar Tarea
            </button>
            <button onClick={handleFinalizarTarea} type="button" disabled={!tareaIniciada}>
              Finalizar Tarea
            </button>
          </div>
        ) : (
          <div className="buttons-div">
            <button onClick={() => handleTareaCompletada(true)} type="button">
              Tarea completada
            </button>
            <button onClick={() => handleTareaCompletada(false)} type="button">
              Tarea no completada
            </button>
          </div>
        )}
      </div>
      <div className="page-indicator">
        {taskForCont} de {taskQty}
      </div>
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
    </div>
  )
}

export default TaskUser;
