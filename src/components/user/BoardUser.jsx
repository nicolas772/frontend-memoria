import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";
import CodigoForm from "./CodigoForm";
import InfoModal from "./InfoModal";

const BoardUser = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
        setLoading(false)
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);
  
  if (loading) {
    return <div>Cargando...</div>
  }
  return (
    <>
      <div className="container">
        <header className="jumbotron">
          <h5>Invitaciones</h5>
        </header>
      </div>
    </>
  );
};

export default BoardUser;