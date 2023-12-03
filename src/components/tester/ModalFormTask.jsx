import React, { useState, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import TaskService from "../../services/task.service";

function TimeInput(props) {
  return (
    <div>
      <label style={{ marginRight: "7px" }}>{props.label}:</label>
      <input
        type="number"
        min="0"
        max={props.max}
        value={props.value}
        onChange={props.onChange}
        style={{
          marginRight: "10px",
          border: "1px solid #ced4da",
          padding: "5px",
          borderRadius: "5px",
        }}
      />
    </div>
  );
}

function ModalFormTask(props) {
  const { show, handleClose, iditeration } = props;
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [dificulty, setDificulty] = useState("Fácil");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [faltaCampo, setFaltaCampo] = useState(false)

  const handleMinutesChange = (event) => {
    setMinutes(event.target.value);
    setFaltaCampo(false)
  };

  const handleSecondsChange = (event) => {
    setSeconds(event.target.value);
    setFaltaCampo(false)
  };

  const onChangeTitulo = (e) => {
    const titulo = e.target.value;
    setTitulo(titulo);
    setFaltaCampo(false)
  };
  const onChangeDescripcion = (e) => {
    const descripcion = e.target.value;
    setDescripcion(descripcion);
    setFaltaCampo(false)
  };
  const onChangeDificulty = (e) => {
    const dificulty = e.target.value;
    setDificulty(dificulty);
    setFaltaCampo(false)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se puede realizar la lógica para enviar los datos del formulario
    if (titulo === "" || descripcion === "" || dificulty === "" || minutes === "" || seconds === "") {
      setFaltaCampo(true)
    } else {
      TaskService.create(iditeration, titulo, descripcion, dificulty, minutes, seconds).then(
        (response) => {
          setTitulo("")
          setDescripcion("")
          setDificulty("Fácil")
          setMinutes(0)
          setSeconds(0)
          handleClose();
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
          <Modal.Title style={{ color: '#344b60', fontFamily: "Poppins, sans-serif" }}>Nueva Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitulo">
              <Form.Label style={{ color: '#344b60', fontFamily: "Poppins, sans-serif" }}>Título de la Tarea</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa un título para la nueva tarea."
                name="titulo"
                value={titulo}
                onChange={onChangeTitulo}
                style={{ width: "100%", textAlign: "left" }}
                maxLength={85}
              />
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label style={{ color: '#344b60', fontFamily: "Poppins, sans-serif" }}>Descripción de la Tarea</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Describe la tarea a realizar por el usuario."
                name="descripcion"
                value={descripcion}
                onChange={onChangeDescripcion}
              />
            </Form.Group>

            <div className="form-group">
              <label htmlFor="inputSoftwareType" style={{ color: '#344b60', fontFamily: "Poppins, sans-serif" }}>Dificultad de la Tarea</label>
              <select onChange={onChangeDificulty} value={dificulty} id="inputDificulty" className="form-control">
                <option>Fácil</option>
                <option>Medio</option>
                <option>Difícil</option>
              </select>
            </div>
            <label htmlFor="inputDuracion" style={{ color: '#344b60', fontFamily: "Poppins, sans-serif" }}>Duración óptima de la Tarea</label>
            <div className="duracion-optima-div">
              <TimeInput
                label="Minutos"
                max="99"
                value={minutes}
                onChange={handleMinutesChange}
              />

              <TimeInput
                label="Segundos"
                max="59"
                value={seconds}
                onChange={handleSecondsChange}
              />
            </div>
            {faltaCampo && (
              <div className="alert alert-danger" role="alert" style={{ marginTop: '2%' }}>
                Completa todos los campos para poder crear tarea.
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
                Crear Tarea
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalFormTask;
