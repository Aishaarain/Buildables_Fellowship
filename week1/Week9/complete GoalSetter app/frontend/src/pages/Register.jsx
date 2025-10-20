import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/authSlice";
import Spinner from "../components/Spinner";


function Register() { 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate =useNavigate();
  const dispatch = useDispatch();

  const {user ,isloading,isError,isSuccess,message} 
  = useSelector((state)=>state.auth);

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

  
      const userData={
        name,
        email,
        password,
      }
      dispatch(register(userData));
    }
  

  if(isloading){
    return <Spinner />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        {/* Heading */}
        <section className="text-center mb-6">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2 text-gray-800">
            <FaUser /> Register
          </h1>
          <p className="text-gray-500 mt-1">Please create an account</p>
        </section>

        {/* Form */}
        <section>
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder="Enter your name"
                onChange={onChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

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

            {/* Confirm Password */}
            {/* <div>
              <input
                type="password"
                id="password2"
                name="password2"
                value={password2}
                placeholder="Confirm password"
                onChange={onChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div> */}

            {/* Submit Button */}
            <div>
              <button
                onSubmit={onSubmit}
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

export default Register;
