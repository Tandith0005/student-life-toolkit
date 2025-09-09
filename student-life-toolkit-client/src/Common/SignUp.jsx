
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useContext, useState } from 'react';
import { AuthContext } from '../Providers/AuthContext';
import { CircleLoader } from 'react-spinners';
import SocialLogin from './SocialLogin';

const SignUp = () => {
  const location = useLocation();
  const {signUp,loginWithGoogle, loading, setLoading, updateUserProfile} = useContext(AuthContext);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields.');
      toast.error('Please fill in all fields.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      toast.error('Please enter a valid email address.');
      return false;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      toast.error('Password must be at least 6 characters long.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  try {
    const result = await signUp(form.email, form.password); 
    await updateUserProfile(form.name); 
    toast.success(`Account created successfully!${result.user.email}`);
    navigate(location.state?.from || '/');

  } catch (error) {
    toast.error(error.message);
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-4 text-[#f43f5e]">
          SignUp to Student Life Toolkit
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Access your schedule, budget, and more!
        </p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="name"
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your email"
              className="w-full p-2 border-2 rounded border-dotted border-[#f43f5e] focus:border-[#f43f5e] focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full p-2 border-2 rounded border-dotted border-[#f43f5e] focus:border-[#f43f5e] focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full p-2 border-2 rounded border-dotted border-[#f43f5e] focus:border-[#f43f5e] focus:outline-none"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              type="submit"
              className="w-full bg-[#f43f5e] text-white font-semibold py-2 px-4 rounded hover:bg-[#eb1c3f] transition duration-300"
            >
              {loading ? <CircleLoader color="white" size={20} className='disabled'/> : 'Sign Up'}
            </button>
          </motion.div>
        </form>
          <div>
            <SocialLogin loginWithGoogle={loginWithGoogle} loading={loading} setLoading={setLoading} setError={setError} toast={toast} navigate={navigate} location={location} />
          </div>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-[#f43f5e] hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;