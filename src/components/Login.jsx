import React, { useState } from 'react';
import AuthService from "../services/auth.service"
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { useDemoUser } from '../hooks/useDemoUser';

const Login2 = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {setDemoUser} = useDemoUser()
  const navigate = useNavigate()

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);


    AuthService.login(username, password).then(
      (response) => {
        setDemoUser(response)
        if (response.roles.includes("ROLE_USER")) {
          navigate("/homeUser");
        } else {
          navigate("/homeTester");
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  const handleDemoTesterLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    const demoCredential = 'demo-tester'

    AuthService.login(demoCredential, demoCredential).then(
      (response) => {
        setDemoUser(response)
        if (response.roles.includes("ROLE_USER")) {
          navigate("/homeUser");
        } else {
          navigate("/homeTester");
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className='gradient-background'>
      <div className="box">
        <h2>Feel<span style={{ color: 'hsl(218, 81%, 75%)' }}>UX</span></h2>
        <form action="" onSubmit={handleLogin}>
          <div className="inputBox">
            <input type="text" name="" onChange={onChangeUsername} required />
            <label>Usuario</label>
          </div>
          <div className="inputBox" onChange={onChangePassword}>
            <input type="password" name="" required />
            <label>Contraseña</label>
          </div>
          <div className='button-container'>
            <input type="submit" value="Iniciar Sesión" />
          </div>
        </form>
        <div className='flex justify-center'>
          <p className='mb-3 mt-4'>Para iniciar sesión demo, 
            <button onClick={handleDemoTesterLogin}>
              <a href="">&nbsp;pulsa aquí.</a>
            </button>
          </p>
        </div>
        <div className='button-container'>
          <p className='m-0'>¿No tienes una cuenta? <a href="/register">Regístrate aquí</a></p>
        </div>
        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login2;
