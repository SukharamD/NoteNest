import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/dashboard');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg text-center">
        Welcome to <span className="text-white underline">Notenest</span>
      </h1>
      <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl text-center">
        Your smart, minimal, and beautiful notebook for tracking notes and tasks. Organize your mind and life, beautifully.
      </p>

      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 rounded-xl bg-white text-purple-600 font-semibold text-sm hover:scale-105 hover:bg-purple-100 transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/register')}
          className="px-6 py-3 rounded-xl bg-black bg-opacity-20 backdrop-blur-sm text-white font-semibold text-sm hover:scale-105 hover:bg-opacity-30 transition"
        >
          Register
        </button>
      </div>

      <footer className="absolute bottom-4 text-xs text-white/70">
        &copy; {new Date().getFullYear()} Notenest. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
