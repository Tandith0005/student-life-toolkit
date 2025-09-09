import { useContext, useEffect, useState } from "react";
import {
  days,
  priorityOptions,
  subjectOptions,
  timeSlots,
} from "../Common/Constants";
import Axios from "../Axios/Axios";
import toast from "react-hot-toast";
import { AuthContext } from "../Providers/AuthContext";
import { CircleLoader } from "react-spinners";
import InsertPlan from "../Components/StudyPlanner/InsertPlan";
import DisplayPlan from "../Components/StudyPlanner/DisplayPlan";
import { motion } from "framer-motion";
import AnimatedTitles from "../Common/AnimatedTitles";

const StudyPlanner = () => {
  const { user, loading } = useContext(AuthContext);
  const [rowData, setRowData] = useState({
    day: "",
    timeSlot: "",
    subject: "",
    topic: "",
    priority: "",
    deadline: "",
  });
  const [showData, setShowData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!user) {
      toast.error("You must be logged in to save a plan.");
      return;
    }
    try {
      const dataToSend = {
        ...rowData,
        user: user.email,
      };
      const { day, timeSlot, subject, topic, priority, deadline } = rowData;
      if (!day || !timeSlot || !subject || !topic || !priority || !deadline) {
        return toast.error("Please fill all the fields");
      }

      const response = await Axios.post(`/plans`, dataToSend);
      const insertedId = response.data.insertedId;
      if (insertedId) {
        toast.success("Plan added");
        setRowData({
          day: "",
          timeSlot: "",
          subject: "",
          topic: "",
          priority: "",
          deadline: "",
        });
        fetchPlans();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const fetchPlans = async () => {
    if (!user) return;
    try {
      const response = await Axios.get(`/plans/${user.email}`);
      setShowData(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      fetchPlans();
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircleLoader color="#f43f5e" size={80} />
      </div>
    );
  }

  // Delete Plan
  const handleDelete = async (id) => {
    try {
      const response = await Axios.delete(`/plans/${id}`);
      if (response.data.deletedCount > 0) {
        toast.success("Plan Deleted Successfully.");
        fetchPlans();
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto overflow-x-auto">
      {/* Insert Plans Data */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <AnimatedTitles
          title="Study Planner"
          subtitle="Plan your study schedule with ease!"
        ></AnimatedTitles>

        {/* Form thing */}
        <InsertPlan
        handleSave={handleSave}
        handleChange={handleChange}
        rowData={rowData}
        days={days}
        timeSlots={timeSlots}
        subjectOptions={subjectOptions}
        priorityOptions={priorityOptions}
      ></InsertPlan>

      {/* Display Data */}
      <DisplayPlan showData={showData} handleDelete={handleDelete}></DisplayPlan>
      </motion.div>
    </div>
  );
};

export default StudyPlanner;
