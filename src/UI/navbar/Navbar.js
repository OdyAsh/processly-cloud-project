import { useContext } from "react";
import AuthContext from "../../store/authContext";
import NavItem from "./NavItem";
import { useLocation } from "react-router-dom";

import navLogo from "../../assets/orange-box-by-good-ware.png";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const location = useLocation();

  if (
    // user is trying to login as sales-team or warehouse member, so don't show them possible actions in NavBar unless they successfully sign in
    false && // to do: remove "false &&"
    authContext.role === "" &&
    (location.pathname.includes("st") || location.pathname.includes("wh"))
  ) {
    return <div style={{ marginTop: "15vh" }}></div>;
  }
  if (authContext.role === "sales-team-member") {
  }
  if (authContext.role === "warehouse-member") {
  }
  return (
    // if all above isn't true, then the person accessing the website is either a client or an anonymous user. Either way, display client's NavBar
    <nav className="nav">
      <ul>
        <NavItem to="/" className="no-line">
          <img src={navLogo} alt="website logo" className="nav-logo" />
        </NavItem>
      </ul>
      <ul className="nav-options">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/orders/make">Make An Order</NavItem>
        <NavItem to="/orders/view">View Orders</NavItem>
        <NavItem to="/about">About</NavItem>
      </ul>
      <ul
        className={
          (authContext.token && "nav-hide-element") || "nav-not-signed"
        }
      >
        <NavItem to="/signin">Sign In</NavItem>
        <NavItem className="slash">&nbsp; / &nbsp;</NavItem>
        <NavItem to="/signup">Sign Up</NavItem>
      </ul>
      <ul className={(authContext.token && "nav-signed") || "nav-hide-element"}>
        <NavItem>Welcome, {authContext.name}</NavItem>
        <NavItem className="slash">&nbsp; / &nbsp;</NavItem>
        <NavItem to="/" className="signed-out">
          Sign out
        </NavItem>
      </ul>
    </nav>
  );
};

export default Navbar;
