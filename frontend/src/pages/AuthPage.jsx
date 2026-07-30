import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    monthly_income: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1117]">
      <div className="bg-[#161B22] p-8 rounded-lg shadow-xl w-full max-w-md border border-[#21262D]">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#E2E8F0]">
          {isLogin ? 'Welcome Back to FinNudge' : 'Create an Account'}
        </h2>
        {error && <div className="bg-[#EF4444] text-white p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full">
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full p-3 bg-[#0D1117] border border-[#21262D] rounded text-white focus:outline-none focus:border-[#00B386]"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full p-3 bg-[#0D1117] border border-[#21262D] rounded text-white focus:outline-none focus:border-[#00B386]"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="monthly_income"
                placeholder="Monthly Income (₹)"
                className="w-full p-3 bg-[#0D1117] border border-[#21262D] rounded text-white focus:outline-none focus:border-[#00B386]"
                value={formData.monthly_income}
                onChange={handleChange}
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 bg-[#0D1117] border border-[#21262D] rounded text-white focus:outline-none focus:border-[#00B386]"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 bg-[#0D1117] border border-[#21262D] rounded text-white focus:outline-none focus:border-[#00B386]"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#00B386] hover:bg-[#00926C] text-white font-bold py-3 px-4 rounded transition duration-200"
          >
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#00B386] hover:underline"
          >
            {isLogin ? 'Need an account? Register' : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
