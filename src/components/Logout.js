import React from "react";

import { AuthConsumer } from "../authContext";

const Logout = () => (
  <AuthConsumer>
    {({ logout }) => (
            <button type="button" className="btn btn-custom navbar-btn btn-rounded waves-effect waves-light" onClick={logout}>Se déconnecter</button>

      
    )}
  </AuthConsumer>
);

export default Logout;  