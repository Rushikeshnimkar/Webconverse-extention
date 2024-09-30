import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useDiscussion } from '../contexts/DiscussionContext';
import { motion } from 'framer-motion';

function Home() {
  const { user } = useAuth();
  const { currentWebsite } = useDiscussion();
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="Home min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white p-4">
      <motion.h1 
        className="text-5xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        WebConverse
      </motion.h1>
      
      <motion.div 
        className="content-area bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {user ? (
          <div className="space-y-4">
            <motion.p 
              className="text-xl font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Welcome, {user.email}
            </motion.p>
           
            <motion.button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/discussion')}
            >
              Go to Discussion
            </motion.button>
          </div>
        ) : (
          <div className="space-y-4">
            {showWelcome && (
              <motion.p 
                className="text-xl font-semibold text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Join the conversation!
              </motion.p>
            )}
            <p className="text-center text-gray-600">
              WebConverse allows you to discuss any website with other users in real-time.
            </p>
            <motion.img
              src="https://source.unsplash.com/random/400x200/?conversation"
              alt="Conversation"
              className="w-full h-40 object-cover rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
            <motion.button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/auth')}
            >
              Get Started
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Home;