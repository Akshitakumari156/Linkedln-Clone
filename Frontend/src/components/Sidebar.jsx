import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {
  const { user,logout } = useAuth();
  console.log(user);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
   setTimeout(() => {
      navigate("/");
    }, 100);
  };
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-sm mx-auto">
      {/* Top banner */}
      <div className="h-20 bg-gradient-to-r from-blue-500 to-blue-700"></div>

      {/* Profile section */}
      <div className="relative -mt-10 text-center px-4">
        <img
          src="https://via.placeholder.com/80"
          alt="profile"
          className="w-20 h-20 rounded-full border-4 border-white mx-auto shadow-md"
        />
        <h2 className="font-semibold text-lg mt-2 text-gray-800">
          {user?.name || "User Name"}
        </h2>
        <p className="text-gray-500 text-sm">{user?.email || "user@email.com"}</p>

        <button onClick={() => navigate('/profile')} className="mt-3 px-4 py-1.5 border border-blue-600 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-600 hover:text-white transition-all duration-200">
          View Profile
        </button>
      </div>

      <hr className="my-4" />

      {/* Connections Section */}
      <div className="px-5 pb-4">
        <h3 className="font-semibold text-gray-800 mb-1">Connections</h3>
        <p className="text-sm text-gray-500 mb-3">Grow your professional network</p>
        <button className="text-blue-600 text-sm font-medium hover:underline">
          See all connections
        </button>
      </div>

      <hr className="my-3" />

      {/* Settings / Account Section */}
      <div className="px-5 pb-5 text-sm">
        <h3 className="font-semibold text-gray-800 mb-2">Account</h3>
        <ul className="space-y-2 text-gray-600">
            <li
            onClick={handleLogout}
            className="hover:text-red-600 cursor-pointer transition font-medium"
          > Logout
          </li>
        </ul>
      </div>
    </div>
  );
}
