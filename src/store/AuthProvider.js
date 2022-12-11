import AuthContext from "./authContext";

import { useState } from "react";

const AuthProvider = (props) => {
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");

  const authContext = {
    name: name,
    address: address,
    email: email,
    id: id,
    role: role,
    token: token,
    login: (id, name, address, email, role, token) => {
      setID(id);
      setName(name);
      setAddress(address);
      setEmail(email);
      setRole(role);
      setToken(token);
    },
    logout: () => {
      setID("");
      setName("");
      setAddress("");
      setEmail("");
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
