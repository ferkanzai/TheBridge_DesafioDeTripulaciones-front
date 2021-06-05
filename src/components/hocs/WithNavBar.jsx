import NavBar from "../NavBar";

const WithNavBar = ({ children }) => {
  return (
    <>
      {children}
      <NavBar />
    </>
  );
};

export default WithNavBar;
