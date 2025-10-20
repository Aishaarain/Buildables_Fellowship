import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goalsSlice";
import { FaPlusCircle } from "react-icons/fa";

function GoalForm() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return; // Prevent empty goals
    dispatch(createGoal({ text }));
    setText("");
  };

  return (
    <section className="mb-6">
      <form
        onSubmit={onSubmit}
        className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm"
      >
        <label
          htmlFor="text"
          className="block text-lg font-semibold text-gray-700 mb-3"
        >
          Add a New Goal
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            placeholder="Enter your goal..."
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            <FaPlusCircle /> Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
