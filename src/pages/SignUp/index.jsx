import { Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../store';

import Form from '../../components/Form';
import { ToastContainer, toast } from 'react-toastify';

const SignUp = () => {
  const { user, signup } = useContext(UserContext);

  const notify = (msg) =>
    toast(msg || 'Email already in use!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleFormSubmit = (formValues) => {
    signup(formValues.email, formValues.password, notify);
  };

  return (
    <>
      {user ? (
        <Redirect to='/profile' />
      ) : (
        <>
          <h2>Regístrate!</h2>
          <Form {...{ message: '¡Regístrate! ✅', handleFormSubmit }} />
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default SignUp;
