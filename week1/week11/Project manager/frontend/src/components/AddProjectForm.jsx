import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_PROJECT, GET_CLIENTS, GET_PROJECTS } from "../graphql/queries";

export default function AddProjectForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Not Started",
    clientId: "",
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: form,
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.clientId)
      return alert("Please fill in all fields");
    addProject();
    setForm({ name: "", description: "", status: "Not Started", clientId: "" });
  };

  if (loading) return <p>Loading clients...</p>;
  if (error) return <p>Error loading clients</p>;

  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-3">Add New Project</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Project Name"
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <select
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <select
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          value={form.clientId}
          onChange={(e) => setForm({ ...form, clientId: e.target.value })}
        >
          <option value="">Select Client</option>
          {data.clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 py-2 rounded font-semibold"
        >
          Add Project
        </button>
      </form>
    </div>
  );
}
