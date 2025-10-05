import React from "react";
import { ExpenseProvider } from "./context/ExpenseContext";
import TransactionForm from "./Components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Summary from "./Components/Summary";
import ExpenseChart from "./Components/ChartSummary";


export default function App() {
  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Expense Tracker</h1>
        <Summary />
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div>
            <TransactionForm />
            <TransactionList />
          </div>
          <ExpenseChart />
        </div>
      </div>
    </ExpenseProvider>
  );
}
