import React from 'react';

const DisplayBudget = ({ totalIncome, totalExpenses, balance, handleReset }) => {
    return (
        <div>
            <div className="mt-6 p-5 bg-gray-100 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="md:text-[30px] text-[25px] font-semibold mb-4 text-[#F43F5E]">
            Financial Summary
          </h2>
          <button
            onClick={handleReset}
            className="bg-red-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-100 ease-in-out transform hover:scale-105 hover:bg-rose-500 cursor-pointer"
          >
            Reset
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-medium">Total Income</h3>
            <p className="text-2xl">${totalIncome.toFixed(2)}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-medium">Total Expenses</h3>
            <p className="text-2xl">${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-medium">Balance</h3>
            <p
              className={`text-2xl ${
                balance >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              ${balance.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
        </div>
    );
};

export default DisplayBudget;