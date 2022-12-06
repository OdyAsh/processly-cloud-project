import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";

const WhHomePage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (false && authContext.role !== "wh") {
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

export default WhHomePage;
