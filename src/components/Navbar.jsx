"use client";
import Link from 'next/link';
import { useState } from 'react';
import { TfiBag } from "react-icons/tfi";
import { TbWorld } from "react-icons/tb";
import { IoIosArrowDown, IoIosClose, IoIosLogOut, IoIosMenu } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { IoHelpCircleOutline } from "react-icons/io5";
import { LiaClipboardListSolid } from "react-icons/lia";
import { signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import useRole from './client-hooks/useRole';
import useCart from './client-hooks/useCart';


export default function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const { role } = useRole();
    const { carts } = useCart();
    //console.log("user:", session)

    const handleLogout = () => {
        signOut({ redirect: false });
        router.push("/login")
    }

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    if (pathname.startsWith("/dashboard")) return null;

    return (
        <>
            <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
                <div className="w-11/12 mx-auto flex justify-between items-center">
                    {/* Center - Logo - on mobile this will be centered */}
                    <div className="flex items-center gap-2">
                        <div className="text-2xl font-semibold md:font-bold text-[#ff2e87]">
                            FoodRush
                        </div>
                    </div>

                    {/* Right side - Navigation items */}
                    <div className="flex items-center space-x-4 lg:space-x-6">
                        {/* Language selector - hidden on mobile */}
                        <button className="hidden lg:flex transition-colors items-center gap-1">
                            <TbWorld className='text-xl' /> <span className='font-medium'>BN</span>
                        </button>

                        {/* Cart icon */}
                        <Link href={"/cart"}>
                            <button className="bg-gray-100 cursor-pointer p-[8px] rounded-full text-gray-600 relative transition-colors">
                                <TfiBag />
                                <span className="absolute -top-0 right-1 text-xs font-bold rounded-full flex items-center justify-center">
                                    {carts?.length || 0}
                                </span>
                            </button>
                        </Link>

                        {session?.user?.email ? (
                            <>
                                <div className='flex items-center gap-1 relative'>
                                    <button onClick={toggleDropdown} className="flex items-center gap-1">
                                        <p className='text-xl'> <FaRegUser /> </p>
                                        <div className='flex items-center'>
                                            <h2 className='font-medium'>Winifred</h2>
                                            <p className='text-xl text-[#e21b70]'> <IoIosArrowDown /> </p>
                                        </div>
                                    </button>

                                    {/* Dropdown menu */}
                                    {showDropdown && (
                                        <div className=" absolute right-0 top-full mt-[17px] w-64 bg-white rounded-sm border-none shadow-sm z-50 p-4">

                                            <Link href="/"><div className="flex items-center gap-3 hover:bg-gray-100 py-3 px-4 rounded-md font-medium text-gray-700">
                                                <FaRegUser className="w-[18px] h-[18px]" />
                                                Home
                                            </div>
                                            </Link>

                                            {role.role === "customer" && <Link href="/userProfile"><div className="flex items-center gap-3 hover:bg-gray-100 py-3 px-4 rounded-md font-medium text-gray-700">
                                                <FaRegUser className="w-[18px] h-[18px]" />
                                                Profile
                                            </div>
                                            </Link>}

                                            {role.role === "customer" && <Link href="/subscribe"><div className="flex items-center gap-3 hover:bg-gray-100 py-3 px-4 rounded-md font-medium text-gray-700">
                                                <FaRegUser className="w-[18px] h-[18px]" />
                                                Subscribe
                                            </div>
                                            </Link>}

                                            {role.role === "customer" && <Link href="/profile"><div className="flex items-center gap-3 hover:bg-gray-100 py-3 px-4 rounded-md font-medium text-gray-700">
                                                <LiaClipboardListSolid className="w-[18px] h-[18px]" />
                                                My Orders
                                            </div>
                                            </Link>}

                                            {role.role === "customer" && <Link href="/wallet"><div className="flex items-center gap-3 hover:bg-gray-100 py-3 px-4 rounded-md font-medium text-gray-700">
                                                <LiaClipboardListSolid className="w-[18px] h-[18px]" />
                                                Wallet
                                            </div>
                                            </Link>}

                                            {role.role !== "customer" && <Link href="/dashboard"><div className="flex items-center gap-3 hover:bg-gray-100 py-3 px-4 rounded-md font-medium text-gray-700">
                                                <FaRegUser className="w-[18px] h-[18px]" />
                                                Dashboard
                                            </div>
                                            </Link>}
                                            <hr className='text-gray-200/70' />
                                            <Link href="/helpCenter"><div className="flex items-center gap-3 hover:bg-gray-100 py-3 px-4 rounded-md font-medium text-gray-700">
                                                <IoHelpCircleOutline className="w-[18px] h-[18px]" />
                                                Help Center
                                            </div>
                                            </Link>

                                            <button onClick={handleLogout} className="flex items-center justify-between gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 w-full"><div className="flex items-center gap-2 font-medium text-gray-700">
                                                <IoIosLogOut className="w-[18px] h-[18px]" />
                                                LogOut
                                            </div>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Login button - hidden on mobile */}
                                <Link href="/login"><button
                                    // onClick={toggleLoginModal}
                                    className="border border-[#e21b70] hover:bg-[#e4cbd6] h-[35px] lg:h-[40px] px-4 rounded-md text-[#ff2e87] font-medium">
                                    Sign in
                                </button></Link>

                                {/* Sign Up button - hidden on mobile */}
                                <Link href="signup"><button
                                    // onClick={toggleLoginModal}
                                    className="hidden lg:block bg-[#e21b70] hover:bg-[#c01762] text-white px-4 py-2 rounded-md font-medium transition-colors">
                                    Sign Up for free delivery
                                </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}