import React, { useState, useEffect } from "react";
import Login from '../Login/Login';
import HeroTitle from './HeroTitle';
import UserAuthButton from './UserAuthButton';
import CreateProfileForm from './CreateProfileForm';
import SignInForm from './SignInForm';
import UpcomingEvents from './UpcomingEvents';
import ChatSection from './ChatSection';
import { API_URL } from '../../config';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });
  const [signInMessage, setSignInMessage] = useState({ type: '', text: '' });

  // Check if user is logged in on component mount
  useEffect(() => {
    const user = localStorage.getItem('darkWarCurrentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  // Handle Profile Creation
  const onProfileSubmit = async (data, reset) => {
    setFormMessage({ type: '', text: '' });

    // Get existing users
    const storedUsers = JSON.parse(localStorage.getItem('darkWarUsers') || '[]');
    
    // Check if username already exists
    if (storedUsers.some(u => u.username === data.username)) {
      setFormMessage({ type: 'error', text: 'Username already exists' });
      return;
    }

    // Check if email already exists
    if (storedUsers.some(u => u.email === data.email)) {
      setFormMessage({ type: 'error', text: 'Email already registered' });
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
    
    // Send user data to backend to log email
    try {
      await fetch(`${API_URL}/api/register-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      });
    } catch (error) {
      console.error('Error logging user to backend:', error);
      // Continue with registration even if backend logging fails
    }
    
    // Automatically log in the new user
    const loggedInUser = {
      username: newUser.username,
      email: newUser.email,
      loggedInAt: new Date().toISOString()
    };
    localStorage.setItem('darkWarCurrentUser', JSON.stringify(loggedInUser));
    setCurrentUser(loggedInUser);
    
    setFormMessage({ type: 'success', text: `Profile created successfully! Welcome ${newUser.username}!` });
    reset();
    
    setTimeout(() => {
      setFormMessage({ type: '', text: '' });
    }, 3000);
  };

  // Handle Sign In
  const onSignInSubmit = (data, reset) => {
    setSignInMessage({ type: '', text: '' });

    // Get stored users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('darkWarUsers') || '[]');
    
    // Find user with matching credentials
    const user = storedUsers.find(
      u => u.username === data.username && u.password === data.password
    );

    if (user) {
      // Save logged-in user to localStorage
      const loggedInUser = {
        username: user.username,
        email: user.email,
        loggedInAt: new Date().toISOString()
      };
      localStorage.setItem('darkWarCurrentUser', JSON.stringify(loggedInUser));
      setCurrentUser(loggedInUser);
      
      setSignInMessage({ type: 'success', text: `Welcome back, ${user.username}!` });
      reset();
      
      setTimeout(() => {
        setSignInMessage({ type: '', text: '' });
      }, 3000);
    } else {
      setSignInMessage({ type: 'error', text: 'Invalid username or password' });
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('darkWarCurrentUser');
    setCurrentUser(null);
  };

  // Sample events and chat data
  const events = [
    { date: '25', month: 'APR', title: 'BOSS INVASIGN', subtitle: 'BOSS INVASION' },
    { date: '27', month: 'APR', title: 'BASE DEFENSE', subtitle: 'BASE DEFENSE' },
    { date: '02', month: 'MAY', title: 'RESOURCE RAID', subtitle: 'RESOURCE RAID' },
  ];

  const chatMessages = [
    { name: 'Lucas', message: 'Joining the resource raid!', avatar: '/avatars/lucas.jpg' },
    { name: 'Sofia', message: 'We need to meet at the east camp.', avatar: '/avatars/sofia.jpg' },
    { name: 'Jonas', message: 'Almost ready for the invasion.', avatar: '/avatars/jonas.jpg' },
    { name: 'Fredrik', message: "Okay, let's do it.", avatar: '/avatars/fredrik.jpg' },
  ];

  return (
    <div className="min-h-screen bg-cover bg-center relative" 
         style={{ backgroundImage: "url('/Background-image.png')" }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Login Modal */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}

      {/* Main content */}
      <div className="relative z-10 px-4 pt-16 pb-8 md:px-6 md:pt-20 lg:px-8 lg:pt-24 lg:pb-12">
        {/* Title */}
        <HeroTitle />

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 max-w-7xl">
          {/* Create Profile Form */}
          <CreateProfileForm 
            formMessage={formMessage}
            onSubmit={onProfileSubmit}
          />

          {/* Sign In Form */}
          <SignInForm 
            signInMessage={signInMessage}
            onSubmit={onSignInSubmit}
          />

          {/* Upcoming Events */}
          <UpcomingEvents events={events} />

          {/* Chat Section */}
          <ChatSection messages={chatMessages} />
        </div>
      </div>
    </div>
  );
}
