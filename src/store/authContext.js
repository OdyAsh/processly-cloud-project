import { createContext } from "react";

//We  define our context with empty data for better code completion later on
const AuthContext = createContext({
  email: "",
  id: "",
  token: "",
  role: "",
  login: (id, email, role, token) => {},
  logout: () => {},
});

export default AuthContext;
