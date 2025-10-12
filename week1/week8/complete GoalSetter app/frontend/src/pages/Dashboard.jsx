import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getGoals, reset } from "../features/goalsSlice";
import GoalForm from "../components/goalForm";
import GoalItem from "../components/goalItem";
import Spinner from "../components/Spinner";
import { FaBullseye } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-md">
        {/* Heading */}
        <section className="text-center mb-6">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 text-gray-800">
            <FaBullseye className="text-indigo-600" />
            Welcome {user && user.name}
          </h1>
          <p className="text-gray-500 mt-1">Your Personal Goals Dashboard</p>
        </section>

        {/* Goal Form */}
        <div className="mb-8">
          <GoalForm />
        </div>

        {/* Goals List */}
        <section className="content">
          {goals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((goal) => (
                <div
                  key={goal._id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
                >
                  <GoalItem goal={goal} />
                </div>
              ))}
            </div>
          ) : (
            <h3 className="text-center text-gray-600 mt-4">
              You have not set any goals yet.
            </h3>
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
