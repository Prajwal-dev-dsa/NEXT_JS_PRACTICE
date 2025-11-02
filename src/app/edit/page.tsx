"use client";

import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import Image from 'next/image';

export default function EditProfile() {
    const imageRef = useRef<HTMLInputElement>(null)
    const [name, setName] = useState('')
    const [frontendImage, setFrontendImage] = useState('')
    const [backendImage, setBackendImage] = useState<File>()

    const { data: session } = useSession()

    useEffect(() => {
        if (session) {
            setName(session.user.name as string)
            setFrontendImage(session.user.image as string)
        }
    }, [session])

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return
        setBackendImage(e.target.files[0])
        setFrontendImage(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
            <div className="relative bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md">

                <Link
                    href="/"
                    className="absolute top-4 left-4 text-gray-400 hover:text-white"
                    aria-label="Back to home"
                >
                    <IoArrowBack size={24} />
                </Link>

                <h2 className="text-3xl font-bold text-center text-white mb-6">
                    Update Profile
                </h2>

                <form className="space-y-6">
                    <div onClick={() => imageRef.current?.click()}>
                        {
                            frontendImage ? (
                                <Image
                                    src={frontendImage}
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
                        <input
                            type="file"
                            hidden
                            ref={imageRef}
                            accept='image/*'
                            onChange={(e) => handleImage(e)}
                        />
                    </div>
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
                            defaultValue={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
    );
}