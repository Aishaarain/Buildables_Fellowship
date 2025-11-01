import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/queries";

export default function ProjectList() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error fetching projects</p>;

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold mb-3">Projects</h3>
      <div className="space-y-3">
        {data.projects.map((p) => (
          <div
            key={p.id}
            className="p-4 bg-gray-800 rounded-lg flex justify-between items-center"
          >
            <div>
              <h4 className="text-lg font-bold">{p.name}</h4>
              <p className="text-sm text-gray-400">{p.status}</p>
            </div>
            <span className="text-indigo-400">{p.client.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
