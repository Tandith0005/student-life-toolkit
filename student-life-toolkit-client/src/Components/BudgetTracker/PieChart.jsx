import { Pie } from "react-chartjs-2";

const PieChart = ({ incomeChartData, expenseChartData, chartOptions }) => {
    return (
        <div>
            <div className="mt-6 p-5 bg-gray-100 rounded-lg">
        <h2 className="md:text-[30px] text-[25px] font-semibold mb-4 text-[#F43F5E]">
          Budget Visualizations
        </h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <div className="bg-white p-4 rounded shadow w-full max-w-sm mx-auto">
            <h3 className="text-lg font-medium mb-2">Income Distribution</h3>
            <Pie data={incomeChartData()} options={chartOptions} />
          </div>
          <div className="bg-white p-4 rounded shadow w-full max-w-sm mx-auto">
            <h3 className="text-lg font-medium mb-2">Expense Distribution</h3>
            <Pie data={expenseChartData()} options={chartOptions} />
          </div>
        </div>
      </div>
        </div>
    );
};

export default PieChart;