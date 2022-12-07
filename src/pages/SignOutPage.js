import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AuthContext from "../store/authContext";

const SignOutPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    authContext.logout();
    if (location.pathname.includes("st/")) {
      navigate("/st/signin");
    } else if (location.pathname.includes("wh/")) {
      navigate("/wh/signin");
    } else {
      navigate("/");
    }
  });
};

export default SignOutPage;
