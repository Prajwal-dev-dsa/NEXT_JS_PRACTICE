"use client";

import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", { name, email, password });
      console.log(res.data);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create Account
        </h2>

        {/* Register Form */}
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center justify-center">
          <span className="bg-gray-600 h-px w-full"></span>
          <span className="px-3 text-gray-400">OR</span>
          <span className="bg-gray-600 h-px w-full"></span>
        </div>

        {/* Google Sign-in Button */}
        <div>
          <button
            type="button"
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FcGoogle className="h-5 w-5 mr-2" />
            Sign up with Google
          </button>
        </div>

        {/* Switch to Sign In */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}