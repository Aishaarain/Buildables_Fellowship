import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/authSlice'

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/");
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">
          <Link to="/" className="hover:text-indigo-400 transition-colors">
            Goal<span className="text-indigo-500">Setter</span>
          </Link>
        </div>

        {/* Nav Links */}
        <ul className="flex items-center space-x-6">
       {user ? (
  <li>
    <button
      onClick={onLogout}
      className="flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
    >
      <FaSignOutAlt /> Logout
    </button>
  </li>
) : (
  <>
    <li>
      <Link
        to="login"
        className="flex items-center gap-2 hover:text-indigo-400 transition"
      >
        <FaSignInAlt /> Login
      </Link>
    </li>
    <li>
      <Link
        to="register"
        className="flex items-center gap-2 hover:text-indigo-400 transition"
      >
        <FaUser /> Register
      </Link>
    </li>
  </>
)}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
