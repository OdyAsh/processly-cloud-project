import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/authContext";

const NavItem = (props) => {
  const authContext = useContext(AuthContext);
  if (props.className === "slash") {
    return <li className={`nav-button`}>{props.children}</li>;
  }
  if (props.className === "to-about") {
    return (
      <NavLink to={props.to} className="span-hyperlink nav-make-line">
        {props.children}
      </NavLink>
    );
  }
  if (props.className === "signed-out") {
    authContext.logout();
  }
  return (
    <NavLink to={props.to}>
      <li
        className={`nav-button${
          props.className === "no-line" || " nav-make-line"
        }`}
      >
        {props.children}
      </li>
    </NavLink>
  );
};

export default NavItem;
