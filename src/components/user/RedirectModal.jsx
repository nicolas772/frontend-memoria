import { Modal, Button } from 'react-bootstrap';

const RedirectModal = ({ show, handleClose, handleRedirect, body, title }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title style={{ color: '#344b60', fontFamily: "Poppins, sans-serif", fontSize: '24px' }}>
          {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <p style={{ color: '#344b60', fontFamily: "Poppins, sans-serif", fontSize: '16px' }}>
            {body}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" className="btn button-primary" onClick={handleRedirect}>
          Ir a Estudio
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RedirectModal;