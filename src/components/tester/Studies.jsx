import { useState, useEffect } from "react"
import TableStudies from "./TableStudies"
import ModalFormStudy from "./ModalFormStudy";
import UserService from "../../services/user.service";
import Loader from "../Loader";

const Studies = ({ user }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [content, setContent] = useState([]);
  const [reloadStudy, setReloadStudy] = useState(false); // Variable para forzar la recarga del componente
  const [loading, setLoading] = useState(true)
  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => {
    setShowCreateModal(false)
    setReloadStudy(!reloadStudy);
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
  }, [reloadStudy]);

  
  if (loading) {
    return <Loader />
  }

  return (
    <div style={{ margin: '20px' }}>
      <div className="header-pages">
        <header>
          <h3>Mis Estudios</h3>
          <p>
            Total Estudios: <strong>{content.length}</strong>&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
        </header>
      </div>
      <button
        onClick={handleShowCreateModal}
        type="button"
        className="btn button-primary"
        
      >
        Crear Estudio
      </button>

      <div style={{ margin: 20 }}></div>
      <TableStudies content={content}></TableStudies>

      <div style={{ margin: 20 }}>
        <ModalFormStudy show={showCreateModal}
          handleClose={handleCloseCreateModal}
          userId={user.id} />
      </div>
    </div>
  )
}
export default Studies