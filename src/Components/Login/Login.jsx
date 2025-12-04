import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

// Zod validation schemas
const loginSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must not exceed 50 characters'),
});

const registerSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string()
    .email('Invalid email address')
    .min(5, 'Email must be at least 5 characters'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must not exceed 50 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export default function Login({ onClose }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(isRegistering ? registerSchema : loginSchema),
  });

  // Handle Login
  const onLoginSubmit = (data) => {
    setLoginError('');
    setSuccessMessage('');

    // Get stored users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('darkWarUsers') || '[]');
    
    // Find user with matching credentials
    const user = storedUsers.find(
      u => u.username === data.username && u.password === data.password
    );

    if (user) {
      // Save logged-in user to localStorage
      localStorage.setItem('darkWarCurrentUser', JSON.stringify({
        username: user.username,
        email: user.email,
        loggedInAt: new Date().toISOString()
      }));
      
      setSuccessMessage('Login successful!');
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      setLoginError('Invalid username or password');
    }
  };

  // Handle Registration
  const onRegisterSubmit = (data) => {
    setLoginError('');
    setSuccessMessage('');

    // Get existing users
    const storedUsers = JSON.parse(localStorage.getItem('darkWarUsers') || '[]');
    
    // Check if username already exists
    if (storedUsers.some(u => u.username === data.username)) {
      setLoginError('Username already exists');
      return;
    }

    // Check if email already exists
    if (storedUsers.some(u => u.email === data.email)) {
      setLoginError('Email already registered');
      return;
    }

    // Add new user
    const newUser = {
      username: data.username,
      email: data.email,
      password: data.password,
      createdAt: new Date().toISOString()
    };

    storedUsers.push(newUser);
    localStorage.setItem('darkWarUsers', JSON.stringify(storedUsers));
    
    setSuccessMessage('Account created successfully! You can now log in.');
    reset();
    setTimeout(() => {
      setIsRegistering(false);
      setSuccessMessage('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-black/95 border border-gray-700 p-6 md:p-8 rounded w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          ×
        </button>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-wider">
          {isRegistering ? 'CREATE ACCOUNT' : 'LOG IN'}
        </h2>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-900/50 border border-green-700 text-green-300 rounded text-sm">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {loginError && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-700 text-red-300 rounded text-sm">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit(isRegistering ? onRegisterSubmit : onLoginSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm">Username</label>
            <input
              type="text"
              {...register('username', { 
                required: 'Username is required',
                minLength: { value: 3, message: 'Username must be at least 3 characters' }
              })}
              className="w-full bg-transparent border border-gray-600 text-white px-4 py-3 focus:outline-none focus:border-[#8B3A3A]"
              placeholder="Enter username"
            />
            {errors.username && (
              <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email (only for registration) */}
          {isRegistering && (
            <div>
              <label className="block text-gray-300 mb-2 text-sm">Email</label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="w-full bg-transparent border border-gray-600 text-white px-4 py-3 focus:outline-none focus:border-[#8B3A3A]"
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm">Password</label>
            <input
              type="password"
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })}
              className="w-full bg-transparent border border-gray-600 text-white px-4 py-3 focus:outline-none focus:border-[#8B3A3A]"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#8B3A3A] hover:bg-[#A04444] text-white font-bold py-3 tracking-wider transition-colors"
          >
            {isRegistering ? 'CREATE ACCOUNT' : 'LOG IN'}
          </button>
        </form>

        {/* Toggle between login and register */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setLoginError('');
              setSuccessMessage('');
              reset();
            }}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            {isRegistering 
              ? 'Already have an account? Log in' 
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}