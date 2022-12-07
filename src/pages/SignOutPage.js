import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import AuthContext from "../store/authContext";

const SignOutPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    toast.success("Signed out successfully...", {
      // shows toast which is housed by the container ToastContainer in App.js
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
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
