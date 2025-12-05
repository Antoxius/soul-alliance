import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

export default function Contact() {
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (data) => {
    // Simulate form submission
    console.log('Contact form submitted:', data);
    setSubmitMessage({ 
      type: 'success', 
      text: 'Thank you for your message! We will get back to you soon.' 
    });
    reset();
    
    // Clear message after 5 seconds
    setTimeout(() => setSubmitMessage({ type: '', text: '' }), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wider mb-4 text-white">
            CONTACT US
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Have questions or want to join our community? Reach out to us!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="bg-black/80 border border-gray-700 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-wider">GET IN TOUCH</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-red-700 text-2xl">📧</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <p className="text-gray-400">Antoxiusalfa@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-red-700 text-2xl">💬</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Discord</h3>
                  <p className="text-gray-400">Join our community server</p>
                  <a href="#" className="text-red-700 hover:text-red-600 transition-colors">https://discord.gg/PmaJPDryEU</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-red-700 text-2xl">🎮</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Gaming Hours</h3>
                  <p className="text-gray-400">Friday - Sunday</p>
                  <p className="text-gray-400">6:00 PM - 12:00 AM EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-red-700 text-2xl">🌐</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Social Media</h3>
                  <div className="flex gap-4 mt-2">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">YouTube</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitch</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-black/80 border border-gray-700 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-wider">SEND MESSAGE</h2>
            
            {submitMessage.text && (
              <div className={`mb-4 p-3 border ${
                submitMessage.type === 'success' 
                  ? 'bg-green-900/30 border-green-700 text-green-400' 
                  : 'bg-red-900/30 border-red-700 text-red-400'
              }`}>
                {submitMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2 tracking-wide">NAME</label>
                <input
                  {...register('name')}
                  type="text"
                  className="w-full bg-gray-900 border border-gray-700 px-4 py-3 text-white focus:border-red-700 focus:outline-none"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 tracking-wide">EMAIL</label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full bg-gray-900 border border-gray-700 px-4 py-3 text-white focus:border-red-700 focus:outline-none"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 tracking-wide">SUBJECT</label>
                <input
                  {...register('subject')}
                  type="text"
                  className="w-full bg-gray-900 border border-gray-700 px-4 py-3 text-white focus:border-red-700 focus:outline-none"
                  placeholder="What is this about?"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 tracking-wide">MESSAGE</label>
                <textarea
                  {...register('message')}
                  rows="5"
                  className="w-full bg-gray-900 border border-gray-700 px-4 py-3 text-white focus:border-red-700 focus:outline-none resize-none"
                  placeholder="Your message..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-6 tracking-wider transition-colors"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-16 bg-black/80 border border-gray-700 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-wider text-center">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2 text-red-700">How do I join the clan?</h3>
              <p className="text-gray-400">Join our Discord server to connect with the community and participate in clan activities!</p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2 text-red-700">Do I need to be highly skilled?</h3>
              <p className="text-gray-400">Not at all! We welcome players of all skill levels. Our community is about having fun and improving together.</p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2 text-red-700">Is there an age requirement?</h3>
              <p className="text-gray-400">We recommend members be 16+ due to mature game content, but ultimately it's up to parental discretion.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}