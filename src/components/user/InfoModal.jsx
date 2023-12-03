import { Modal, Button } from 'react-bootstrap';

const InfoModal = ({ show, handleClose, title, body}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title style={{ color: '#344b60', fontFamily: "Poppins, sans-serif", fontSize: '24px' }}>
          {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <p style={{ color: '#344b60', fontFamily: "Poppins, sans-serif", fontSize: '16px' }}>
            {body}.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoModal;