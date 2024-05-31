import React from "react";
import SectionHeader from "../../../components/shared/SectionHeader";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Packages from "./Packages";
import OverViewVideo from "./OverViewVideo";

const TourismAndTravelGuide = () => {
  return (
    <div>
      <SectionHeader title="Tourism and Travel Guide" />
      <div className="text-center">
        <Tabs>
          <TabList>
            <Tab>Our Packages</Tab>
            <Tab>Overview</Tab>
            <Tab>Meet Our Tour Guides</Tab>
          </TabList>
          <TabPanel>
            <Packages />
          </TabPanel>
          <TabPanel>
            <OverViewVideo />
          </TabPanel>
          <TabPanel>
            <h2>Meet Our Tour Guides</h2>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default TourismAndTravelGuide;
