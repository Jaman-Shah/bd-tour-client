import React from "react";
import OurGuideCard from "../../../components/OurGuideCard";

const OurGuide = () => {
  const image1 =
    "https://www.compass-group.com/content/compass-group/corporate/en/sustainability/culinary-champions/_jcr_content/par/gridtabs/item8/thumbnail.img.png/1674666556528.png";
  const image2 =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5t-WBttk2HvNv6R8vwQjLY5vdBkRyTboyG3KReOc_mA&s";
  const image3 =
    "https://img.lovepik.com/free-png/20211109/lovepik-chefs-chef-png-image_400643799_wh1200.png";
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
      {[
        {
          name: "Alex",
          rating: "5",
          desc: "He is the chefs  form Italy",
          image: image1,
        },
        {
          name: "Nadia",
          rating: "5",
          desc: "She is the chefs  form Japan",
          image: image2,
        },
        {
          name: "Peter",
          rating: "5",
          desc: "He is the chefs  form China",
          image: image3,
        },
      ].map((item, index) => {
        return <OurGuideCard item={item} key={index} />;
      })}
    </div>
  );
};

export default OurGuide;
