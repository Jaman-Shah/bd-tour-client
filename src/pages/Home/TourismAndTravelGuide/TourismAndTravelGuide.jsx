import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "../../../components/shared/SectionHeader";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Packages from "./Packages";
import OverViewVideo from "./OverViewVideo";
import OurGuide from "./OurGuide";

const TourismAndTravelGuide = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SectionHeader title="Tourism and Travel Guide" />
      <div className="text-center">
        <Tabs>
          <div className="mb-8">
            <TabList>
              <Tab>Our Packages</Tab>
              <Tab>Overview</Tab>
              <Tab>Meet Our Tour Guides</Tab>
            </TabList>
          </div>
          <TabPanel>
            <Packages />
          </TabPanel>
          <TabPanel>
            <OverViewVideo />
          </TabPanel>
          <TabPanel>
            <OurGuide />
          </TabPanel>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default TourismAndTravelGuide;
