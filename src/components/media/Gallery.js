import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// source: https://blog.openreplay.com/build-an-elegant-gallery-with-react-responsive-carousel

const Gallery = (props) => {
  return (
    <Carousel
      className="gallery"
      autoPlay
      interval="4500"
      transitionTime="1800"
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      dynamicHeight // if you want height to change based on image
    >
      <div>
        <img
          src="https://media.istockphoto.com/photos/concept-picture-id1154231467"
          alt=""
        />
      </div>
      <div>
        <img
          src="https://images.unsplash.com/photo-1656268164012-119304af0c69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80"
          alt=""
        />
      </div>
      <div>
        <img
          src="https://images.unsplash.com/photo-1655745653127-4d6837baf958?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
      </div>
    </Carousel>
  );
};

export default Gallery;
