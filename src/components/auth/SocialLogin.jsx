"use client";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

const SocialLogin = () => {
    const {data: session, status} = useSession();
    const router = useRouter();
    const handleSocialLogin = (providerName) => {
        signIn(providerName)
    }

    // useEffect(()=>{
    //     if(session?.user && status === "authenticated"){
    //         router.push("/");
    //         toast.success("Successfully Logged IN")
    //     }
    // }, [session,status])
    return (
        <div>
            <div className="mt-6 ">
                <button onClick={() => handleSocialLogin("github")} className="bg-gray-800 text-white w-full p-2 rounded font-medium mb-3 flex items-center gap-2">
                    <FaGithub className="text-xl" /> <span className="w-full text-center">Continue with Github</span>
                </button>

                <button onClick={() => handleSocialLogin("google")} className="border w-full py-2 rounded font-medium mb-3 flex items-center justify-start gap-2 pl-3">
                    <FcGoogle className="text-xl" /> <span className="w-full text-center">Continue with Google</span>
                </button>
            </div>


        </div>
    );
};

export default SocialLogin;