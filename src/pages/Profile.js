import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center h-screen bg-gray-100"
      >
        <p className="text-xl font-semibold text-gray-600">Please log in to view your profile.</p>
      </motion.div>
    );
  }

  const robohashUrl = `https://robohash.org/${user.email}?set=set3`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="Profile bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">User Profile</h2>
        </div>
        <div className="p-6">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center mb-6"
          >
            <img
              src={robohashUrl}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-4 border-blue-500 mr-6"
            />
            <div>
              <motion.h3
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-semibold text-gray-800"
              >
                {user.username}
              </motion.h3>
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600"
              >
                {user.role}
              </motion.p>
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-50 p-4 rounded-lg mb-4"
          >
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Contact Information</h4>
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {user.email}
            </p>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-end"
          >
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
              Edit Profile
            </button>
          </motion.div>
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-sm text-gray-500 mt-4"
      >
        Avatar lovingly delivered by <a href="https://robohash.org" className="text-blue-500 hover:underline">Robohash.org</a>
      </motion.p>
    </motion.div>
  );
}

export default Profile;