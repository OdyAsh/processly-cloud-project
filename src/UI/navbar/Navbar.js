import { useContext } from "react";
import AuthContext from "../../store/authContext";
import NavItem from "./NavItem";

import navLogo from "../../assets/orange-box-by-good-ware.png";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  if (authContext.role === "sales-team-member") {
  }
  if (authContext.role === "warehouse-member") {
  }
  return (
    <nav className="nav">
      <ul>
        <NavItem to="/" className="no-line">
          <img src={navLogo} alt="website logo" className="nav-logo" />
        </NavItem>
      </ul>
      <ul className="nav-options">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/orders/make">Make An Order</NavItem>
        <NavItem to="/view-o">View Orders</NavItem>
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
        <NavItem>Welcome, {authContext.username}</NavItem>
        <NavItem className="slash">&nbsp; / &nbsp;</NavItem>
        <NavItem to="/" className="signed-out">
          Sign out
        </NavItem>
      </ul>
    </nav>
  );
};

export default Navbar;
