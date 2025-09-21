import React, { useState } from "react";

//  Button Component
function Button({ text, handleClick, color }) {
  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded-lg text-white font-semibold shadow-md hover:opacity-90 transition ${color}`}
    >
      {text}
    </button>
  );
}


function Counter({ initialValue }) {
  const [count, setCount] = useState(initialValue);

  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-80 mx-auto mt-10 text-center">
      <h2 className="text-2xl font-bold mb-4">Count: {count}</h2>
      <div className="flex gap-3 justify-center">
        <Button text=" Increase" handleClick={increase} color="bg-green-500" />
        <Button text=" Decrease" handleClick={decrease} color="bg-red-500" />
        <Button text=" Reset" handleClick={reset} color="bg-blue-500" />
      </div>
    </div>
  );
}


function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
      <div>
        <h1 className="text-4xl font-extrabold text-white mb-6 text-center">
          React Counter App
        </h1>
        <Counter initialValue={0} />
      </div>
    </div>
  );
}

export default App;
