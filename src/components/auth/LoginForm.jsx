"use client"
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {

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
                            <div className="mt-6 ">
                                <button className="bg-[#1877f2] text-white w-full p-2 rounded font-medium mb-3 flex items-center gap-2">
                                    <FaFacebook className="text-xl" /> <span className="w-full text-center">Continue with Facebook</span>
                                </button>

                                <button className="border w-full py-2 rounded font-medium mb-3 flex items-center justify-start gap-2 pl-3">
                                    <FcGoogle className="text-xl" /> <span className="w-full text-center">Continue with Google</span>
                                </button>
                            </div>

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
                        <form className="space-y-4">
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