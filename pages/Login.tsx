import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'editor' && password === 'Tapouts@123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/editor');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-eco-green flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="flex justify-center mb-6 text-eco-green">
          <div className="p-3 bg-eco-beige rounded-full">
            <Lock size={32} />
          </div>
        </div>
        <h2 className="text-2xl font-serif font-bold text-center text-eco-green mb-6">Editor Login</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-eco-gold outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-eco-gold outline-none"
            />
          </div>
          <button type="submit" className="w-full bg-eco-gold text-white font-bold py-2 rounded hover:bg-eco-gold/90 transition-colors">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/" className="text-sm text-gray-500 hover:underline">Back to Website</a>
        </div>
      </div>
    </div>
  );
};

export default Login;