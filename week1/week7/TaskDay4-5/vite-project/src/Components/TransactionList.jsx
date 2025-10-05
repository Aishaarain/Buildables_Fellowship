import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function TransactionList() {
  const { transactions, deleteTransaction } = useContext(ExpenseContext);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-4">
      <h2 className="text-lg font-semibold mb-2">Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet.</p>
      ) : (
        <ul className="space-y-2">
          {transactions.map((t) => (
            <li
              key={t.id}
              className={`flex justify-between items-center border-b pb-2 ${
                t.type === "income" ? "text-green-600" : "text-red-600"
              }`}
            >
              <div>
                <strong>{t.title}</strong> — ₹{t.amount} ({t.category})
              </div>
              <button
                onClick={() => deleteTransaction(t.id)}
                className="text-gray-400 hover:text-red-600"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
