import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ScheduleForm from "../Components/Schedule/ScheduleForm";
import DisplayForm from "../Components/Schedule/DisplayForm";
import AnimatedTitles from "../Common/AnimatedTitles";
import Axios from "../Axios/Axios";
import { AuthContext } from "../Providers/AuthContext";
import { days, colors, subjectOptions } from "../Common/Constants";
import { motion } from "framer-motion";

const ScheduleTracker = () => {
  const {user} = useContext(AuthContext);
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await Axios.get(`/schedules/${user.email}`);
        setClasses(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchSchedules();
  }, [user.email]);

  const [form, setForm] = useState({
    stream: "",
    subject: "",
    time: "",
    day: "",
    instructor: "",
    color: "#f43f5e",
  });
  const [error, setError] = useState("");
  const [classes, setClasses] = useState([]);

  const validateForm = () => {
    if (!form.subject || !form.time || !form.day || !form.instructor) {
      setError("Please fill in all the fields.");
      toast.error("Please fill in all the fields.");
      return false;
    }
    if (!/^\d{2}:\d{2}$/.test(form.time)) {
      setError(
        "Please enter a valid time format (HH:MM)  (ex. 09:30 or 14:45)"
      );
      toast.error("Please enter a valid time format (HH:MM).");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    // send data to backend
    try {
      const response = await Axios.post("/schedules", form);
      const insertedId = response.data.insertedId;

      if (insertedId) {
        toast.success("Class Added Successfully.");
        setForm({
          stream: "",
          subject: "",
          time: "",
          day: "",
          instructor: "",
          color: "#f43f5e",
        });
      }
      // Get new added data from backend and pass it to DisplayForm
      const refetchSchedule = await Axios.get(`/schedules/${user.email}`);
      setClasses(refetchSchedule.data);
    } catch (error) {
      toast.error(error.message);
    }

  };
  const handleDelete = async(id)=>{
    try {
      const response = await Axios.delete(`/schedules/${id}`);
      if (response.data.deletedCount > 0) {
        setClasses(classes.filter(cls=> cls._id !== id));
        toast.success("Class Deleted Successfully.");
      }
      
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
    
  }

  return (
    <div className="mx-auto p-4">
      {/* Head Text & Sub Head Text */}
      <AnimatedTitles
        title={"Class Schedule Tracker"}
        subtitle={"keep track of your Daily or Weekly classes"}
      ></AnimatedTitles>

      {/* Form Inputs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ScheduleForm
        {...{
          form,
          setForm,
          error,
          handleSubmit,
          subjectOptions,
          days,
          colors,
        }}
      ></ScheduleForm>

      {/* Display Schedule */}
      <DisplayForm classes={classes} handleDelete={handleDelete}/>
      </motion.div>
    </div>
  );
};

export default ScheduleTracker;
