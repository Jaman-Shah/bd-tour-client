import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TourTypesCard = ({ title, type, image, icon: Icon }) => {
  return (
    <Link
      to={`/packages/${type}`}
      className="h-full w-full rounded-2xl overflow-hidden"
    >
      <motion.div
        style={{ backgroundImage: `url(${image})` }}
        className="h-full bg-cover bg-center flex items-center justify-center text-[#575FCF] cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex flex-col items-center">
          {Icon && <Icon className="text-4xl md:text-[80px]" />}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-bold text-sm md:text-3xl uppercase border-t mt-4"
          >
            {title}
          </motion.p>
        </div>
      </motion.div>
    </Link>
  );
};

export default TourTypesCard;
