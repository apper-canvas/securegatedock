import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { getIcon } from '../utils/iconUtils';

// Icons
const UserIcon = getIcon('user');
const MailIcon = getIcon('mail');
const LockIcon = getIcon('lock');
const EyeIcon = getIcon('eye');
const EyeOffIcon = getIcon('eye-off');
const ArrowRightIcon = getIcon('arrow-right');
const CheckCircleIcon = getIcon('check-circle');
const AlertTriangleIcon = getIcon('alert-triangle');
const RefreshCwIcon = getIcon('refresh-cw');
const InfoIcon = getIcon('info');
const HelpCircleIcon = getIcon('help-circle');

function MainFeature({ showHelp }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordMessage, setPasswordMessage] = useState('');

  // Reset form when auth mode changes
  useEffect(() => {
    setFormData({
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
    setShowPassword(false);
    setIsSubmitting(false);
  }, [authMode]);

  // Validate form on input change
  useEffect(() => {
    validateForm();
  }, [formData]);

  // Password strength calculator
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength(0);
      setPasswordMessage('');
      return;
    }

    // Calculate password strength
    let strength = 0;
    const password = formData.password;

    // Length check
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    // Check for common patterns that weaken passwords
    if (/^[a-zA-Z]+\d+$/.test(password) || /^\d+[a-zA-Z]+$/.test(password)) strength -= 1;
    // Set the final strength (0-5 scale)
    const normalizedStrength = Math.min(5, strength);
    // Check for common patterns that weaken passwords
    if (/^[a-zA-Z]+\d+$/.test(password) || /^\d+[a-zA-Z]+$/.test(password)) strength -= 1;
    
    // Set the final strength (0-5 scale)
    const normalizedStrength = Math.max(0, Math.min(5, strength));
    setPasswordStrength(normalizedStrength);
    
      'Good',
      'Strong',
      'Very strong'
    ];
    setPasswordMessage(messages[normalizedStrength]);
  }, [formData.password]);

  const resetForm = () => {
    setFormData({
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
    setShowPassword(false);
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Email validation
    if (formData.email.trim() === '') {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Username validation (only for signup)
    if (authMode === 'signup') {
      if (formData.username.trim() === '') {
        newErrors.username = 'Username is required';
        isValid = false;
      } else if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
        isValid = false;
      }
    }

    // Password validation
    if (formData.password === '') {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    // Confirm password (only for signup)
    if (authMode === 'signup') {
      if (formData.confirmPassword === '') {
        newErrors.confirmPassword = 'Please confirm your password';
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        isValid = false;
      }
    }

    setErrors(newErrors);
    setFormValid(isValid);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the form errors before submitting");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(async () => {
      try {
        // Simulate successful authentication
        dispatch(login({
          email: formData.email,
          name: formData.email.split('@')[0]
        }));
        
      if (authMode === 'login') {
          toast.success(`Welcome back, ${formData.email}!`);
      } else {
          toast.success(`Account created for ${formData.email}!`);
      }
      
        resetForm();
        navigate('/training-schedule');
      } catch (error) {
        toast.error('Authentication failed. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  const getPasswordStrengthColor = () => {
    const colors = [
      'bg-red-500', // Very weak
      'bg-orange-500', // Weak
      'bg-yellow-500', // Fair
      'bg-blue-500', // Good
      'bg-green-500', // Strong
      'bg-green-600' // Very strong
    ];
    return colors[passwordStrength] || 'bg-gray-300';
  };

  return (
    <div className="relative overflow-hidden rounded-2xl">      
      {/* Background image from provided URL */}
      <div 
        className="absolute -z-10 top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdECPjuZug4KdJweUmNQ-PkCAlOh9ro9ewNg&s')",
        }}
      >
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-white/20 dark:bg-surface-900/50"></div>
        
        {/* Additional decorative elements */}
        <div className="absolute top-0 left-1/3 w-2/3 h-1/2 bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/3 w-2/3 h-1/2 bg-secondary/20 dark:bg-secondary/10 rounded-full blur-3xl transform translate-y-1/2"></div>
      </div>

      {/* Main card */}
      <motion.div 
        className="card-neu bg-white/70 dark:bg-surface-800/50 p-8 md:p-10 relative z-0 border border-surface-200/50 dark:border-surface-700/50"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Auth mode toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-surface-200 dark:bg-surface-700 rounded-xl">
            <button
              onClick={() => setAuthMode('login')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                authMode === 'login'
                  ? 'bg-white dark:bg-surface-800 shadow-sm text-primary dark:text-primary-light'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                authMode === 'signup'
                  ? 'bg-white dark:bg-surface-800 shadow-sm text-primary dark:text-primary-light'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-dark dark:text-primary-light text-shadow">
            {authMode === 'login' ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mt-2">
            {authMode === 'login'
              ? 'Enter your credentials to access your account'
              : 'Fill out the form below to get started'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="relative group">
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MailIcon className="h-5 w-5 text-surface-500" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`input-field pl-10 ${
                  errors.email ? 'border-red-500 dark:border-red-500' : ''
                }`}
                placeholder="your.email@example.com"
              />
              {showHelp && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="group/tooltip relative">
                    <HelpCircleIcon className="h-5 w-5 text-surface-400" />
                    <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-surface-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-10">
                      Enter your email address. This will be used as your login identifier.
                    </div>
                  </div>
                </div>
              )}
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <AlertTriangleIcon className="h-4 w-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Username Input (only for signup) */}
          <AnimatePresence>
            {authMode === 'signup' && (
              <motion.div
                className="relative group"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="username" className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <UserIcon className="h-5 w-5 text-surface-500" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className={`input-field pl-10 ${
                      errors.username ? 'border-red-500 dark:border-red-500' : ''
                    }`}
                    placeholder="Choose a username"
                  />
                  {showHelp && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="group/tooltip relative">
                        <HelpCircleIcon className="h-5 w-5 text-surface-400" />
                        <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-surface-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-10">
                          Choose a unique username that will identify you in the system.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertTriangleIcon className="h-4 w-4 mr-1" />
                    {errors.username}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Password Input */}
          <div className="relative group">
            <label htmlFor="password" className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <LockIcon className="h-5 w-5 text-surface-500" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className={`input-field pl-10 pr-10 ${
                  errors.password ? 'border-red-500 dark:border-red-500' : ''
                }`}
                placeholder={authMode === 'login' ? 'Enter your password' : 'Create a strong password'}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
              {showHelp && (
                <div className="absolute right-10 top-1/2 -translate-y-1/2">
                  <div className="group/tooltip relative">
                    <HelpCircleIcon className="h-5 w-5 text-surface-400" />
                    <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-surface-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-10">
                      Use a strong password with at least 8 characters, including uppercase, lowercase, numbers, and special characters.
                    </div>
                  </div>
                </div>
              )}
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <AlertTriangleIcon className="h-4 w-4 mr-1" />
                {errors.password}
              </p>
            )}
            
            {/* Password strength meter (only for signup) */}
            <AnimatePresence>
              {authMode === 'signup' && formData.password && (
              <div className="mt-2">
                <div className="w-full h-1.5 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getPasswordStrengthColor()} transition-all duration-300 ease-in-out`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                <div className="mt-1 flex justify-between items-center">
                  <p className="text-xs flex items-center">
                    <InfoIcon className="h-3 w-3 mr-1" />
                    Password strength: <span className={`ml-1 font-medium ${
                      passwordStrength <= 1 ? 'text-red-500' : 
                      passwordStrength === 2 ? 'text-orange-500' :
                      passwordStrength === 3 ? 'text-yellow-500' :
                      passwordStrength === 4 ? 'text-blue-500' :
                      'text-green-500'
                    }`}>{passwordMessage}</span>
                  </p>
                </div>
                
                {/* Password improvement suggestions */}
                {passwordStrength < 3 && formData.password.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-xs p-2 bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg"
                  >
                    <p className="font-medium mb-1 text-surface-700 dark:text-surface-300">Suggestions to improve your password:</p>
                    <ul className="list-disc pl-5 text-surface-600 dark:text-surface-400 space-y-1">
                      {formData.password.length < 8 && <li>Make it at least 8 characters long</li>}
                      {!/[A-Z]/.test(formData.password) && <li>Add uppercase letters</li>}
                      {!/[a-z]/.test(formData.password) && <li>Add lowercase letters</li>}
                      {!/[0-9]/.test(formData.password) && <li>Add numbers</li>}
                      {!/[^A-Za-z0-9]/.test(formData.password) && <li>Add special characters (e.g., !@#$%^&*)</li>}
                    </ul>
                  </motion.div>
                )}
              </div>
              )}
            </AnimatePresence>

            {/* Previous implementation (now replaced with enhanced version above) */}
            {/* {authMode === 'signup' && formData.password && !errors.password && (
              <div className="mt-2">
                <div className="w-full h-1.5 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-xs flex items-center">
                  <InfoIcon className="h-3 w-3 mr-1" />
                  Password strength: <span className="ml-1 font-medium">{passwordMessage}</span>
                </p>
              </div>
            )} */}
          </div>

          {/* Confirm Password Input (only for signup) */}
          <AnimatePresence>
            {authMode === 'signup' && (
              <motion.div
                className="relative group"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <LockIcon className="h-5 w-5 text-surface-500" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`input-field pl-10 ${
                      errors.confirmPassword ? 'border-red-500 dark:border-red-500' : ''
                    }`}
                    placeholder="Re-enter your password"
                  />
                  {showHelp && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="group/tooltip relative">
                        <HelpCircleIcon className="h-5 w-5 text-surface-400" />
                        <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-surface-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-10">
                          Re-enter your password to confirm it was typed correctly.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertTriangleIcon className="h-4 w-4 mr-1" />
                    {errors.confirmPassword}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full btn-primary py-3 flex items-center justify-center space-x-2 ${
                isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <RefreshCwIcon className="h-5 w-5 animate-spin" />
                  <span>{authMode === 'login' ? 'Logging in...' : 'Creating account...'}</span>
                </>
              ) : (
                <>
                  <span>{authMode === 'login' ? 'Log in' : 'Create Account'}</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </>
              )}
            </button>
          </div>

          {/* Switch auth mode link */}
          <div className="text-center mt-6">
            <button 
              type="button"
              onClick={switchAuthMode}
              className="text-primary dark:text-primary-light hover:underline text-sm font-medium"
            >
              {authMode === 'login'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Log in'}
            </button>
          </div>
        </form>

        {/* Form features message */}
        <div className="mt-8 border-t border-surface-200 dark:border-surface-700 pt-6">
          <p className="text-sm text-surface-600 dark:text-surface-400 flex items-start">
            <InfoIcon className="h-5 w-5 mr-2 mt-0.5 text-primary flex-shrink-0" />
            <span>
              This is a demo interface showcasing form validation, responsive design, and
              interactive elements. No actual authentication is performed.
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Add text shadow utility class for better readability against background image
const style = document.createElement('style');
style.textContent = `
  .text-shadow {
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
  }
  .dark .text-shadow {
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  }
`;
document.head.appendChild(style);

export default MainFeature;