"use client"; // We need this for useState

import { useState } from 'react';
import { FaPencilAlt, FaTimes, FaUser } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const { data: session } = useSession()
  console.log(session)
  const [isEditing, setIsEditing] = useState(false);

  const user = {
    name: session?.user?.name,
    image: session?.user?.image
  };

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="relative min-h-screen bg-slate-900 text-white p-4">

      {/* 1. Edit Icon (Top Right) */}
      <button
        onClick={() => setIsEditing(true)}
        className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
        aria-label="Edit user details"
      >
        <FaPencilAlt size={24} />
      </button>

      {/* 2. Welcome Box (Centered) */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-sm text-center">

          {/* User Image */}
          {
            user?.image ? (
              <Image
                src={user?.image!}
                alt="User Avatar"
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-500"
                width={128}
                height={128}
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center rounded-full mx-auto mb-4 border-4 border-indigo-500">
                <FaUser size={72} />
              </div>
            )
          }

          {/* Welcome Text */}
          <h2 className="text-2xl font-bold text-white mb-6">
            Welcome, {user?.name!}
          </h2>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            type="button"
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <FiLogOut className="mr-2" />
            Sign Out
          </button>
        </div>
      </div>

      {/* 3. Edit Modal (Conditionally Rendered) */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">

          {/* Modal Content */}
          <div className="relative bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md">

            {/* Close Button */}
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              aria-label="Close modal"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-3xl font-bold text-center text-white mb-6">
              Update Profile
            </h2>

            {/* Update Form */}
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  defaultValue={user?.name!}
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-300"
                >
                  Image URL
                </label>
                <input
                  type="text"
                  id="image"
                  defaultValue={user?.image!}
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Leave blank to keep unchanged"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}