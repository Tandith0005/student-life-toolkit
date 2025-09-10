import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import hero1 from '../../assets/hero1.jpg';

const Hero = () => {
  const headingText = "Simplify Your Student Life".split("");

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.7,
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="bg-gradient-to-br from-rose-50 to-rose-100">
      <section className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden md:grid md:grid-cols-2 mx-auto" style={{maxWidth: '1400px'}}> 
            {/* Left Content */}
            <div className="p-10 sm:p-12 lg:p-16 space-y-6 md:space-y-8">
              <div className="text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight inline-flex flex-wrap">
                  <AnimatePresence>
                    {headingText.map((char, index) => (
                      <motion.span
                        key={index}
                        custom={index}
                        variants={headingVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="inline-block"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </h1>

                <motion.p
                  className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto md:mx-0"
                  variants={paragraphVariants}
                  initial="hidden"
                  animate="visible"
                >
                  Track classes, manage budgets, prepare for exams, and plan studies—all in one place.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-8"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <Link
                  to="/dashboard"
                  className="inline-block bg-gradient-to-r from-rose-500 to-rose-600 text-white text-lg px-8 py-4 rounded-xl font-semibold hover:from-rose-600 hover:to-rose-700 transition duration-300 text-center shadow-md hover:shadow-lg"
                >
                  Get Started
                </Link>
                <Link
                  to="/features"
                  className="inline-block border border-rose-200 text-rose-600 text-lg px-8 py-4 rounded-xl font-semibold hover:bg-rose-50 transition duration-300 text-center"
                >
                  Learn More
                </Link>
              </motion.div>
              
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6 text-gray-500">
                <div className="flex items-center">
                  <FaCheckCircle className="text-red-500 mr-2" size={20}/>
                  <span>Free to use</span>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-red-500 mr-2" size={20}/>
                  <span>All-in-one platform</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center p-10 md:p-0">
              <motion.div 
                className="w-full h-full flex items-center justify-center p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              >
                <img
                  src={hero1}
                  alt="Student Dashboard"
                  className="w-full max-w-md rounded-xl shadow-2xl object-cover transform -rotate-2 transition-transform duration-300 hover:rotate-0"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;