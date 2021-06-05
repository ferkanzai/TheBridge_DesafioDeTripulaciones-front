import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

import { UserContext } from "../../store";

import "./styles.scss";

// import eyeNotVisible from "../../svg/eyeNotVisible.svg";

const SignUp = () => {
  const { user, signUp } = useContext(UserContext);
  const { handleSubmit, register } = useForm();

  const handleFormSubmit = (formValues) => {
    console.log("hey");
    signUp(formValues.email, formValues.password, formValues.name);
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
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
              {...register("password", { required: true })}
            />
            <svg
              className="signup__form__eye"
              width="24"
              height="22"
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.8209 10.181C22.8547 8.08568 21.4397 6.22849 19.6759 4.74097L22.7079 1.70897L21.2929 0.292969L17.9999 3.58297C16.1772 2.52869 14.1054 1.98207 11.9999 1.99997C4.49987 1.99997 1.05687 8.26097 0.178871 10.181C0.0610095 10.4383 0 10.718 0 11.001C0 11.284 0.0610095 11.5637 0.178871 11.821C1.14501 13.9163 2.56009 15.7734 4.32387 17.261L1.29287 20.293L2.70687 21.707L5.99987 18.417C7.82251 19.4713 9.89436 20.0179 11.9999 20C19.4999 20 22.9429 13.739 23.8209 11.819C23.9385 11.562 23.9994 11.2826 23.9994 11C23.9994 10.7173 23.9385 10.438 23.8209 10.181ZM1.99987 11.011C2.74987 9.36597 5.69287 3.99997 11.9999 3.99997C13.5695 3.99079 15.1185 4.35697 16.5179 5.06797L14.7529 6.83297C13.7928 6.19557 12.6418 5.90996 11.4951 6.02461C10.3484 6.13926 9.27674 6.64711 8.46187 7.46197C7.64701 8.27683 7.13917 9.34853 7.02452 10.4952C6.90987 11.6419 7.19547 12.7929 7.83287 13.753L5.75387 15.832C4.15424 14.5294 2.87074 12.881 1.99987 11.011ZM14.9999 11C14.9999 11.7956 14.6838 12.5587 14.1212 13.1213C13.5586 13.6839 12.7955 14 11.9999 14C11.5544 13.9982 11.1151 13.8957 10.7149 13.7L14.6999 9.71497C14.8956 10.1152 14.9981 10.5545 14.9999 11ZM8.99987 11C8.99987 10.2043 9.31594 9.44126 9.87855 8.87865C10.4412 8.31604 11.2042 7.99997 11.9999 7.99997C12.4454 8.00169 12.8847 8.10426 13.2849 8.29997L9.29987 12.285C9.10416 11.8848 9.0016 11.4455 8.99987 11ZM11.9999 18C10.4303 18.0091 8.88123 17.643 7.48187 16.932L9.24687 15.167C10.2069 15.8044 11.358 16.09 12.5046 15.9753C13.6513 15.8607 14.723 15.3528 15.5379 14.538C16.3527 13.7231 16.8606 12.6514 16.9752 11.5047C17.0899 10.3581 16.8043 9.20704 16.1669 8.24697L18.2449 6.16897C19.8476 7.47278 21.1319 9.12502 21.9999 11C21.2359 12.657 18.2919 18 11.9999 18Z"
                fill="#68719F"
              />
            </svg>
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
