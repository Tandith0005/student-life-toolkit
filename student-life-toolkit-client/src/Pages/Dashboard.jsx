import React, { useContext, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { AuthContext } from "../Providers/AuthContext";
import Axios from "../Axios/Axios";
import toast from "react-hot-toast";
import QuickOverview from "../Components/Dashboard/QuickOverview";
import AllFeatures from "../Components/Dashboard/AllFeatures";
import { useLocation } from "react-router";

// Animation variants for cards
const cardVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

// Animation variants for summary items
const summaryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2 + 0.5,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

// Animation variant for the "jump" effect
const jumpVariants = {
  jump: {
    y: [0, -10, 0],
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      repeat: 1,
    },
  },
};

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [budgetData, setBudgetData] = useState({
    income: 0,
    expenses: 0,
    balance: 0,
  });
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [motivationalQuote, setMotivationalQuote] = useState("");
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]); 
  const location = useLocation(); 
  const taskControls = useAnimation();


  useEffect(() => {
    // Fetch budget data
    const fetchBudgetData = async () => {
      try {
        const response = await Axios.get(`/budget/${user?.email}`);
        const data = response.data;

        if (!Array.isArray(data) || data.length === 0) {
          setBudgetData({ income: 0, expenses: 0, balance: 0 });
          return;
        }

        const totalIncome = data.reduce(
          (sum, item) =>
            sum + (item.income?.amount ? parseFloat(item.income.amount) : 0),
          0
        );

        const totalExpenses = data.reduce(
          (sum, item) =>
            sum + (item.expense?.amount ? parseFloat(item.expense.amount) : 0),
          0
        );

        setBudgetData({
          income: totalIncome,
          expenses: totalExpenses,
          balance: totalIncome - totalExpenses,
        });
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch budget data.");
      }
    };

    // Motivational Quotes
    const fetchMotivationalQuote = async () => {
      try {
        const response = await Axios.get("/quotes/random");
        const quotesData = response.data;
        setMotivationalQuote(quotesData[0]);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch motivational quotes. Try again later.");
      }
    };

    // Fetch class schedule data
    const fetchScheduleData = async () => {
      try {
        const response = await Axios.get(`/schedules/overview/${user?.email}`);
        const Data = response.data;
        setUpcomingClasses(Data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch schedule data.");
      }
    };

    // Fetch tasks data
    const fetchTaskData = async () => {
      try {
        const response = await Axios.get(`/tasks/${user?.email}`);
        const Data = response.data;
        setTasks(Data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch tasks data.");
      }
    };

    if (user?.email) {
      fetchBudgetData();
      fetchMotivationalQuote();
      fetchScheduleData();
      fetchTaskData();
    }
  }, [user?.email]);

  // Set task data 
  const handleTaskSave = async () => {
  try {
    const response = await Axios.post(`/tasks`, { note: newTask, user: user?.email });
    toast.success("Task saved successfully.");
    setTasks([...tasks, response.data]); 
    setNewTask("");
    document.getElementById("my_modal_5").close(); // close the modal
  } catch (error) {
    console.error(error);
    toast.error("Failed to save task.");
  }
};
// Delete task data
  const handleTaskDelete = async (id) => {
    try {
      
      await Axios.delete(`/tasks/${id}`);
      toast.success("Task deleted successfully.");
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete task.");
    }
    
  }
  useEffect(() => {
    if (location.hash === "#tasks") {
      const tasksElement = document.getElementById("tasks");
      if (tasksElement) {
        tasksElement.scrollIntoView({ behavior: "smooth" });
        taskControls.start("jump"); // Trigger the jump animation
      }
    }
  }, [location.hash, taskControls]);


  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 md:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#F43F5E]">
          Welcome{user?.email ? `, ${user.email.split("@")[0]}` : ""}!
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-2">
          Your all-in-one hub for managing student life.
        </p>
      </motion.div>

      {/* Feature Navigation Cards */}
      <AllFeatures cardVariants={cardVariants}></AllFeatures>

      {/* Quick Summary Section */}
      <QuickOverview upcomingClasses={upcomingClasses} summaryVariants={summaryVariants} budgetData={budgetData} motivationalQuote={motivationalQuote}  handleTaskSave={handleTaskSave} setNewTask={setNewTask} newTask={newTask} tasks={tasks} handleTaskDelete={handleTaskDelete} jumpVariants={jumpVariants} taskControls={taskControls}></QuickOverview>
    </div>
  );
};

export default Dashboard;
