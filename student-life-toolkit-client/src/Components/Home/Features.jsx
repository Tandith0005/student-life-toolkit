import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <div>
      <section className="py-16 px-4 md:px-8 min-h-[500px] ">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-15"><span className="text-rose-500">-----</span> Features <span className="text-rose-500">-----</span></h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-95"
          >
            <h3 className="text-xl font-semibold mb-2">Class Schedule Tracker</h3>
            <p className="text-gray-600 mb-4">
              Organize your classes with times, days, and instructors. Color-code
              for clarity.
            </p>
            <Link to="/schedule" className="custom-link">
              Try It
            </Link>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg relative transform transition-transform duration-300 ease-in-out hover:scale-95"
          >
            <span className="absolute top-0 right-0 bg-blue-300 text-xs px-2 py-1 rounded-bl">
              Popular
            </span>
            <h3 className="text-xl font-semibold mb-2">Budget Tracker</h3>
            <p className="text-gray-600 mb-4">
              Manage income, expenses, and savings with insightful charts.
            </p>
            <Link to="/budget" className="custom-link">
              Try It
            </Link>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-95"
          >
            <h3 className="text-xl font-semibold mb-2">Exam Q&A Generator</h3>
            <p className="text-gray-600 mb-4">
              Practice with random questions tailored to your study needs.
            </p>
            <Link to="/examQ&A" className="custom-link">
              Try It
            </Link>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-lg relative transform transition-transform duration-300 ease-in-out hover:scale-95"
          >
            <span className="absolute top-0 right-0 bg-yellow-400 text-xs px-2 py-1 rounded-bl">
              New!
            </span>
            <h3 className="text-xl font-semibold mb-2">Study Buddy</h3>
            <p className="text-gray-600 mb-4">
              Get motivational quotes and curated resources for your studies.
            </p>
            <Link to="/planner" className="custom-link">
              Try It
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Features;
