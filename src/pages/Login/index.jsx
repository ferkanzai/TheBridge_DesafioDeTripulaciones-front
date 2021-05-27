import { Redirect } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../store";
import { ToastContainer, toast } from "react-toastify";

import Form from "../../components/Form";

const Login = () => {
  const { user, login } = useContext(UserContext);

  const notify = (msg) =>
    toast(msg || "Unable to log in with those credentials", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleFormSubmit = (formValues) => {
    login(formValues.email, formValues.password, notify);
  };

  return (
    <>
      {user ? (
        <Redirect to="/profile" />
      ) : (
        <>
          <h2>Iniciar sesión!</h2>
          <Form message="¡Enviar! 🚀" handleFormSubmit={handleFormSubmit} />
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default Login;
