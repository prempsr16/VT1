import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Role } from '../types';
import toast from 'react-hot-toast';

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: Role.Student,
    profilePhoto: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, profilePhoto: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingToast = toast.loading('Creating your account...');
    
    // Using FormData to handle file upload
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('role', formData.role);
    if (formData.profilePhoto) {
      data.append('profilePhoto', formData.profilePhoto);
    }
    
    try {
      // The backend needs to be able to handle multipart/form-data
      const response = await api.post('/register.php', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.data.success) {
        toast.success(response.data.message || 'Registration successful! Please login.', { id: loadingToast });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(response.data.message || 'Registration failed. Please try again.', { id: loadingToast });
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.', { id: loadingToast });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const totalSteps = 3;
  const progress = ((step -1) / (totalSteps-1)) * 100;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 animate-fade-in-up">
      <div className="max-w-md w-full bg-secondary p-8 rounded-xl shadow-2xl border border-gray-700">
        <h1 className="text-3xl font-bold text-center text-primary-light mb-2">Vidhyathri Tantra</h1>
        <h2 className="text-xl font-semibold text-center text-text-primary mb-6">Create Your Account</h2>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-8">
            <div className="bg-primary-light h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="animate-fade-in-up">
              <h3 className="font-semibold text-lg text-center mb-4">Step 1: Choose Your Role</h3>
              <label className="block text-text-secondary mb-2" htmlFor="role">Register as a</label>
              <select id="role" name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-3 bg-gray-700 text-text-primary border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light">
                <option value={Role.Student}>Student</option>
                <option value={Role.Teacher}>Teacher</option>
                <option value={Role.Parent}>Parent</option>
              </select>
               <button type="button" onClick={handleNext} className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-hover transition-transform transform hover:scale-105">Next</button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in-up">
              <h3 className="font-semibold text-lg text-center mb-4">Step 2: Account Details</h3>
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-700 text-text-primary border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light" required />
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full mt-4 px-4 py-3 bg-gray-700 text-text-primary border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light" required />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full mt-4 px-4 py-3 bg-gray-700 text-text-primary border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light" required />
               <div className="flex justify-between mt-6">
                <button type="button" onClick={handleBack} className="w-1/2 mr-2 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-500 transition-colors">Back</button>
                <button type="button" onClick={handleNext} className="w-1/2 ml-2 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors">Next</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in-up">
              <h3 className="font-semibold text-lg text-center mb-4">Step 3: Profile Photo (Optional)</h3>
              <label className="block text-text-secondary mb-2" htmlFor="profilePhoto">Upload a photo</label>
              <input type="file" id="profilePhoto" name="profilePhoto" onChange={handleFileChange} className="w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover"/>
              <div className="flex justify-between mt-6">
                 <button type="button" onClick={handleBack} className="w-1/2 mr-2 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-500 transition-colors">Back</button>
                 <button type="submit" disabled={isLoading} className="w-1/2 ml-2 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-500 transition-colors disabled:bg-gray-500">
                    {isLoading ? 'Registering...' : 'Complete Registration'}
                </button>
              </div>
            </div>
          )}
        </form>
        <p className="text-center text-text-secondary mt-8">
          Already have an account? <Link to="/login" className="text-primary-light font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
