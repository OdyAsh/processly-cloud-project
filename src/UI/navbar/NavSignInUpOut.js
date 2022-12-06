import { useContext } from "react";
import AuthContext from "../../store/authContext";
import NavItem from "./NavItem";

const NavSignInUpOut = (props) => {
  const authContext = useContext(AuthContext);
  let urlPrefix = props.portal;
  return (
    <>
      <ul
        className={
          (authContext.token && "nav-hide-element") || "nav-not-signed"
        }
      >
        <NavItem to={`${urlPrefix}signin`}>Sign In</NavItem>
        {props.portal === "/" && (
          <>
            <NavItem className="slash">&nbsp; / &nbsp;</NavItem>
            <NavItem to="/signup">Sign Up</NavItem>
          </>
        )}
      </ul>
      <ul className={(authContext.token && "nav-signed") || "nav-hide-element"}>
        <NavItem>Welcome, {authContext.name}</NavItem>
        <NavItem className="slash">&nbsp; / &nbsp;</NavItem>
        <NavItem to={`/signout`}>Sign out</NavItem>
      </ul>
    </>
  );
};

export default NavSignInUpOut;
