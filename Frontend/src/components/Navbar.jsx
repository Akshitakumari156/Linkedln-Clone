import { useAuth } from "../context/AuthContext";
import Logo from "../assets/linkedln.png";
export default function Navbar() {
  const { user } = useAuth(); 

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="LinkedIn" className="w-8 h-8" />
          <h1 className="text-xl font-semibold text-blue-600">LinkedIn</h1>
        </div>
        <div>
          {user ? (
            <p className="text-gray-700">Welcome, {user.name}</p>
          ) : (
            <a href="/login" className="text-blue-500">Login</a>
          )}
        </div>
      </div>
    </nav>
  );
}
