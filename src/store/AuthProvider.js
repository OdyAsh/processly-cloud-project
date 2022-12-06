import AuthContext from "./authContext";

import { useState } from "react";

const AuthProvider = (props) => {
  const [username, setUsername] = useState("");
  const [id, setID] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");

  const authContext = {
    username: username,
    id: id,
    role: role,
    token: token,
    login: (id, username, role, token) => {
      setID(id);
      setUsername(username);
      setRole(role);
      setToken(token);
    },
    logout: () => {
      setUsername("");
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
