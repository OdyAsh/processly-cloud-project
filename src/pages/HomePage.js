import React from "react";
import NavItem from "../UI/navbar/NavItem";
import Gallery from "../components/media/Gallery";

const HomePage = () => {
  return (
    <div className="home">
      <h1>You Ask, We Provide</h1>
      <div className="h-grid">
        <h2>
          Check Out December's <br />
          <br /> New Merch!
          <span>
            And see how Processly impacted the club&nbsp;
            <NavItem to="/about" className="to-about">
              here
            </NavItem>
          </span>
        </h2>
        <Gallery />
      </div>
    </div>
  );
};

export default HomePage;
