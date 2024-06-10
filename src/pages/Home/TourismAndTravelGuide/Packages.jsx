import React from "react";
import { motion } from "framer-motion";
import usePackages from "../../../hooks/usePackages";
import PackagesCard from "../../../components/PackagesCard";
import { Link } from "react-router-dom";

const Packages = () => {
  const { packages, isLoading } = usePackages();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className="grid gird-cols-1 md:grid-cols-3 gap-4">
        {packages &&
          packages.slice(0, 3).map((item) => {
            return <PackagesCard key={item._id} item={item} />;
          })}
      </div>
      <div className="flex justify-center">
        <Link to="/all-packages" className="p-2 border border-black">
          See All
        </Link>
      </div>
    </motion.div>
  );
};

export default Packages;
