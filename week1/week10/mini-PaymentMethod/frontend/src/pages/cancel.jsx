import React from "react";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded shadow max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Cancelled</h1>
        <p className="mb-4">Your payment was cancelled. You can try again.</p>
        <Link to="/" className="text-blue-600 underline">Back to Courses</Link>
      </div>
    </div>
  );
}
