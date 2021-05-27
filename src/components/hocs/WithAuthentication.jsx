import { useContext } from "react";
import { Redirect } from "react-router";

import Loader from "react-loader-spinner";

import { UserContext } from "../../store";

function WithAuthentication({ children }) {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <Loader
        type="ThreeDots"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={2000}
      />
    );
  }

  return <>{user ? <>{children}</> : <Redirect to="/login" />}</>;
}

export default WithAuthentication;
