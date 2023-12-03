import { Modal, Button } from 'react-bootstrap';

const ActivateIterationModal = ({ show, handleClose, handleActivate, element, ntareas }) => {
  if (ntareas === 0) {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title style={{ color: '#344b60', fontFamily: "Poppins, sans-serif", fontSize: '24px' }}>
            Información</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ color: '#344b60', fontFamily: "Poppins, sans-serif", fontSize: '16px' }}>
            Agrega una tarea para poder activar la {element}.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: '#344b60', fontFamily: "Poppins, sans-serif", fontSize: '24px' }}>
          Confirmación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <p style={{ color: '#344b60', fontFamily: "Poppins, sans-serif", fontSize: '16px' }}>
            ¿Estás seguro que deseas activar <strong>{element}</strong>?</p>
        </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleActivate} className="btn button-primary">
          Activar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ActivateIterationModal;