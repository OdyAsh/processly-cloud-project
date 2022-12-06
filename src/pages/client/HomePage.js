import React from "react";
import NavItem from "../../UI/navbar/NavItem";
import Gallery from "../../components/media/Gallery";

const HomePage = () => {
  return (
    <div className="home">
      <h1>
        You <span style={{ color: "#0096FF" }}>Ask</span>, We{" "}
        <span style={{ color: "green" }}>Provide</span>
      </h1>
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
        <Gallery
          imgUrls={[
            "https://media.istockphoto.com/photos/concept-picture-id1154231467",
            "https://images.unsplash.com/photo-1656268164012-119304af0c69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80",
            "https://images.unsplash.com/photo-1655745653127-4d6837baf958?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          ]}
        />
      </div>
    </div>
  );
};

export default HomePage;
