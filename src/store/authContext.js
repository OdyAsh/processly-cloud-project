import { createContext } from "react";

//We  define our context with empty data for better code completion later on
const AuthContext = createContext({
  id: "",
  name: "",
  address: "",
  email: "",
  token: "",
  role: "",
  login: (id, name, address, email, role, token) => {},
  logout: () => {},
});

export default AuthContext;
