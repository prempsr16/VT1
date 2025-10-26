import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Role, User } from '../types';
import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>(Role.Student);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingToast = toast.loading('Authenticating...');

    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);
    params.append('role', role);

    try {
      const response = await api.post('/login.php', params);
      
      if (response.data.success) {
        toast.success('Login Successful!', { id: loadingToast });
        const userData: User = {
            id: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
            role: role,
        };
        login(userData);
        navigate(`/${role}`);
      } else {
        toast.error(response.data.message || 'Login failed. Please check your credentials.', { id: loadingToast });
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.', { id: loadingToast });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 animate-fade-in-up">
      <div className="max-w-md w-full bg-secondary p-8 rounded-xl shadow-2xl border border-gray-700">
        <h1 className="text-3xl font-bold text-center text-primary-light mb-2">Vidhyathri Tantra</h1>
        <h2 className="text-xl font-semibold text-center text-text-primary mb-8">Portal Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-text-secondary mb-2" htmlFor="role">I am a</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full px-4 py-3 bg-gray-700 text-text-primary border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light transition-all"
            >
              <option value={Role.Student}>Student</option>
              <option value={Role.Teacher}>Teacher</option>
              <option value={Role.Parent}>Parent</option>
              <option value={Role.Admin}>Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-text-secondary mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 text-text-primary border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-text-secondary mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 text-text-primary border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light transition-all"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-hover transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:scale-100"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center text-text-secondary mt-8">
          Don't have an account? <Link to="/register" className="text-primary-light font-semibold hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;