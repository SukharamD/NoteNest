import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { getUserProfile } from '../services/user';

const Navbar = ({ activeTab, setActiveTab }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const toggleDarkMode = () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

useEffect(() => {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
}, []);


  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const profile = await getUserProfile();
        setUser(profile);
      }
    };
    fetchUser();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="w-full px-6 py-3 flex justify-between items-center bg-white dark:bg-gray-800 text-black dark:text-white shadow">

      {/* Left: App Name */}
      <div className="text-xl font-bold text-blue-600">Notenest</div>
        <button
          onClick={toggleDarkMode}
          className="cursor-pointer px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Toggle Theme
        </button>


      {/* Middle: Toggle */}
      <div className="flex space-x-4">
        <button
              className={` cursor-pointer px-3 py-1 rounded ${
      activeTab === 'notes'
        ? 'bg-blue-500 text-white dark:bg-blue-600'
        : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
    }`}
          onClick={() => setActiveTab('notes')}
        >
          Notes
        </button>
        <button
             className={` cursor-pointer px-3 py-1 rounded ${
      activeTab === 'tasks'
        ? 'bg-blue-500 text-white dark:bg-blue-600'
        : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
    }`}
          onClick={() => setActiveTab('tasks')}
        >
          Tasks
        </button>
      </div>

      {/* Right: User Icon + Info */}
      <div className="flex items-center text-black dark:text-white space-x-2">
        <FaUserCircle className="text-2xl mr-2" />
        {!token ? (
          <Link to="/login" className="cursor-pointer text-sm text-blue-600 font-medium hover:underline">
            Login
          </Link>
        ) : (
          <>
            <span className="text-sm font-medium text-black dark:text-white">{user?.username}</span>
            <button
              onClick={handleLogout}
              className=" cursor-pointer text-sm text-red-500 hover:underline ml-2"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
