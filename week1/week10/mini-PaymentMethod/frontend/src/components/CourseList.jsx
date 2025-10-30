import React from "react";
import { useState } from "react";

const COURSES = [
  { id: 1, name: "Learn React Today", price: 100.0 },
  { id: 2, name: "CSS Mastery", price: 200.0 }
];

export default function CourseList() {
  const [loading, setLoading] = useState(false);

  async function handleEnroll(item) {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/payments/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ id: item.id, quantity: 1 }],
          customerEmail: "" // optional
        })
      });
      const data = await res.json();
      if (data.url) {
        // redirect to stripe checkout
        window.location.href = data.url;
      } else {
        alert("Error creating session");
      }
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-6">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
        <div className="grid gap-4">
          {COURSES.map((c) => (
            <div key={c.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{c.name}</h2>
                <p className="text-gray-600">${c.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => handleEnroll(c)}
                disabled={loading}
                className="bg-blue-600 text-navy-600 px-4 py-2 rounded hover:bg-blue-700"
              >
                Enroll
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
