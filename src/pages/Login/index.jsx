import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

import { UserContext } from "../../store";

import "./styles.scss";

import eyeNotVisible from "../../svg/eyeNotVisible.svg";
import eyeVisible from "../../svg/eyeVisible.svg";

const Login = () => {
  const { user, login } = useContext(UserContext);
  const { handleSubmit, register } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);

  const handleFormSubmit = (formValues) => {
    login(formValues.email, formValues.password);
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <>
      {user ? (
        <Redirect to="/profile" />
      ) : (
        <div className="login">
          <div className="login__title">
            <p>Inicia sesión</p>
          </div>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="login__form"
          >
            <input
              type="email"
              id="email"
              name="email"
              {...register("email", { required: true })}
              placeholder="Email"
            />
            <input
              type={passwordShown ? "text" : "password"}
              id="password"
              name="password"
              {...register("password", { required: true })}
              placeholder="Contraseña"
            />
            <img
              className="login__form__eye"
              alt=""
              src={passwordShown ? eyeNotVisible : eyeVisible}
              onClick={togglePasswordVisiblity}
            />
            <span className="login__form__forgot-password">
              ¿Olvidaste tu contraseña?
            </span>
            <button type="submit" className="login__form__button">
              Iniciar
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
