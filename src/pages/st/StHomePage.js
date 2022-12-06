import { useContext, useEffect } from "react";
import AuthContext from "../../store/authContext";
import { useNavigate } from "react-router-dom";

const StHomePage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (false && authContext.role !== "st") {
      // to do: remove "false &&"
      navigate("signin");
    }
  }, [navigate, authContext.role]);

  return (
    <div className="row-center-content">
      <h1 style={{ fontSize: "3vw", marginTop: "20vh" }}>
        Please choose an action from the navigation bar
      </h1>
    </div>
  );
};

export default StHomePage;
