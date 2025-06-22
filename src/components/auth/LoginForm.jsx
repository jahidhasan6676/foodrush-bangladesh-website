"use client";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import SocialLogin from './SocialLogin';

export default function LoginPage() {
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const response = await signIn("credentials", {
                email,
                password,
                callbackUrl: "/",
                redirect: false,
            });

            if (response?.ok) {
                toast.success("Login Success");
                router.push("/");
                form.reset();
            } else {
                toast.error("Authentication failed");
            }
        } catch (error) {
            toast.error(error);
        }
    }

    return (
        <>
            <div className=" bg-gray-50 flex flex-col justify-center items-center py-10">
                <div className=" sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                            <h2 className=" text-center text-3xl font-semibold text-gray-900">
                                Sign in
                            </h2>
                            <h5 className='text-center text-lg text-gray-600 mt-1'>Sign in into your account from here</h5>
                        </div>
                        <div>
                            <SocialLogin />
                            <div className="relative py-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        Or continue with
                                    </span>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder='Enter Email'
                                        required
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-[#ff2e87]" />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder='123456'
                                        required
                                        className=" block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-[#ff2e87]" />
                                </div>
                            </div>
                            <div className="text-end text-sm">
                                <a href="#"
                                    className="font-medium text-[#ff2e87]">
                                    Forgot your password?
                                </a>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e21b70] hover:bg-[#c01762] focus:outline-none`}>
                                    Sign In
                                </button>
                            </div>
                        </form>
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <a href="signup"
                                    className="font-medium text-[#ff2e87]">
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}