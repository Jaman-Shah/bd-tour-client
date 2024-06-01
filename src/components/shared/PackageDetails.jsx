import React from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const PackageDetails = () => {
  const images = [
    {
      src: "https://parjatan.portal.gov.bd/sites/default/files/files/parjatan.portal.gov.bd/page/1c91b624_bc64_4efa_87d8_9529276979f7/St.%20Marting%20Island.jpg",
      alt: "Image 1",
    },
    {
      src: "https://rokontourism.com/wp-content/uploads/2018/09/images-14-555x790.jpg",
      alt: "Image 2",
    },
    {
      src: "https://rokontourism.com/wp-content/uploads/2018/09/images-14-555x790.jpg",
      alt: "Image 2",
    },
    {
      src: "https://rokontourism.com/wp-content/uploads/2018/09/images-14-555x790.jpg",
      alt: "Image 2",
    },
    // Add more images as needed
  ];

  return (
    <div className="App">
      <LightGallery
        onInit={() => console.log("LightGallery initialized")}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        // Apply Tailwind CSS for grid layout (replace with your classes)
        // className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {/* Map over images to create individual LightGallery links */}
        {images.map((image, index) => (
          <a key={index} href={image.src}>
            <img
              src={image.src}
              alt={image.alt}
              className="w-1/2 inline h-60 object-cover object-center border-4 border-white  rounded-lg"
            />
          </a>
        ))}
      </LightGallery>
    </div>
  );
};

export default PackageDetails;
