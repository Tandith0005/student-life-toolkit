import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaDeleteLeft } from "react-icons/fa6";

const QuickOverview = ({
  upcomingClasses,
  summaryVariants,
  budgetData,
  motivationalQuote,
  handleTaskSave,
  setNewTask,
  newTask,
  tasks,
  handleTaskDelete,
  taskControls,
  jumpVariants,
}) => {
  return (
    <div className="md:mt-[100px]">
      <section>
        <h2 className="md:text-4xl text-3xl font-bold text-center md:mb-[80px] mb-[20px] ">----- Quick Overview -----</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            variants={summaryVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-rose-500 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="md:text-[25px] mb-5 text-xl font-semibold">
              Last Added Class
            </h3>
            {upcomingClasses.length === 0 ? (
              <p className="text-gray-600">No upcoming classes.</p>
            ) : (
              <ul className="text-gray-600 space-y-2">
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold text-[16px]">Day :</span>{" "}
                  {upcomingClasses.day}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold text-[16px]">Time :</span>{" "}
                  {upcomingClasses.time}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold text-[16px]">
                    Instructor :
                  </span>{" "}
                  {upcomingClasses.instructor}
                </p>
                <p className="text-gray-600 text-sm italic">
                  <span className="font-semibold text-[16px]">Subject :</span>{" "}
                  {upcomingClasses.subject}
                </p>
              </ul>
            )}
          </motion.div>
          <motion.div
            variants={summaryVariants}
            initial="hidden"
            animate="visible"
            custom={1}
            className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-rose-500 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="md:text-[25px] mb-5 text-xl font-semibold">
              Budget Overview
            </h3>
            <p className="text-gray-600 mb-2">
              Income: ${budgetData.income.toFixed(2)}
            </p>
            <p className="text-gray-600 mb-2">
              Expenses: ${budgetData.expenses.toFixed(2)}
            </p>
            <p
              className={`text-gray-600 ${
                budgetData.balance >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              Balance: ${budgetData.balance.toFixed(2)}
            </p>
          </motion.div>
          <motion.div
            id="tasks"
            variants={jumpVariants}
            initial="hidden"
            animate={taskControls}
            custom={2}
            className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-rose-500 hover:shadow-xl transition-shadow duration-300 row-span-3 md:max-h-109 max-h-96 flex flex-col"
          >
            <h3 className="md:text-[25px] mb-5 text-xl font-semibold">
              Upcoming Tasks
            </h3>
            <div>
              <div className="flex-1 overflow-y-auto max-h-62 mb-4 pr-2">
                {tasks.length === 0 ? (
                  <p className="text-gray-600">No tasks yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {tasks.map((task, index) => (
                      <li
                        key={task._id || index}
                        className="p-2 bg-gray-100 rounded-md shadow-sm flex items-center justify-between"
                      >
                        {task.note}
                        <FaDeleteLeft onClick={() => handleTaskDelete(task._id)} size={20} className="text-rose-500 cursor-pointer"/>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
              className="btn bg-[#F43F5E] text-white"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              Add Task
            </button>
            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg mb-3">Add New Task</h3>
                <textarea
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Write your note..."
                  className="w-full h-28 border p-2 rounded mb-3"
                />
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                  <button
                    onClick={handleTaskSave}
                    className="btn bg-rose-500 text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            </dialog>
          </motion.div>
          <motion.div
            variants={summaryVariants}
            initial="hidden"
            animate="visible"
            custom={3}
            className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-rose-500 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="md:text-[25px] mb-5 text-xl font-semibold">
              Exam Prep
            </h3>
            <p className="text-gray-600 mb-5">
              Ready to practice? Try a quiz now!
            </p>
            <Link
              to="/examQ&A"
              className="text-rose-500 font-semibold underline"
            >
              Start Quiz
            </Link>
          </motion.div>
          <motion.div
            variants={summaryVariants}
            initial="hidden"
            animate="visible"
            custom={4}
            className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-rose-500 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">Daily Motivation</h3>
            {motivationalQuote ? (
              <div>
                <p className="text-gray-600 italic">
                  "{motivationalQuote.content}"
                </p>
                <p className="text-gray-600 mt-2">
                  — {motivationalQuote.author}
                </p>
              </div>
            ) : (
              <p className="text-gray-600">No quote available.</p>
            )}
            <Link
              to="/motivation"
              className="text-rose-500 font-semibold underline mt-2 block"
            >
              More Inspiration
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default QuickOverview;
