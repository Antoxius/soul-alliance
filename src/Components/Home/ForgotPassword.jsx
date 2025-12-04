import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const forgotPasswordSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .min(5, 'Email must be at least 5 characters'),
});

export default function ForgotPassword({ onClose }) {
  const [message, setMessage] = useState({ type: '', text: '' });
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    setMessage({ type: '', text: '' });

    // Get stored users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('darkWarUsers') || '[]');
    
    // Check if email exists
    const user = storedUsers.find(u => u.email === data.email);

    if (user) {
      try {
        // Generate reset token
        const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const resetLink = `${window.location.origin}/reset-password?token=${resetToken}`;
        
        // Store reset token with expiration (1 hour)
        const resetData = {
          email: data.email,
          token: resetToken,
          expiresAt: new Date(Date.now() + 3600000).toISOString()
        };
        localStorage.setItem('passwordReset_' + resetToken, JSON.stringify(resetData));
        
        // Send email via backend API
        const response = await fetch('http://localhost:3001/api/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            resetToken: resetToken,
            resetLink: resetLink
          })
        });

        const result = await response.json();

        if (result.success) {
          setMessage({ 
            type: 'success', 
            text: `Password reset link has been sent to ${data.email}! Check your inbox.` 
          });
          
          reset();
          
          setTimeout(() => {
            onClose();
          }, 4000);
        } else {
          setMessage({ 
            type: 'error', 
            text: 'Failed to send email. Please try again later.' 
          });
        }
      } catch (error) {
        console.error('Error sending reset email:', error);
        setMessage({ 
          type: 'error', 
          text: 'Server error. Please make sure the backend server is running.' 
        });
      }
    } else {
      setMessage({ 
        type: 'error', 
        text: "This email isn't registered to an account" 
      });
    }
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

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wider">
          FORGOT PASSWORD
        </h2>

        <p className="text-gray-400 text-sm mb-6">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {/* Message */}
        {message.text && (
          <div className={`mb-4 p-3 border rounded text-sm ${
            message.type === 'error'
              ? 'bg-red-900/50 border-red-700 text-red-300'
              : 'bg-green-900/50 border-green-700 text-green-300'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2 text-sm">Email Address</label>
            <input
              type="email"
              {...register('email')}
              className="w-full bg-transparent border border-gray-600 text-white px-4 py-3 focus:outline-none focus:border-[#8B3A3A]"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#8B3A3A] hover:bg-[#6B2A2A] text-white font-bold py-3 px-6 tracking-wider transition-colors"
          >
            SEND RESET LINK
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full bg-transparent border border-gray-600 hover:border-gray-400 text-gray-300 font-bold py-3 px-6 tracking-wider transition-colors"
          >
            CANCEL
          </button>
        </form>
      </div>
    </div>
  );
}
