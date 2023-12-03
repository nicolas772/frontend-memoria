import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const FinalizarIterationModal = ({ show, handleClose, handleFinalizar, element }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title style={{ color: '#344b60', fontFamily: "Poppins, sans-serif", fontSize: '24px' }}>
          Información</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p
          style={{ color: '#344b60', fontFamily: "Poppins, sans-serif", fontSize: '16px' }}
        >¿Estás seguro que deseas finalizar <strong>{element}</strong>?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleFinalizar} className="btn button-primary">
          Finalizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FinalizarIterationModal;