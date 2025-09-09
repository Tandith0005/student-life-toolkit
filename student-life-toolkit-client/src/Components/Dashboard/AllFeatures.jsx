import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AllFeatures = ({ cardVariants }) => {
  return (
    <div className="md:mt-[50px]">
      <section className="mb-16">
        <h2 className="md:text-4xl text-3xl font-bold text-center mb-12">
          ----- Explore Features -----
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-95"
          >
            <h3 className="md:text-[25px] mb-5 text-xl font-semibold">
              Class Schedule Tracker ⏰
            </h3>
            <p className="text-gray-600 mb-4 italic">
              Organize your classes with times, days, and instructors.
            </p>
            <Link
              to="/schedule"
              className="text-rose-500 font-semibold underline"
            >
              Go to Schedule
            </Link>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={1}
            className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-95 relative"
          >
            <span className="absolute top-0 right-0 bg-blue-300 text-xs px-2 py-1 rounded-bl">
              Popular
            </span>
            <h3 className="md:text-[25px] mb-5 text-xl font-semibold">
              Budget Tracker 📈
            </h3>
            <p className="text-gray-600 mb-4 italic">
              Track income, expenses, and savings with charts.
            </p>
            <Link
              to="/budget"
              className="text-rose-500 font-semibold underline"
            >
              Go to Budget
            </Link>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={2}
            className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-95"
          >
            <h3 className="md:text-[25px] mb-5 text-xl font-semibold">
              💡 Exam Q&A Generator ❓
            </h3>
            <p className="text-gray-600 mb-4 italic">
              Practice with tailored quiz questions.
            </p>
            <Link
              to="/examQ&A"
              className="text-rose-500 font-semibold underline"
            >
              Go to Exam Prep
            </Link>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={3}
            className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-95"
          >
            <h3 className="md:text-[25px] mb-5 text-xl font-semibold">
              Study Planner 🎯
            </h3>
            <p className="text-gray-600 mb-4 italic">
              Break down study goals into manageable tasks.
            </p>
            <Link
              to="/planner"
              className="text-rose-500 font-semibold underline"
            >
              Go to Planner
            </Link>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={4}
            className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-95 relative"
          >
            <span className="absolute top-0 right-0 bg-yellow-400 text-xs px-2 py-1 rounded-bl">
              New!
            </span>
            <h3 className="md:text-[25px] mb-5 text-xl font-semibold">
              Motivational Hub 🔥
            </h3>
            <p className="text-gray-600 mb-4 italic">
              Stay inspired with daily quotes and study tips.
            </p>
            <Link
              to="/motivation"
              className="text-rose-500 font-semibold underline"
            >
              Get Inspired
            </Link>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={5}
            className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-95 relative"
          >
            <span className="absolute top-0 right-0 bg-yellow-400 text-xs px-2 py-1 rounded-bl">
              New!
            </span>
            <h3 className="md:text-[25px] mb-5 text-xl font-semibold">
              Synonym & Antonym 📋
            </h3>
            <p className="text-gray-600 mb-4 italic">
              Boost your vocabulary every day.
            </p>
            <Link to="/translate" className="text-rose-500 font-semibold underline">
              Start Practice
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AllFeatures;
