import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProtectedRoutesWithoutSidebar from "./components/ProtectedRoutesWithoutSidebar"
import Login from "./components/Login";
import Register from "./components/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styleLogin.css"
import "./css/styleTasks.css"
import "./css/styleCSUQ.css"
import "./App.css";
import "./css/styleLikert.scss"
import "./css/styleSentimentAnalisis.css"
import "./css/styleRegister.css"
import "./css/styleProfile.css"
import "./css/styleModalForm.css"
import "./css/styleCreateForm.css"

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<ProtectedRoutes />} />
      <Route path="/user/*" element={<ProtectedRoutesWithoutSidebar />} />
    </Routes>
  );
}

export default App;