"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignUpForm() {
    const [error,setError] = useState("");
    const router = useRouter();

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        
        const loginData = {
            name,
            email,
            password
        }
        console.log(loginData)

        if(!name || !email || !password){
            setError("All fields are necessary.");
            return;
        }

        try{
            const response = await axios.post("api/register", loginData);

            if(response.status === 200 || response.status === 201){
                form.reset();
                setError("");
                router.push("/login")
            }else{
                console.log("User registration failed")
            }
        }catch(error){
            console.log("Error during registration:", error)
            toast.error(`${error?.response?.data?.error}`)
        }

        
    }


    return (
        <>
            <div className=" bg-gray-50 flex flex-col justify-center py-10">
                <div className=" sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4">
                            <h2 className=" text-center text-3xl font-semibold text-gray-900">
                                Sign Up
                            </h2>
                            <h5 className='text-center text-lg text-gray-600 mt-1'>Sign up into your account from here</h5>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name 
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="name"
                                        name="name"
                                        type="name"
                                        placeholder="Full Name"
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#ff2e87]" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email 
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter Email"
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#ff2e87]" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="123456"
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#ff2e87]" />
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="acceptTerms"
                                        name="acceptTerms"
                                        type="checkbox"
                                        className="focus:ring-orange-500 h-4 w-4 text-[#ff2e87] border-gray-300 rounded"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="acceptTerms" className="font-medium text-gray-700">
                                        I agree to the{' '}
                                        <a href="#" className="text-[#ff2e87]">
                                            Terms of Service
                                        </a>{' '}
                                        and{' '}
                                        <a href="#" className="text-[#ff2e87]">
                                            Privacy Policy
                                        </a>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-[#e21b70] hover:bg-[#c01762] focus:outline-none">
                                    Create account
                                </button>
                            </div>
                        </form>
                        {error &&(
                            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                                {error}
                            </div>
                        )}
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <a
                                href="/login"
                                className="font-medium cursor-pointer text-[#ff2e87]">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}