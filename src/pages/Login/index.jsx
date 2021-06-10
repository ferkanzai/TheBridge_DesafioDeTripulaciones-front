import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

import { UserContext } from "../../store";

import "./index.scss";

import eyeNotVisible from "../../svg/eyeNotVisible.svg";
import eyeVisible from "../../svg/eyeVisible.svg";

const Login = () => {
  const { user, login } = useContext(UserContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);

  const handleFormSubmit = (formValues) => {
    login(formValues.email, formValues.password, (err) => {
      if (err.status === 403) alert(err.data.info.message);
    });
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <>
      {user ? (
        <Redirect to="/start" />
      ) : (
        <div className="login">
          <div className="login__title">
            <p>Inicia sesión</p>
          </div>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="login__form"
          >
            <div className="login__form__email">
              <input
                className={
                  errors.email &&
                  (errors.email.type === "required" ||
                    errors.email.type === "pattern")
                    ? "login__form__redLine"
                    : "login__form__input"
                }
                type="email"
                id="email"
                name="email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  },
                })}
                placeholder="Email"
              />
              {errors.email && errors.email.type === "required" && (
                <span className="login__form__email__error">
                  Email requerido
                </span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span className="login__form__email__error">
                  Eso no es un email
                </span>
              )}
            </div>
            <div className="login__form__password">
              <input
                className={
                  errors.password && errors.password.type === "minLength"
                    ? "login__form__redLine"
                    : "login__form__input"
                }
                type={passwordShown ? "text" : "password"}
                id="password"
                name="password"
                {...register("password", { required: true, minLength: 6 })}
                placeholder="Contraseña"
              />
              {errors.password && errors.password.type === "minLength" && (
                <span className="login__form__password__error">
                  Mímimo 6 caracteres
                </span>
              )}
              <img
                className="login__form__password__eye"
                alt=""
                src={passwordShown ? eyeNotVisible : eyeVisible}
                onClick={togglePasswordVisiblity}
              />
            </div>
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
