import { motion } from "framer-motion";

const AnimatedTitles = ({title, subtitle}) => {
    return (
        <div>
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-2  flex justify-center">
            {title}
          </h2>
        </motion.div>
       
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="italic text-[#f43f5e] font-semibold flex justify-center text-center">
            {subtitle}
          </p>
        </motion.div>
      </div>
    );
};

export default AnimatedTitles;