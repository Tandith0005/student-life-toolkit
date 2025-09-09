import React from "react";

const InsertBudget = ({
  income,
  setIncome,
  expense,
  setExpense,
  handleSave,
}) => {
  return (
    <div>
      <div className="flex gap-4 p-5 md:flex-row flex-col">
        <fieldset className="fieldset flex-1">
          <legend className="fieldset-legend text-2xl">Income</legend>
          <input
            type="text"
            className="w-full input input-lg p-2 border-2 rounded border-dotted border-[#f43f5e] focus:border-[#f43f5e] focus:outline-none md:mb-5 mb-3"
            placeholder="Description"
            value={income.description}
            onChange={(e) =>
              setIncome((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <input
            type="number"
            className="w-full input input-lg p-2 border-2 rounded border-dotted border-[#f43f5e] focus:border-[#f43f5e] focus:outline-none"
            placeholder="Amount"
            value={income.amount}
            onChange={(e) =>
              setIncome((prev) => ({ ...prev, amount: e.target.value }))
            }
          />
        </fieldset>

        <fieldset className="fieldset flex-1">
          <legend className="fieldset-legend text-2xl">Expense</legend>
          <input
            type="text"
            className="w-full input input-lg p-2 border-2 rounded border-dotted border-[#f43f5e] focus:border-[#f43f5e] focus:outline-none md:mb-5 mb-3"
            placeholder="Description"
            value={expense.description}
            onChange={(e) =>
              setExpense((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <input
            type="number"
            className="w-full input input-lg p-2 border-2 rounded border-dotted border-[#f43f5e] focus:border-[#f43f5e] focus:outline-none"
            placeholder="Amount"
            value={expense.amount}
            onChange={(e) =>
              setExpense((prev) => ({ ...prev, amount: e.target.value }))
            }
          />
        </fieldset>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleSave}
          className="bg-green-400 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-100 ease-in-out transform hover:scale-105 hover:bg-green-500 cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default InsertBudget;
