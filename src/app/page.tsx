"use client";
import { FaPencilAlt, FaUser } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { userDataContext } from '@/context/UserContext';

export default function Home() {
  const router = useRouter()
  const data = useContext(userDataContext)
  console.log(data)
  let user = {
    name: data?.user?.user?.name,
    image: data?.user?.user?.image
  };
  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (data) {
      user = {
        name: data?.user?.user?.name,
        image: data?.user?.user?.image
      };
    }
  }, [data])

  return (
    <div className="relative min-h-screen bg-slate-900 text-white p-4">

      <button
        onClick={() => router.push("/edit")}
        className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
        aria-label="Edit user details"
      >
        <FaPencilAlt size={24} />
      </button>

      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-sm text-center">

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

          <h2 className="text-2xl font-bold text-white mb-6">
            Welcome, {user?.name!}
          </h2>
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
    </div>
  );
}