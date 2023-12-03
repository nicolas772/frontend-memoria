import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import StudyService from "../../services/study.service";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

function ModalEditStudy(props) {
  const { show, handleClose, idstudy, content, onEditSuccess } = props;
  const [softwareName, setSoftwareName] = useState(content.software_name);
  const [softwareType, setSoftwareType] = useState(content.software_tipe);
  const [softwareUrl, setSoftwareUrl] = useState(content.url);
  const [startDate, setStartDate] = useState(new Date(content.start_date));
  const [endDate, setEndDate] = useState(new Date(content.end_date));
  const [badEndDate, setBadEndDate] = useState(false)
  const navigate = useNavigate()
  const [noSoftwareName, setNoSoftwareName] = useState(false)

  const onChangeSoftwareName = (e) => {
    const softwareName = e.target.value;
    setSoftwareName(softwareName);
    setNoSoftwareName(false)
  };
  const onChangeSoftwareType = (e) => {
    const softwareType = e.target.value;
    setSoftwareType(softwareType);
  };
  const onChangeSoftwareUrl = (e) => {
    const softwareUrl = e.target.value;
    setSoftwareUrl(softwareUrl);
  };

  const handleStartCalendar = (date) => {
    setStartDate(date)
    if (date > endDate && endDate !== null) {
      setBadEndDate(true)
    } else {
      setBadEndDate(false)
    }
  }

  const handleEndCalendar = (date) => {
    setEndDate(date)
    if (date < startDate) {
      setBadEndDate(true)
    } else {
      setBadEndDate(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se puede realizar la lógica para enviar los datos del formulario
    if(softwareName === ""){
      setNoSoftwareName(true)
    }else {
      StudyService.update(idstudy, softwareName, softwareType, softwareUrl, startDate, endDate).then(
        (response) => {
          // ... éxito al editar el estudio ...
          const editedContent = {
            ...content,
            software_name: softwareName,
            software_tipe: softwareType,
            url: softwareUrl,
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString()
          };
          onEditSuccess(editedContent); // Llamamos a la función de edición exitosa y pasamos el contenido editado
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: '#344b60', fontFamily: "Poppins, sans-serif"}}>Modificar Estudio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSoftwareName">
              <Form.Label style={{color: '#344b60', fontFamily: "Poppins, sans-serif"}}>Nombre del software</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa un nombre."
                name="softwareName"
                value={softwareName}
                onChange={onChangeSoftwareName}
                style={{ width: "100%", textAlign: "left" }} 
              />
            </Form.Group>

            <div className="form-group">
              <label htmlFor="inputSoftwareType" style={{color: '#344b60', fontFamily: "Poppins, sans-serif"}}>Tipo de software</label>
              <select onChange={onChangeSoftwareType} value={softwareType} id="inputSoftwareType" className="form-control">
                <option>App Desktop</option>
                <option>App Móvil</option>
                <option>App Web</option>
                <option>Otro</option>
              </select>
            </div>

            <Form.Group controlId="formUrl">
              <Form.Label style={{color: '#344b60', fontFamily: "Poppins, sans-serif"}}>URL del software</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa una URL"
                name="Url"
                value={softwareUrl}
                onChange={onChangeSoftwareUrl}
                style={{ width: "100%", textAlign: "left" }} 
              />
            </Form.Group>
            {noSoftwareName && (
              <div className="alert alert-danger" role="alert" style={{ marginTop: '2%' }}>
                Ingresa un Nombre de Software.
              </div>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '5%'
              }}>
              <Button variant="primary" type="submit" className="btn button-primary">
                Editar Estudio
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalEditStudy;
