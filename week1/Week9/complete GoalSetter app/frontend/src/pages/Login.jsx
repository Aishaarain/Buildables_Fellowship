import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/authSlice";  // ✅ fixed import
import Spinner from "../components/Spinner";

function Login() { 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );  // ✅ fixed isLoading spelling

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");  
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => { 
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }; 

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));   // ✅ moved inside onSubmit
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        {/* Heading */}
        <section className="text-center mb-6">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2 text-gray-800">
            <FaSignInAlt /> Login
          </h1>
          <p className="text-gray-500 mt-1">Login and start setting Goals</p>
        </section>

        {/* Form */}
        <section>
          <form onSubmit={onSubmit} className="space-y-4"> {/* ✅ added onSubmit */}
            {/* Email */}
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={onChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;
