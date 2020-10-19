import React from "react";

import { AuthConsumer } from "../authContext";

const Login = () => (
  <AuthConsumer>
    {({ initiateLogin }) => (
    
      <button type="button" className="btn btn-custom navbar-btn btn-rounded waves-effect waves-light" aria-controls="simple-menu" onClick={initiateLogin}>Se connecter</button>

    )}
  </AuthConsumer>
);

export default Login;