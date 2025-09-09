import React from "react";

const InsertPlan = ({
  handleSave,
  rowData,
  handleChange,
  days,
  timeSlots,
  subjectOptions,
  priorityOptions,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
        Add Study Plan
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 items-end">
        <div>
          <select
            name="day"
            value={rowData.day}
            onChange={handleChange}
            className="w-full p-2 border-2 rounded border-dotted border-[#f43f5e] focus:border-[#f43f5e] focus:outline-none"
          >
            <option value="" disabled>
              Select Day
            </option>
            {days.map((day, index) => (
              <option value={day} key={index}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            name="timeSlot"
            value={rowData.timeSlot}
            onChange={handleChange}
            className="w-full p-2 border-2 rounded border-dotted border-[#f43f5e] focus:border-[#f43f5e] focus:outline-none"
          >
            <option value="" disabled>
              Select Time Slot
            </option>
            {timeSlots.map((slot, index) => (
              <option value={slot} key={index}>
                {slot}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            name="subject"
            value={rowData.subject}
            onChange={handleChange}
            className="w-full p-2 border-2 rounded border-dotted border-[#f43f5e] focus:border-[#f43f5e] focus:outline-none"
          >
            <option value="" disabled>
              Select Subject
            </option>
            {Object.keys(subjectOptions).map((stream, index) => (
              <optgroup label={stream} key={index}>
                {subjectOptions[stream].map((subject, index) => (
                  <option value={subject} key={index}>
                    {subject}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div>
          <input
            type="text"
            name="topic"
            placeholder="Enter topic"
            value={rowData.topic}
            onChange={handleChange}
            className="w-full p-2 border-2 rounded border-dotted border-[#f43f5e] focus:border-[#f43f5e] focus:outline-none"
          />
        </div>
        <div>
          <select
            name="priority"
            value={rowData.priority}
            onChange={handleChange}
            className="w-full p-2 border-2 rounded border-dotted border-[#f43f5e] focus:border-[#f43f5e] focus:outline-none"
          >
            <option value="" disabled>
              Priority
            </option>
            {priorityOptions.map((priority, index) => (
              <option value={priority.label} key={index}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="date"
            name="deadline"
            value={rowData.deadline}
            onChange={handleChange}
            className="w-full p-2 border-2 rounded border-dotted border-[#f43f5e] focus:border-[#f43f5e] focus:outline-none"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="bg-[#f04b66] text-white px-4 py-2 rounded-md hover:bg-[#e03a55] transition text-sm sm:text-base cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsertPlan;
