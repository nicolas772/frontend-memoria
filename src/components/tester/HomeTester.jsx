import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../charts/css/styleDashboardPrincipal.css"
import { Grid } from "@tremor/react";
import CardHome from "./CardHome";
import { Form, Button, Nav } from 'react-bootstrap';
import UserService from "../../services/user.service";

const HomeTesterContent = [
  {
    title: "Creación de Estudios",
    img: 'https://img.freepik.com/vector-gratis/ilustracion-concepto-abstracto-segmentacion-audiencia_335657-1854.jpg?w=996&t=st=1701448595~exp=1701449195~hmac=88719ab2dd00fe9b6ff576935e702054e3bd1e44521e791ffcb35c7b61edaff9',
    text: "Podrás crear estudios e Iteraciones, y así evaluar la usabilidad de tus distintas aplicaciones.",
    color: "cyan",
  },
  {
    title: "Visualización de Dashboards",
    img: "https://img.freepik.com/vector-gratis/ilustracion-concepto-abstracto-tablero-inteligencia-empresarial_335657-4882.jpg?w=996&t=st=1701448518~exp=1701449118~hmac=a67f28b948f892efcb5825ba5100ed9f741ba4f28330e40c11f877196d6c921e",
    text: "Serás capaz de ver todos los gráficos e indicadores necesarios para evaluar los resultados de tu Testing de Usabilidad.",
    color: "cyan",
  },
  {
    title: "Sentimiento de Usuarios",
    img: "https://img.freepik.com/vector-gratis/ilustracion-concepto-bucle-retroalimentacion_114360-17629.jpg?w=996&t=st=1701448708~exp=1701449308~hmac=97256fde7050b2ab824feaedaae8c3f9c56d1ae2e3fc33248e3e230ff08e5f47",
    text: "A través de técnicas de Minería de opinión podrás identificar y cuantificar el sentimiento de tus usuarios.",
    color: "cyan",
  },
]

const HomeTester = () => {

  let navigate = useNavigate()

  const handleButton = () => {
    navigate("/create-study")
  };
  /*const [opinion, setOpinion] = useState("");
  const handleChangeOpinion = (event) => {
    setOpinion(event.target.value);
  };
  const handleSubmit = () => {
    UserService.postOpenAnswerPrueba(opinion).then(
      (response) => {
        // Redireccionar a inicio después de 3 segundos
        console.log(response.data)
      },
      (error) => {
        console.log(error)
      }
    );
  }*/

  return (

    <div className="gradient-background-pages">
      <div className="welcome-div-tester">
        <h1>👋 Bienvenido a FEEL UX</h1>
        <div className="subtitle">
          <p> <strong>Feel UX</strong> es una plataforma enfocada en la etapa de <strong>testing en el desarrollo de software, </strong>
            permitiendo a los desarrolladores crear tareas, evaluar la <strong>usabilidad del sistema</strong> y realizar un
            análisis a las opiniones de los usuarios a través de IA.
          </p>
        </div>
        <div style={{ margin: "3%" }}>
          <Grid numItemsSm={1} numItemsLg={3} className="gap-6">
            {HomeTesterContent.map(homeCard => (
              <CardHome
                key={homeCard.title}  // Agrega una clave única si estas iterando sobre elementos y no has proporcionado una clave en CardHome
                color={homeCard.color}
                title={homeCard.title}
                text={homeCard.text}
                imagen={homeCard.img}
              />
            ))}
          </Grid>
        </div>
        <div className="button-container">
          <Button variant="primary" onClick={handleButton} className="btn button-primary">
            Crea tu Primer Estudio
          </Button>
        </div>
        {/*<>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              value={opinion}
              onChange={handleChangeOpinion}
              className="disable-resize" // Agrega la clase aquí
              maxLength={240}
            />
          </Form.Group>
          <div className="buttons-div-sentiment">
            <button type="button" onClick={handleSubmit}>
              Enviar
            </button>
          </div>
            </>*/}
      </div>
    </div>
  )
}

export default HomeTester