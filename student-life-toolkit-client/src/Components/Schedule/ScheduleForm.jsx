import { motion } from "framer-motion";
import { AuthContext } from "../../Providers/AuthContext";
import { useContext } from "react";
const ScheduleForm = ({ form, setForm, error, handleSubmit, subjectOptions, days, colors }) => {
    const {user} = useContext(AuthContext);
    return (
        <form onSubmit={handleSubmit} className="my-10">
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Stream Dropdown */}
          <select
            value={form.stream || ""}
            onChange={(e) =>
              setForm({ ...form, stream: e.target.value, subject: "", user: user.email })
            }
            className="p-2 border-2 rounded border-dotted border-[#f43f5e] focus:border-[#f43f5e] focus:outline-none"
          >
            <option value="">Select Group</option>
            <option value="Science">Science</option>
            <option value="Commerce">Commerce</option>
            <option value="Arts">Arts</option>
          </select>

          {/* Subject Dropdown */}
          <select
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            disabled={!form.stream} // disable until stream is chosen
            className="p-2 border-2 rounded border-dotted border-[#f43f5e] focus:border-[#f43f5e] focus:outline-none"
          >
            <option value="">Select Subject</option>
            {form.stream &&
              subjectOptions[form.stream].map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
          </select>

          <input
            type="text"
            placeholder="Time (HH:MM)"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="input-lg md:input-xl p-2 border-2 rounded border-dotted border-[#f43f5e]  focus:border-[#f43f5e] focus:outline-none"
          />
          <select
            name="day"
            value={form.day}
            onChange={(e) => setForm({ ...form, day: e.target.value })}
            className="p-2 border-2 rounded border-dotted border-[#f43f5e] focus:border-[#f43f5e] focus:outline-none"
          >
            <option value="">Select Day</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Instructor"
            value={form.instructor}
            onChange={(e) => setForm({ ...form, instructor: e.target.value })}
            className="input-lg md:input-xl p-2 border-2 rounded border-dotted border-[#f43f5e]  focus:border-[#f43f5e] focus:outline-none"
          />

          {/* Background colors */}
          <div className="flex flex-wrap gap-2 mt-2 items-center">
            {colors.map((c) => (
              <motion.div
                key={c}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setForm({ ...form, color: c })}
                className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                  form.color === c ? "border-black" : "border-transparent"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}

            {/* Custom Picker */}
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm">Custom=</span>
              <input
                type="color"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="w-10 h-10 cursor-pointer border rounded"
              />
            </label>
          </div>
        </div>
        {/* Form Submission Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex justify-center mt-[50px] md:mt-[150px]">
            <button
              type="submit"
              className="bg-[#f43f5e] w-[150px] md:w-[250px] text-white font-semibold py-2 px-4 rounded hover:bg-[#eb1c3f] transition duration-300 cursor-pointer"
            >
              Add Class
            </button>
          </div>
        </motion.div>
      </form>
    );
};

export default ScheduleForm;