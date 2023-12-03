import { Outlet, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import TaskUser from "./user/TaskUser";
import FormCSUQ from "./user/FormCSUQ";
import FormSentimentAnalisis from "./user/FormSentimentAnalisis";

import { Routes, Route } from "react-router-dom";
import Footer from "./Footer";

const ProtectedRoutesWithoutSidebar = () => {
  const user = AuthService.getCurrentUser();

  if (user) {
    return (
      <div>
        <main>
          <Routes>
            <Route path="/doiteration/:iditeration/:idtask" element={<TaskUser />} />
            <Route path="/doCSUQ/:iditeration" element={<FormCSUQ />} />
            <Route path="/doQuestion/:iditeration" element={<FormSentimentAnalisis />} />
          </Routes>
        </main>
      </div>
    );
  } else {
    // Si el usuario no está autenticado, redirecciona a la página de inicio de sesión
    return <Navigate to="/login" />;
  }

};

export default ProtectedRoutesWithoutSidebar;