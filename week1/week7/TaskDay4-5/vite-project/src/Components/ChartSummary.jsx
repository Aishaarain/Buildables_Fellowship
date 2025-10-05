import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart() {
  const { transactions } = useContext(ExpenseContext);

  const categoryTotals = transactions.reduce((acc, t) => {
    if (t.type === "expense") {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
    }
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-6 w-full max-w-sm">
      <h2 className="text-lg font-semibold mb-3 text-center">
        Expense Breakdown
      </h2>
      {Object.keys(categoryTotals).length > 0 ? (
        <Pie data={data} />
      ) : (
        <p className="text-gray-500 text-center">No expense data yet.</p>
      )}
    </div>
  );
}
