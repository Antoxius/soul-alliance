import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Zod validation schema
const profileSchema = z.object({
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

export default function CreateProfileForm({ formMessage, onSubmit }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const handleFormSubmit = (data) => {
    onSubmit(data, reset);
  };

  return (
    <div className="bg-black/80 border border-gray-700 p-4 md:p-6 lg:p-8">
      <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 tracking-wider">
        CREATE PROFILE
      </h3>
      
      {/* Success/Error Message */}
      {formMessage.text && (
        <div className={`mb-4 p-3 rounded text-sm ${
          formMessage.type === 'success' 
            ? 'bg-green-900/50 border border-green-700 text-green-300' 
            : 'bg-red-900/50 border border-red-700 text-red-300'
        }`}>
          {formMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3 md:space-y-4">
        <div>
          <label className="block text-gray-300 mb-1 md:mb-2 text-xs md:text-sm">Username</label>
          <input
            type="text"
            {...register('username', { 
              required: 'Username is required',
              minLength: { value: 3, message: 'Username must be at least 3 characters' }
            })}
            className="w-full bg-transparent border border-gray-600 text-white px-3 py-2 md:px-4 md:py-3 text-sm md:text-base focus:outline-none focus:border-[#8B3A3A]"
            placeholder="Enter username"
          />
          {errors.username && (
            <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-gray-300 mb-1 md:mb-2 text-xs md:text-sm">Email</label>
          <input
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className="w-full bg-transparent border border-gray-600 text-white px-3 py-2 md:px-4 md:py-3 text-sm md:text-base focus:outline-none focus:border-[#8B3A3A]"
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-gray-300 mb-1 md:mb-2 text-xs md:text-sm">Password</label>
          <input
            type="password"
            {...register('password', { 
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
            className="w-full bg-transparent border border-gray-600 text-white px-3 py-2 md:px-4 md:py-3 text-sm md:text-base focus:outline-none focus:border-[#8B3A3A]"
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>
        
        <button 
          type="submit"
          className="w-full bg-[#8B3A3A] hover:bg-[#A04444] text-white font-bold py-2 md:py-3 text-sm md:text-base tracking-wider transition-colors"
        >
          CREATE
        </button>
      </form>
    </div>
  );
}
