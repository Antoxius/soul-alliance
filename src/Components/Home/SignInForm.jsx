import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import ForgotPassword from './ForgotPassword';

const signInSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must not exceed 50 characters'),
});

export default function SignInForm({ signInMessage, onSubmit }) {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSignInSubmit = (data) => {
    onSubmit(data, reset);
  };

  return (
    <div className="bg-black/80 border border-gray-700 p-4 md:p-6">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4 tracking-wider">
        SIGN IN
      </h2>

      {signInMessage.text && (
        <div className={`mb-3 md:mb-4 p-2 md:p-3 border rounded text-xs md:text-sm ${
          signInMessage.type === 'error'
            ? 'bg-red-900/50 border-red-700 text-red-300'
            : 'bg-green-900/50 border-green-700 text-green-300'
        }`}>
          {signInMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSignInSubmit)} className="space-y-3 md:space-y-4">
        <div>
          <label className="block text-gray-300 mb-1 md:mb-2 text-xs md:text-sm">Username</label>
          <input
            type="text"
            {...register('username')}
            className="w-full bg-transparent border border-gray-600 text-white px-3 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:border-[#8B3A3A]"
            placeholder="Enter username"
          />
          {errors.username && (
            <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 mb-1 md:mb-2 text-xs md:text-sm">Password</label>
          <input
            type="password"
            {...register('password')}
            className="w-full bg-transparent border border-gray-600 text-white px-3 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:border-[#8B3A3A]"
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#8B3A3A] hover:bg-[#6B2A2A] text-white font-bold py-2 md:py-3 px-4 md:px-6 tracking-wider transition-colors text-sm md:text-base"
        >
          SIGN IN
        </button>

        <button
          type="button"
          onClick={() => setShowForgotPassword(true)}
          className="w-full text-gray-400 hover:text-white text-xs md:text-sm transition-colors"
        >
          Forgot password?
        </button>
      </form>

      {/* Forgot Password Modal */}
      {showForgotPassword && <ForgotPassword onClose={() => setShowForgotPassword(false)} />}
    </div>
  );
}
