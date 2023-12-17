import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";
import { isEmail } from "validator";
import Loader from './Loader';

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      "Ingrese un correo electrónico válido."
    );
  }
  return ("")
};

const validLength = (value, isUsername) => {
  if (value.length < 6 || value.length > 20) {
    if (isUsername) {
      return ("El nombre de usuario debe tener entre 6 y 20 caracteres.");
    } else {
      return ("La contraseña debe tener entre 6 y 20 caracteres.");
    }
  }
};

const validateDate = (year, month, day) => {
  // Verificar la cantidad de días en el mes
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return ("Dia inválido para el mes")
  }
  const currentDate = new Date();
  const selectedDate = new Date(year, month - 1, day); // Month is 0-based

  if (selectedDate >= currentDate) {
    return ("La fecha de nacimiento debe ser anterior a la fecha actual.");
  }
  return ("")
};


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTester, setIsTester] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [level, setLevel] = useState("")
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [dateError, setDateError] = useState("")
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onChangeDay = (e) => {
    const Day = e.target.value
    setDay(Day)
    if (Day && month && year) {
      const error = validateDate(year, month, Day)
      setDateError(error)
    }
  }

  const onChangeMonth = (e) => {
    const Month = e.target.value
    setMonth(Month)
    if (day && Month && year) {
      const error = validateDate(year, Month, day)
      setDateError(error)
    }
  }

  const onChangeYear = (e) => {
    const Year = e.target.value
    setYear(Year)
    if (day && month && Year) {
      const error = validateDate(Year, month, day)
      setDateError(error)
    }
  }

  const onChangeLevel = (e) => {
    const Level = e.target.value
    setLevel(Level)
  }

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
    if (username) {
      const error = validLength(username, true);
      if (!error) {
        setUsernameError("");
      }
    } else {
      setUsernameError("");
    }
  };

  const onBlurUsername = () => {
    if (username) {
      const error = validLength(username, true);
      setUsernameError(error);
    } else {
      setUsernameError("");
    }
  }

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (email) {
      const error = validEmail(email);
      if (!error) {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
  };

  const onBlurEmail = () => {
    if (email) {
      const error = validEmail(email);
      setEmailError(error);
    } else {
      setEmailError("");
    }
  }

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (password) {
      const error = validLength(password, false);
      if (!error) {
        setPasswordError("");
      }
    } else {
      setPasswordError("");
    }
  };
  const onBlurPassword = () => {
    if (password) {
      const error = validLength(password, false);
      setPasswordError(error);
    } else {
      setPasswordError("");
    }
  }

  const onChangeIsTester = (e) => {
    setIsTester(e.target.checked);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    setLoading(true)
    const birthday = new Date(year, month - 1, day)
    if (!usernameError && !passwordError && !emailError && !dateError) {
      AuthService.register(username, email, password, isTester, level, birthday).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          setLoading(false)
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
          setLoading(false)
        }
      );
    }
  };

  return (
    <div className='gradient-background-register'>
      <div className="box-register">
        <h2>Feel<span style={{ color: 'hsl(218, 81%, 75%)' }}>UX</span></h2>
        {loading ? (<Loader />) :
          (!successful && (
            <>
              <form action="" onSubmit={handleRegister}>
                <div className="inputBox">
                  <input type="text" onChange={onChangeUsername} onBlur={onBlurUsername} required />
                  <label>Usuario</label>
                </div>
                {usernameError && (
                  <div className="alert alert-danger" role="alert">
                    {usernameError}
                  </div>
                )}
                <div className="inputBox">
                  <input type="text" onChange={onChangeEmail} onBlur={onBlurEmail} required />
                  <label>Email</label>
                </div>
                {emailError && (
                  <div className="alert alert-danger" role="alert">
                    {emailError}
                  </div>
                )}





                <div className="inputBox">
                  <select className="custom-select-day" onChange={onChangeDay} required>
                    <option value="">Día</option>
                    {Array.from({ length: 31 }, (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  <select className="custom-select-month" onChange={onChangeMonth} required>
                    <option value="">Mes</option>
                    {[
                      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                    ].map((month, index) => (
                      <option key={index} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select className="custom-select-year" onChange={onChangeYear} required>
                    <option value="">Año</option>
                    {Array.from({ length: 124 }, (_, index) => (
                      <option key={currentYear - index} value={currentYear - index}>
                        {currentYear - index}
                      </option>
                    ))}
                  </select>
                  <label>Fecha de Nacimiento</label>
                </div>
                {dateError && (
                  <div className="alert alert-danger" role="alert">
                    {dateError}
                  </div>
                )}

                <div className="inputBox">
                  <select onChange={onChangeLevel} required >
                    <option value="">Selecciona tu nivel</option>
                    <option value="Básico">Básico</option>
                    <option value="Medio">Medio</option>
                    <option value="Avanzado">Avanzado</option>
                  </select>
                  <label>Conocimiento tecnológico</label>
                </div>


                <div className="inputBox">
                  <input type="password" onChange={onChangePassword} onBlur={onBlurPassword} required />
                  <label>Contraseña</label>
                </div>
                {passwordError && (
                  <div className="alert alert-danger" role="alert">
                    {passwordError}
                  </div>
                )}
                <div className="inputBoxCheckbox">
                  <input type="checkbox" onChange={onChangeIsTester} />
                  <label>Quiero registrarme como Tester</label>
                </div>
                <div className="button-container">
                  <input type="submit" value="Registrarse" />
                </div>
              </form>
              <div className='button-container'>
                <p>¿Ya tienes una cuenta? <a href="/login"> Iniciar Sesión</a></p>
              </div>
            </>
          )
          )}
        {message && (
          <>
            <div className={successful ? "inputBoxConfirmation" : "alert alert-danger"}>
              {message}&nbsp;
              {successful && (
                <a href="/login">Iniciar Sesión</a>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
