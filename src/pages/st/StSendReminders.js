import { useNavigate } from "react-router-dom";
import AllowAccessToPage from "../../store/AllowAccessToPage";

const StSendReminders = () => {
  const navigate = useNavigate();
  if (AllowAccessToPage("st")) {
    navigate("/st/signin");
  }

  return <></>;
};

export default StSendReminders;
