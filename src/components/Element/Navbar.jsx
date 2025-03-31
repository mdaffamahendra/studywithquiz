import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  LogOut,
  Home,
  PlusSquare,
  BookOpen,
  Activity,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { userLogout } from "../../redux/slice/UsersSlice";

const Navbar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/login", { replace: true });
  };

  const menuItems =
    role === "student"
      ? [
          { name: "Home", path: "/", icon: <Home size={20} /> },
          { name: "Activity", path: "/activity", icon: <Activity size={20} /> },
          { name: "Join Quiz", path: "/join-quiz", icon: <BookOpen size={20} /> },
          { name: "Read Module", path: "/search-module", icon: <BookOpen size={20} /> },
        ]
      : [
          { name: "Home", path: "/", icon: <Home size={20} /> },
          {
            name: "Create Quiz",
            path: "/quiz",
            icon: <PlusSquare size={20} />,
          },
          {
            name: "Add Modules",
            path: "/module",
            icon: <PlusSquare size={20} />,
          },
        ];

  return (
    <nav className="bg-indigo-600 text-white font-poppins fixed top-0 left-0 right-0 z-99">
      <div className="container flex justify-between items-center p-4">
        {/* Brand */}
        <h1 className="text-xl font-semibold">StudyWithQuiz</h1>

        {/* Menu - Desktop */}
        <ul className="hidden md:flex gap-6 items-center">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="flex items-center gap-2 hover:opacity-80"
              >
                {item.icon} {item.name}
              </Link>
            </li>
          ))}

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 hover:opacity-80"
            >
              <User size={20} /> Account
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 bg-white text-black w-32 shadow-lg rounded-md">
                {/* <li className="px-4 py-2 hover:bg-gray-200">
                  <Link to="/settings" className="flex items-center gap-2">
                    <User size={16} /> Settings
                  </Link>
                </li> */}
                <li className="px-4 py-2 hover:bg-gray-200">
                  <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left">
                    <LogOut size={16} /> Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </ul>

        {/* Hamburger Menu - Mobile */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar - Mobile */}
      <div
        className={`fixed top-0 right-0 h-full bg-indigo-600 text-white w-1/3 p-4 transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsOpen(false)}
        >
          <X size={28} />
        </button>
        <ul className="mt-12 flex flex-col gap-6">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="flex items-center gap-2 hover:opacity-80"
                onClick={() => setIsOpen(false)}
              >
                {item.icon} {item.name}
              </Link>
            </li>
          ))}

          {/* Dropdown Account */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 hover:opacity-80"
            >
              <User size={20} /> Account
            </button>
            {dropdownOpen && (
              <ul className="mt-2 bg-white text-black w-full shadow-lg rounded-md">
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link to="/settings" className="flex items-center gap-2">
                    <User size={16} /> Settings
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
