import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";

const LoginButton = (props: any) => {
  const { loginWithRedirect } = useAuth0();

  return <Button className={props.className} onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;