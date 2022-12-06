import { useContext } from "react";
import AuthContext from "./authContext";

const AllowAccessToPage = (role) => {
  const authContext = useContext(AuthContext);
  return authContext.role === role; // to do: remove "true ||"
};

export default AllowAccessToPage;
