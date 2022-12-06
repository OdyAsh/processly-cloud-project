import { useNavigate } from "react-router-dom";
import AllowAccessToPage from "../../store/AllowAccessToPage";

const StViewAllOrders = () => {
  const navigate = useNavigate();
  if (AllowAccessToPage("st")) {
    navigate("signin");
  }

  return <></>;
};

export default StViewAllOrders;
