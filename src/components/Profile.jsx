import React from "react";
import ProfileForm from "./ProfileForm";

const Profile = () => {
  return (
    <>
    <div className="gradient-background-pages">
      <div className="profile-div">
        <h1>👤 Perfil</h1>
        <p> Aquí puedes <strong>ver</strong> y <strong>editar</strong> tus datos, además de modificar tu contraseña.
        </p>
        <ProfileForm></ProfileForm>
      </div>
    </div>
    </>
  )
}

export default Profile