import NavItem from "../../UI/navbar/NavItem";
import Gallery from "../../components/media/Gallery";

const AboutPage = (props) => {
  return (
    <div className="home">
      <h1>Two Years in The Making</h1>
      <h3>And Still Going Strong!</h3>
      <div className="h-grid" style={{ marginTop: "1rem" }}>
        <span>
          Since its inception in 2020 by&nbsp;
          <NavItem
            to="/about"
            className="to-about"
            externalLink={"www.linkedin.com/in/ashrafharess/"}
          >
            Ashraf
          </NavItem>
          ,&nbsp;
          <NavItem
            to="/about"
            className="to-about"
            externalLink={"https://www.linkedin.com/in/bavshehata/"}
          >
            Bavly
          </NavItem>
          , and&nbsp;
          <NavItem
            to="/about"
            className="to-about"
            externalLink={"https://www.linkedin.com/in/farah-aymen-2ba8a71b2/"}
          >
            Farah
          </NavItem>
          <br /> The company has made many impacts to various
          <br /> university clubs including, most proudly, BUE's
          <br /> ACM club. Just this year, they've recruited over
          <br /> 200 students while using our made-with-love
          <br /> merch! &#128521;
        </span>
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

export default AboutPage;
