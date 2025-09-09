import { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import AnimatedTitles from "../Common/AnimatedTitles";
import { AuthContext } from "../Providers/AuthContext";
import Axios from "../Axios/Axios";
import toast from "react-hot-toast";
import InsertBudget from "../Components/BudgetTracker/InsertBudget";
import DisplayBudget from "../Components/BudgetTracker/DisplayBudget";
import PieChart from "../Components/BudgetTracker/PieChart";
import Details from "../Components/BudgetTracker/Details";
import { motion } from "framer-motion";

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetTracker = () => {
  // State to store form data
  const [income, setIncome] = useState({ description: "", amount: "" });
  const [expense, setExpense] = useState({ description: "", amount: "" });
  const [fetchedData, setFetchedData] = useState([]);
  const { user } = useContext(AuthContext);

  const payload = {
    user: user?.email,
    income: income.description && income.amount ? income : null,
    expense: expense.description && expense.amount ? expense : null,
  };

  // Calculate totals from fetched data
  const totalIncome = fetchedData.reduce((sum, item) => {
    return item.income && item.income.amount
      ? sum + parseFloat(item.income.amount)
      : sum;
  }, 0);

  const totalExpenses = fetchedData.reduce((sum, item) => {
    return item.expense && item.expense.amount
      ? sum + parseFloat(item.expense.amount)
      : sum;
  }, 0);

  const balance = totalIncome - totalExpenses;

  // Process data for charts
  const incomeChartData = () => {
    const incomeMap = fetchedData
      .filter(
        (item) => item.income && item.income.description && item.income.amount
      )
      .reduce((acc, item) => {
        const desc = item.income.description;
        const amount = parseFloat(item.income.amount);
        acc[desc] = (acc[desc] || 0) + amount;
        return acc;
      }, {});

    const labels = Object.keys(incomeMap);
    const data = Object.values(incomeMap);

    return {
      labels: labels.length ? labels : ["No Income Data"],
      datasets: [
        {
          data: data.length ? data : [1],
          backgroundColor: data.length
            ? ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"]
            : ["#E0E0E0"],
        },
      ],
    };
  };

  const expenseChartData = () => {
    const expenseMap = fetchedData
      .filter(
        (item) =>
          item.expense && item.expense.description && item.expense.amount
      )
      .reduce((acc, item) => {
        const desc = item.expense.description;
        const amount = parseFloat(item.expense.amount);
        acc[desc] = (acc[desc] || 0) + amount;
        return acc;
      }, {});

    const labels = Object.keys(expenseMap);
    const data = Object.values(expenseMap);

    return {
      labels: labels.length ? labels : ["No Expense Data"],
      datasets: [
        {
          data: data.length ? data : [1],
          backgroundColor: data.length
            ? ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"]
            : ["#E0E0E0"],
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  // Save button handler
  const handleSave = async () => {
    const isIncomeValid =
      income.description && income.amount && !isNaN(parseFloat(income.amount));

    const isExpenseValid =
      expense.description &&
      expense.amount &&
      !isNaN(parseFloat(expense.amount));

    if (!isIncomeValid && !isExpenseValid) {
      toast.error("Please fill at least one valid income or expense field.");
      return;
    }

    try {
      const response = await Axios.post("/budget", payload);
      const insertedId = response.data.insertedId;
      if (insertedId) {
        toast.success("Budget Added Successfully.");
        // Refresh data after saving
        const updatedData = await Axios.get(`/budget/${user?.email}`);
        setFetchedData(updatedData.data);
        setIncome({ description: "", amount: "" });
        setExpense({ description: "", amount: "" });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || error.message);
    }
  };

  const handleReset = async () => {
    try {
      await Axios.delete(`/budget/${user?.email}`);
      toast.success("Budget Reset Successfully.");
      setFetchedData([]); // clear data in UI
      setIncome({ description: "", amount: "" });
      setExpense({ description: "", amount: "" });
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`/budget/${user?.email}`);
        setFetchedData(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch budget data.");
      }
    };
    if (user?.email) {
      fetchData();
    }
  }, [user?.email]);

  return (
    <div>
      <AnimatedTitles
        title="Budget Tracker"
        subtitle="Track your expenses and manage your finances effectively."
      />

      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.9}}
      >
      {/* Input */}
        <InsertBudget
          income={income}
          setIncome={setIncome}
          expense={expense}
          setExpense={setExpense}
          handleSave={handleSave}
        ></InsertBudget>

        {/* Details */}
        <Details fetchedData={fetchedData}></Details>

        {/* Financial Summary */}
        <DisplayBudget
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          balance={balance}
          handleReset={handleReset}
        ></DisplayBudget>

        {/* Pie Chart */}
        <PieChart
          incomeChartData={incomeChartData}
          expenseChartData={expenseChartData}
          chartOptions={chartOptions}
        ></PieChart>
      </motion.div>
    </div>
  );
};

export default BudgetTracker;
