import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/authContext";

const NavItem = (props) => {
  const authContext = useContext(AuthContext);
  if (props.className === "slash") {
    return (
      <li key={props.to} className={`nav-button`}>
        {props.children}
      </li>
    );
  }
  if (props.className === "to-about") {
    if ("externalLink" in props) {
      return (
        <a
          href={props.externalLink}
          className="span-hyperlink nav-make-line"
          target="_blank"
          rel="noreferrer"
          key={props.to}
        >
          {props.children}
        </a>
      );
    }
    return (
      <NavLink
        to={props.to}
        key={props.to}
        className="span-hyperlink nav-make-line"
      >
        {props.children}
      </NavLink>
    );
  }
  return (
    <NavLink key={props.to} to={props.to}>
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
