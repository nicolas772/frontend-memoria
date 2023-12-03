import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";

const BoardTester = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    UserService.getTesterBoard().then(
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
        <h3>{content}</h3>
      </header>
    </div>
    </>
  );
};

export default BoardTester;