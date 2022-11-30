import { useContext } from "react";
import AuthContext from "../../store/authContext";
import NavItem from "./NavItem";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  return (
    <nav className="flex justify-around py-8 mx-auto bg-black">
      <ul>
        <NavItem to="/">icon</NavItem>
      </ul>
      <ul className="flex justify-around w-3/6 bg-w">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/req">Make A Request</NavItem>
        <NavItem to="/req">View Orders</NavItem>
        <NavItem to="/req">About</NavItem>
      </ul>
      <ul className="flex justify-around">
        {!authContext.token && <NavItem to="/signin">Sign In</NavItem>}
        {!authContext.token && <NavItem to="/signin">/</NavItem>}
        {!authContext.token && <NavItem to="/signup">Sign Up</NavItem>}
      </ul>
    </nav>
  );
};

export default Navbar;
