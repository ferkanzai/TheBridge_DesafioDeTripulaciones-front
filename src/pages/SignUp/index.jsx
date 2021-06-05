import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

import { UserContext } from "../../store";

import "./index.scss";

import eyeNotVisible from "../../svg/eyeNotVisible.svg";
import eyeVisible from "../../svg/eyeVisible.svg";

const SignUp = () => {
  const { user, signUp } = useContext(UserContext);
  const { handleSubmit, register } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);

  const handleFormSubmit = (formValues) => {
    console.log("hey");
    signUp(formValues.email, formValues.password, formValues.name);
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <>
      {user ? (
        <Redirect to="/profile" />
      ) : (
        <div className="signup">
          <div className="signup__title">
            <p>Crea una cuenta y comienza a reservar puntos de carga</p>
          </div>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="signup__form"
          >
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nombre de usuario"
              {...register("name", { required: true })}
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            <input
              type={passwordShown ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Contraseña"
              {...register("password", { required: true })}
            />
            <img
              className="signup__form__eye"
              alt=""
              src={passwordShown ? eyeNotVisible : eyeVisible}
              onClick={togglePasswordVisiblity}
            />
            <span className="signup__form__forgot-password">
              ¿Olvidaste tu contraseña?
            </span>
            <label htmlFor="invite-code" className="signup__form__label">
              ¿Tienes un código promocional?
            </label>
            <input
              type="text"
              id="invite-code"
              name="invite-code"
              placeholder="Introduce aquí"
              {...register("invite-code")}
            />
            <button type="submit" className="signup__form__button">
              Crear
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default SignUp;
