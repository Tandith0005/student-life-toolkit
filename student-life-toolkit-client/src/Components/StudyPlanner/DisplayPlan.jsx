import { MdDelete } from "react-icons/md";

const DisplayPlan = ({ showData, handleDelete }) => {

  const displayColors = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-200 text-red-800";
      case "Medium":
        return "bg-yellow-200 text-yellow-800";
      case "Low":
        return "bg-green-300 text-green-800"; 
      case "Urgent":
        return "bg-red-400 text-white"; 
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

    return (
        <div>
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
          Study Plans
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto table-pin-rows text-sm sm:text-base border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-500">
                <th className="p-3 sm:p-4 text-center">#</th>
                <th className="p-3 sm:p-4 text-center">Day</th>
                <th className="p-3 sm:p-4 text-center">Time Slot</th>
                <th className="p-3 sm:p-4 text-center">Subject</th>
                <th className="p-3 sm:p-4 text-center">Topic</th>
                <th className="p-3 sm:p-4 text-center">Priority</th>
                <th className="p-3 sm:p-4 text-center">Deadline</th>
                <th className="p-3 sm:p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {showData.length > 0 ? (
                showData.map((plan, index) => (
                  <tr key={index} className={`border-b border-white ${displayColors(plan.priority)}`}>
                    <td className="p-3 sm:p-4 text-center">{index + 1}</td>
                    <td className="p-3 sm:p-4 text-center">{plan.day}</td>
                    <td className="p-3 sm:p-4 text-center">{plan.timeSlot}</td>
                    <td className="p-3 sm:p-4 text-center">{plan.subject}</td>
                    <td className="p-3 sm:p-4 text-center">{plan.topic}</td>
                    <td className="p-3 sm:p-4 text-center">{plan.priority}</td>
                    <td className="p-3 sm:p-4 text-center">{plan.deadline}</td>
                    <td className="p-3 sm:p-4 flex justify-center">
                      <MdDelete onClick={() => handleDelete(plan._id)} className="text-[30px]  text-red-600 cursor-pointer" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-3 sm:p-4 text-center">
                    No plans available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default DisplayPlan;