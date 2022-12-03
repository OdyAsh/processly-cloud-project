import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const Layout = (props) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{props.children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;