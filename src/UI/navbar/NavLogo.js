import navLogo from "../../assets/orange-box-by-good-ware.png";

import NavItem from "./NavItem";

const NavLogo = (props) => {
  return (
    <ul>
      <NavItem to={props.to} className="no-line">
        <img src={navLogo} alt="website logo" className="nav-logo" />
      </NavItem>
    </ul>
  );
};

export default NavLogo;
