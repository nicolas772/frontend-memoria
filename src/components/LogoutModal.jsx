import { Modal, Button } from 'react-bootstrap';

const LogoutModal = ({ show, handleClose, handleLogout }) => {
   return (
      <Modal show={show} onHide={handleClose}>
         <Modal.Header>
            <Modal.Title style={{ color: '#344b60', fontFamily: "Poppins, sans-serif", fontSize: '24px' }}>
               Confirmación</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <p
               style={{ color: '#344b60', fontFamily: "Poppins, sans-serif", fontSize: '16px' }}
            >¿Estás seguro que deseas Cerrar Sesión?</p>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
               Cancelar
            </Button>
            <Button variant="primary" onClick={handleLogout} className="btn button-primary">
               Cerrar Sesión
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default LogoutModal;