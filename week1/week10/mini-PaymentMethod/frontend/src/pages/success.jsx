import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("Checking payment...");
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("No session id found.");
      return;
    }

    (async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/payments/checkout-session?session_id=${sessionId}`);
        const data = await res.json();
        setSession(data);
        if (data.payment_status === "paid") {
          setStatus("Payment successful! You are enrolled.");
          // Optionally save to localStorage
          localStorage.setItem("lastEnrollment", JSON.stringify(data));
        } else {
          setStatus("Payment not completed yet.");
        }
      } catch (err) {
        console.error(err);
        setStatus("Error verifying payment.");
      }
    })();
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded shadow max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Enrollment Status</h1>
        <p className="mb-4">{status}</p>
        {session && (
          <div className="text-left bg-gray-50 p-4 rounded">
            <p><strong>Course:</strong> {session?.metadata?.courseName || "Course"}</p>
            <p><strong>Amount:</strong> {(session.amount_total / 100).toFixed(2)} {session.currency}</p>
            <p><strong>Email:</strong> {session.customer_email}</p>
          </div>
        )}
        <div className="mt-4">
          <Link to="/" className="text-blue-600 underline">Back to Courses</Link>
        </div>
      </div>
    </div>
  );
}
