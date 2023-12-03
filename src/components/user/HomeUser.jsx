import CodigoForm from "./CodigoForm";

const HomeUser = () => {
  return (
    <>
    <div className="gradient-background-pages">
      <div className="welcome-div">
        <h1>👋 Bienvenido!</h1>
        <p> <strong>Feel UX</strong> es una plataforma enfocada en la etapa de <strong>testing en el desarrollo de software, </strong> 
          permitiendo a los desarrolladores crear tareas, evaluar la <strong>usabilidad del sistema</strong> y realizar un
          análisis a las opiniones de los usuarios a través de IA.
        </p>
        <CodigoForm></CodigoForm>
      </div>
    </div>
    </>
  )
}

export default HomeUser