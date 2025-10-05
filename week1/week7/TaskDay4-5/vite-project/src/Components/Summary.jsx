import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function Summary() {
  const { income, expense, balance } = useContext(ExpenseContext);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex justify-around items-center mb-4">
      <div className="text-green-600 font-semibold">
        Income: {income.toFixed(2)}
      </div>
      <div className="text-red-600 font-semibold">
        Expense: {expense.toFixed(2)}
      </div>
      <div className="font-bold text-gray-700">
        Balance: {balance.toFixed(2)}
      </div>
    </div>
  );
}
