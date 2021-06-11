import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

import { UserContext } from "../../store";

import "./index.scss";

import eyeNotVisible from "../../svg/eyeNotVisible.svg";
import eyeVisible from "../../svg/eyeVisible.svg";

const SignUp = () => {
  const { user, signUp } = useContext(UserContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const [signupError, setSignupError] = useState(false);

  const handleFormSubmit = (formValues) => {
    signUp(formValues.email, formValues.password, formValues.name, (err) => {
      if (err.status === 403) {
        setSignupError(true);
      }
    });
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setSignupError(false);
    }, 1000);

    return () => clearInterval(id);
  }, [signupError]);

  return (
    <>
      {user ? (
        <Redirect to="/start" />
      ) : (
        <div className="signup">
          <div className="signup__title">
            <p>Crea una cuenta y comienza a reservar puntos de carga</p>
          </div>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="signup__form"
          >
            <div className="signup__form__name">
              <input
                className={
                  errors.name && errors.name.type === "required"
                    ? "signup__form__redLine"
                    : "signup__form__input"
                }
                type="text"
                name="name"
                id="name"
                placeholder="Nombre de usuario"
                {...register("name", { required: true })}
              />
              {errors.name && errors.name.type === "required" && (
                <span className="signup__form__name__error">
                  Nombre requerido
                </span>
              )}
            </div>
            <div className="signup__form__email">
              <input
                className={
                  signupError ||
                  (errors.email &&
                    (errors.email.type === "required" ||
                      errors.email.type === "pattern"))
                    ? "signup__form__redLine"
                    : "signup__form__input"
                }
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  },
                })}
              />
              {errors.email && errors.email.type === "required" && (
                <span className="signup__form__email__error">
                  Email requerido
                </span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span className="signup__form__email__error">
                  Eso no es un email
                </span>
              )}
              {signupError && (
                <span className="signup__form__email__error">
                  Este email ya está en uso
                </span>
              )}
            </div>
            <div className="signup__form__password">
              <input
                className={
                  errors.password &&
                  (errors.password.type === "minLength" ||
                    errors.password.type === "pattern")
                    ? "signup__form__redLine"
                    : "signup__form__input"
                }
                type={passwordShown ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Contraseña"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: {
                    value: /^(?=.*[0-9])(?=.*[a-z]).{6,}$/i,
                  },
                })}
              />
              {errors.password && errors.password.type === "pattern" && (
                <span className="signup__form__password__error">
                  Al menos 1 letra y 1 número
                </span>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <span className="signup__form__password__error">
                  Mínimo 6 caracteres
                </span>
              )}
              <img
                className="signup__form__password__eye"
                alt=""
                src={passwordShown ? eyeNotVisible : eyeVisible}
                onClick={togglePasswordVisiblity}
              />
            </div>
            <span className="signup__form__forgot-password">
              ¿Olvidaste tu contraseña?
            </span>
            <label htmlFor="invite-code" className="signup__form__label">
              ¿Tienes un código promocional?
            </label>
            <input
              className="signup__form__input"
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
