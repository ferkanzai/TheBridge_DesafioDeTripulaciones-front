import { useContext } from "react";
import { Redirect } from "react-router";

import { UserContext } from "../../store";

function WithAuthentication({ children }) {
  const { user } = useContext(UserContext);

  return <>{user ? <>{children}</> : <Redirect to="/" />}</>;
}

export default WithAuthentication;
