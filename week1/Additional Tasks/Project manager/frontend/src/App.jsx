import AddClientForm from "./components/AddClientForm";
import AddProjectForm from "./components/AddProjectForm";
import ProjectList from "./components/projectList";

function App() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-400">
         GraphQL Project Manager
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        <AddClientForm />
        <AddProjectForm />
      </div>
      <ProjectList />
    </div>
  );
}

export default App;
