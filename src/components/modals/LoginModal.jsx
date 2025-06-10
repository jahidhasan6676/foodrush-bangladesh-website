"use client";

import { FaFacebook } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";

export default function LoginModal({ showLoginModal, toggleLoginModal, setIsLogged }) {
    if (!showLoginModal) return null;

    return (
     <div className="fixed inset-0 z-50 bg-gray-50/80 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl w-[400px] max-w-full p-6 relative shadow-lg">
        
        {/* Close button */}
        <button
          onClick={toggleLoginModal}
          className="absolute top-4 right-4 w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center">
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-1">Welcome!</h2>
        <p className=" text-gray-600 mb-8">Sign up or log in to continue</p>

        {/* Social Logins */}
        <button className="bg-[#1877f2] text-white w-full p-2 rounded font-medium mb-3 flex items-center gap-2">
          <FaFacebook className="text-xl" /> <span className="w-full text-center">Continue with Facebook</span>
        </button>

        <button className="border w-full py-2 rounded font-medium mb-3 flex items-center justify-start gap-2 pl-3">
          <FcGoogle className="text-xl" /> <span className="w-full text-center">Continue with Google</span>
        </button>

        {/* <button className="bg-black text-white w-full py-2 rounded font-medium mb-3 flex items-center justify-center gap-2">
          <i className="fab fa-apple"></i> Continue with Apple
        </button> */}

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Log in and Sign up */}
        <button className="bg-[#e60073] hover:bg-[#c01762] text-white w-full py-2 rounded font-semibold mb-3">
          Log in
        </button>
        <button className="border border-gray-400 hover:border-[#f2d0e0] hover:bg-[#f2d0e0] w-full py-2 rounded font-semibold">
          Sign up
        </button>

        {/* Terms & Privacy */}
        <p className="text-center text-xs text-gray-500 mt-4">
          By signing up, you agree to our <span className="text-[#e60073] font-medium cursor-pointer">Terms and Conditions</span> and
          <span className="text-[#e60073] font-medium cursor-pointer"> Privacy Policy</span>.
        </p>
      </div>
    </div>
    );
}