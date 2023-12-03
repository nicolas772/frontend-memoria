import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/user.service';
import InfoModal from './InfoModal';
import IterationUser from './IterationUser';

function CodigoForm() {
  const [codigo, setCodigo] = useState('');
  const [titleModal, setTitleModal] = useState('')
  const [bodyModal, setBodyModal] = useState('')
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [showIterationUser, setShowIterationUser] = useState(false)
  const navigate = useNavigate()

  const handleShowInfoModal = () => setShowInfoModal(true)
  const handleCloseInfoModal = () => setShowInfoModal(false)
  const handleIterationUser = () => setShowIterationUser(false)

  const handleChange = (event) => {
    const { value } = event.target;
    const numericValue = value.replace(/\D/g, ''); // Eliminar todos los caracteres que no sean números
    setCodigo(numericValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const codigo_iteracion_int = parseInt(codigo, 10)
    UserService.getIteration(codigo_iteracion_int).then(
      (response) => {
        const data = response.data
        if (data) {
          if (data.state === 'Activa') {
            //navigate(`/doiteration/${codigo_iteracion_int}`)
            setShowIterationUser(true)
          } else {
            setTitleModal('Información')
            setBodyModal('La iteracion ingresada tiene el siguiente estado: ' + data.state)
            handleShowInfoModal()
          }
        } else {
          setTitleModal('Advertencia')
          setBodyModal('No hay registro de esta iteracion')
          handleShowInfoModal()
        }
      },
      (error) => {
        setTitleModal('Advertencia')
        setBodyModal('No hay registro de esta iteracion')
        handleShowInfoModal()
      }
    )
  };

  return (
    <>
      {!showIterationUser ? (
        <div className='box-code-study'>
          <form onSubmit={handleSubmit}>
            <div className='inputBox'>
              <label>
                Ingresa el Código del Estudio:
              </label>
              <input
                type="tel"
                value={codigo}
                onChange={handleChange}
                maxLength="6"
                pattern="[0-9]*"
                className="form-control">
              </input>
            </div>

            <div className='button-container'>
              <input type="submit" value="Ingresar" />
            </div>
          </form>
        </div>

      ) : (
        <div className='box-code-iteration'>
          <IterationUser 
            iditeration={parseInt(codigo, 10)}
            handleBack={handleIterationUser}
          />
        </div>
      )}


      <InfoModal
        show={showInfoModal}
        handleClose={handleCloseInfoModal}
        title={titleModal}
        body={bodyModal}
      />

    </>
  );
}

export default CodigoForm;
