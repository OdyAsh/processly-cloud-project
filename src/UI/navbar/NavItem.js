import { NavLink } from "react-router-dom";

const NavItem = (props) => {
  return (
    <NavLink to={props.to}>
      <li className="text-white hover:bg-sky-700 py-0 px-0 font-bold text-lg inline">
        {props.children}
      </li>
    </NavLink>
  );
};

export default NavItem;
