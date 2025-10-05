import React, { useState, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function TransactionForm() {
  const { addTransaction } = useContext(ExpenseContext);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense"); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    const newTransaction = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      category,
      type, 
      date: new Date().toISOString().slice(0, 10),
    };

    addTransaction(newTransaction);
    setTitle("");
    setAmount("");
    setCategory("");
    setType("expense");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow-md flex flex-col gap-3"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded"
      />

      {/*  Income / Expense toggle */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setType("income")}
          className={`px-3 py-1 rounded ${
            type === "income" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
        >
          Income
        </button>
        <button
          type="button"
          onClick={() => setType("expense")}
          className={`px-3 py-1 rounded ${
            type === "expense" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          Expense
        </button>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Add Transaction
      </button>
    </form>
  );
}
