import { Modal, Button } from 'react-bootstrap';
import { useDemoUser } from '../hooks/useDemoUser';

const DeleteConfirmationModal = ({ show, handleClose, handleDelete, element }) => {
  const {isDemoUser} = useDemoUser()
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title style={{ color: '#344b60', fontFamily: "Poppins, sans-serif", fontSize: '24px' }}>
          Confirmación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p
          style={{ color: '#344b60', fontFamily: "Poppins, sans-serif", fontSize: '16px' }}
        >¿Estás seguro que deseas eliminar lo siguiente: <strong>{element}</strong>?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={isDemoUser}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;