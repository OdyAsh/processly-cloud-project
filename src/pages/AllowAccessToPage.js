import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/authContext";

const AllowAccessToPage = (props) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (false && authContext.role !== props.role) {
      // to do: remove "false &&"
      navigate("signin");
    }
  }, [navigate, authContext.role, props.role]);
};

export default AllowAccessToPage;
