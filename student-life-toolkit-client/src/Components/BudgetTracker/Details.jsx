import React from "react";

const Details = ({ fetchedData }) => {
  return (
    <div>
      <button
        className="btn bg-[#9236fc] text-white md:text-[20px] font-semibold px-6 py-7 rounded-lg shadow-md transition duration-100 ease-in-out transform hover:scale-105 hover:bg-[#801af5] my-10 mx-auto  flex items-center justify-center"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        Show Income & Expenses Details
      </button>

      <dialog id="my_modal_5" className="modal">
        <div className="modal-box w-11/12 max-w-4xl bg-white rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-4 text-[#F43F5E]">
            Income & Expense Details
          </h3>

          <div className="py-4 max-h-96 overflow-y-auto space-y-4">
            {fetchedData.length > 0 ? (
              fetchedData.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border border-dotted border-[#F43F5E] rounded-xl shadow-sm bg-gray-50 hover:bg-gray-100 transition"
                >
                  {/* Income */}
                  {item.income && (
                    <div className="mb-2">
                      <p className="font-semibold text-green-600">
                        Income: {item.income.description}
                      </p>
                      <p className="text-sm text-gray-700">
                        Amount: ${item.income.amount}
                      </p>
                    </div>
                  )}

                  {/* Expense */}
                  {item.expense && (
                    <div>
                      <p className="font-semibold text-red-600">
                        Expense: {item.expense.description}
                      </p>
                      <p className="text-sm text-gray-700">
                        Amount: ${item.expense.amount}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No data available.</p>
            )}
          </div>

          {/* Footer */}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-outline btn-error rounded-full px-6">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Details;
