import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const ImagesSection = ({ photos }) => {
  return (
    <>
      <div className="App">
        <LightGallery
          onInit={() => console.log("LightGallery initialized")}
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
        >
          {/* mapping over images to create individual LightGallery links */}
          {photos &&
            photos.map((photo) => (
              <a key={photo} href={photo}>
                <img
                  src={photo}
                  alt={photo}
                  className="w-1/2 inline h-64 object-cover object-center border-4 border-white  rounded-lg"
                />
              </a>
            ))}
        </LightGallery>
      </div>
    </>
  );
};

export default ImagesSection;
