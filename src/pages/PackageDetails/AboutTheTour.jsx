import React from "react";
import SectionHeader from "../../components/shared/SectionHeader";

const AboutTheTour = ({ description }) => {
  return (
    <div>
      <SectionHeader title="About The Tour" />
      <p className="text-center font-thin text-2xl">{description}</p>
    </div>
  );
};

export default AboutTheTour;
