import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from "../../services/user.service";
import TaskService from '../../services/task.service';
import ModalEditTask from './ModalEditTask';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button } from 'react-bootstrap';
import CustomTabPanel from "./CustomTabPanel";
import DashboardGeneralTask from "./Dashboards/DashboardGeneralTask"
import InfoModal from '../user/InfoModal'
import Loader from '../Loader';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Task = () => {
  const { idtask } = useParams();
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reloadTask, setReloadTask] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [titleModal, setTitleModal] = useState('Información')
  const [bodyModal, setBodyModal] = useState('')
  const navigate = useNavigate()

  const handleShowInfoModal = () => setShowInfoModal(true)
  const handleCloseInfoModal = () => setShowInfoModal(false)

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false)
    setReloadTask(!reloadTask)
  }

  const handleShowDeleteModal = () => { //solo se puede eliminar en estado creada
    if (content.iteration_state === "Creada") {
      setShowDeleteModal(true);
    } else {
      setBodyModal('No es posible eliminar una Tarea cuando la Iteración está Activa o Finalizada')
      handleShowInfoModal()
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = () => {
    // Lógica para eliminar el elemento
    TaskService.deleteTask(idtask, content.iterationId).then(
      (response) => {
        setShowDeleteModal(false);
        //window.history.back();
        navigate(-1) //hace lo mismo que la linea de arriba
      },
      (error) => {
        console.log(error)
      }
    )
  };

  const handleBack = () => {
    window.history.back();
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setTitle("Tarea '" + content.title + "', de Iteración " + content.iteration_number + " de " + content.software_name)
  }, [content])

  useEffect(() => {
    UserService.getTask(idtask).then(
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
  }, [reloadTask]);

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <div style={{ padding: 20, paddingBottom: 5, position: 'sticky', top: 0, zIndex: 1000, background: 'white' }}>
        <div className="header-pages">
          <header>
            <h3>{content.software_name}: Iteración {content.iteration_number}</h3>
            <p>
              Tarea:&nbsp;<strong>{content.title}</strong>&nbsp;&nbsp;&nbsp;
              Dificultad:&nbsp;<strong>{content.dificulty}</strong>&nbsp;&nbsp;&nbsp;
              Tiempo óptimo:&nbsp;<strong>{content.minutes_optimal} min {content.seconds_optimal} seg.</strong>&nbsp;&nbsp;&nbsp;
            </p>
          </header>
        </div>
        <div style={{ display: 'flex', marginBottom: '2%', marginTop: '2%' }}>
          <button onClick={handleBack} type="button" className="btn button-primary" style={{ marginRight: '10px' }}>
            Volver a Iteración
          </button>
          <button onClick={handleShowModal} type="button" className="btn button-primary" style={{ marginRight: '10px' }}>
            Editar Tarea
          </button>
          <Button variant="danger" onClick={handleShowDeleteModal}>
            Eliminar Tarea
          </Button>
        </div>


        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="General Tarea"
              {...a11yProps(0)} />
            <Tab label="Descripción" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </div>
      <CustomTabPanel value={value} index={0}>
        <DashboardGeneralTask idTask={idtask}></DashboardGeneralTask>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div className="box-task-tester">
            {content.description.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>

      </CustomTabPanel>

      <div style={{ margin: 50 }}></div>
      <ModalEditTask
        show={showModal}
        handleClose={handleCloseModal}
        idtask={idtask}
        content={content}
      />
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
        element={title}
      />
      <InfoModal
        show={showInfoModal}
        handleClose={handleCloseInfoModal}
        title={titleModal}
        body={bodyModal}
      />
    </div>
  )
}

export default Task;