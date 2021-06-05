import { useForm } from "react-hook-form";

const Form = ({ message = "Subimt form", handleFormSubmit }) => {
  const { handleSubmit, register } = useForm();

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        {...register("email", { required: true })}
      />
      <br />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        {...register("password", { required: true })}
      />
      <br />
      <button type="submit">{message}</button>
    </form>
  );
};

export default Form;
