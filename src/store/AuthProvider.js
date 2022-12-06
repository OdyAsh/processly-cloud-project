import AuthContext from "./authContext";

import { useState } from "react";

const AuthProvider = (props) => {
  const [email, setEmail] = useState("");
  const [id, setID] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");

  const authContext = {
    email: email,
    id: id,
    role: role,
    token: token,
    login: (id, email, role, token) => {
      setID(id);
      setEmail(email);
      setRole(role);
      setToken(token);
    },
    logout: () => {
      setEmail("");
      setID("");
      setRole("");
      setToken("");
    },
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
