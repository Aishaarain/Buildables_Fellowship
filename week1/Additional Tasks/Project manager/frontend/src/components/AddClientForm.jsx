import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT, GET_CLIENTS } from "../graphql/queries";

export default function AddClientForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: form,
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone)
      return alert("All fields required");
    addClient();
    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-3">Add New Client</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Name"
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 py-2 rounded font-semibold"
        >
          Add Client
        </button>
      </form>
    </div>
  );
}
