import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteGoal, updateGoal } from "../features/goalsSlice";
import { FaTrashAlt, FaCalendarAlt, FaEdit, FaSave, FaTimes } from "react-icons/fa";

function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(goal.text);

  const handleUpdate = () => {
    if (updatedText.trim() && updatedText !== goal.text) {
      dispatch(updateGoal({ id: goal._id, text: updatedText }));
    }
    setIsEditing(false);
  };

  return (
    <div className="relative bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
      {/* Date */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <FaCalendarAlt className="text-indigo-500" />
        <span>{new Date(goal.createdAt).toLocaleString("en-US")}</span>
      </div>

      {/* Goal Text or Edit Input */}
      {isEditing ? (
        <input
          type="text"
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
          className="border rounded-md px-2 py-1 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          autoFocus
        />
      ) : (
        <h2 className="text-lg font-semibold text-gray-800 mb-3">{goal.text}</h2>
      )}

      {/* Action Buttons */}
      <div className="absolute top-3 right-3 flex gap-3">
        {isEditing ? (
          <>
            <button
              onClick={handleUpdate}
              className="text-green-500 hover:text-green-700 transition"
              title="Save Changes"
            >
              <FaSave size={16} />
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setUpdatedText(goal.text);
              }}
              className="text-gray-500 hover:text-gray-700 transition"
              title="Cancel Edit"
            >
              <FaTimes size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:text-blue-700 transition"
              title="Edit Goal"
            >
              <FaEdit size={16} />
            </button>
            <button
              onClick={() => dispatch(deleteGoal(goal._id))}
              className="text-red-500 hover:text-red-700 transition"
              title="Delete Goal"
            >
              <FaTrashAlt size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default GoalItem;
