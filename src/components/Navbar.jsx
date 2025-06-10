"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SiFoodpanda } from "react-icons/si";
import { TfiBag } from "react-icons/tfi";
import { TbWorld } from "react-icons/tb";
import { IoIosArrowDown, IoIosClose, IoIosLogOut, IoIosMenu } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import LoginModal from './modals/LoginModal';
import { IoHelpCircleOutline } from "react-icons/io5";
import { LiaClipboardListSolid } from "react-icons/lia";


export default function Navbar() {
    const [isLogged, setIsLogged] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleDropdown = () => setShowDropdown(!showDropdown);
    const toggleLoginModal = () => setShowLoginModal(!showLoginModal);
    const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

    const handleLogout = () => {
        setIsLogged(false);
        setShowDropdown(false);
    };

    return (
        <>
            <nav className="bg-white shadow-sm py-4 sticky top-0 z-40">
                <div className="w-11/12 mx-auto flex justify-between items-center">
                    {/* Mobile menu button - only visible on small screens */}
                    <div className="lg:hidden flex items-center">
                        {
                            isLogged ?
                                <>
                                    <button onClick={toggleMobileMenu} className="text-gray-700">
                                        <FaRegUser size={24} />
                                    </button>
                                </> :
                                <>
                                    <button onClick={toggleLoginModal} className="text-gray-700">
                                        <FaRegUser size={24} />
                                    </button>
                                </>
                        }
                    </div>

                    {/* Center - Logo - on mobile this will be centered */}
                    <div className="flex justify-center items-center gap-2 mx-auto lg:mx-0">
                        <div className='border border-[#ff2b85] p-[2px] rounded-full'>
                            <Image src="/foodpanda.png" alt='foodpanda pic' width={24} height={24} />
                        </div>
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
                        <button className="bg-gray-100 p-[8px] rounded-full text-gray-600 relative transition-colors">
                            <TfiBag />
                            <span className="absolute -top-0 right-1 text-xs font-bold rounded-full flex items-center justify-center">
                                0
                            </span>
                        </button>

                        {isLogged ? (
                            <>
                                <div className='flex items-center gap-1 relative'>
                                    <button onClick={toggleDropdown} className="hidden lg:flex items-center gap-1">
                                        <p className='text-xl'> <FaRegUser /> </p>
                                        <div className='hidden lg:flex items-center'>
                                            <h2 className='font-medium'>Winifred</h2>
                                            <p className='text-xl text-[#e21b70]'> <IoIosArrowDown /> </p>
                                        </div>
                                    </button>

                                    {/* Dropdown menu */}
                                    {showDropdown && (
                                        <div className=" absolute right-0 top-full mt-[15px] w-64 bg-white rounded-md shadow-lg z-50 p-4">

                                            <Link href="/profile"><div className="flex items-center gap-3 hover:bg-gray-100 py-3 px-4 rounded-md font-medium text-gray-700">
                                                <LiaClipboardListSolid className="w-[18px] h-[18px]" />
                                                Orders & reordering
                                            </div>
                                            </Link>
                                            <Link href="/profile"><div className="flex items-center gap-3 hover:bg-gray-100 py-3 px-4 rounded-md font-medium text-gray-700">
                                                <FaRegUser className="w-[18px] h-[18px]" />
                                                Profile
                                            </div>
                                            </Link>
                                            <hr className='text-gray-200/70' />
                                            <Link href="/profile"><div className="flex items-center gap-3 hover:bg-gray-100 py-3 px-4 rounded-md font-medium text-gray-700">
                                                <IoHelpCircleOutline className="w-[18px] h-[18px]" />
                                                Help Center
                                            </div>
                                            </Link>

                                            <button className="flex items-center justify-between gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 w-full"><div className="flex items-center gap-2 font-medium text-gray-700">
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
                                <button
                                    onClick={toggleLoginModal}
                                    className="hidden lg:block hover:text-[#ff2e87] font-medium">
                                    Login
                                </button>

                                {/* Sign Up button - hidden on mobile */}
                                <button
                                    onClick={toggleLoginModal}
                                    className="hidden lg:block bg-[#e21b70] hover:bg-[#c01762] text-white px-4 py-2 rounded-md font-medium transition-colors">
                                    Sign Up for free delivery
                                </button>

                                {/* User icon for mobile when not logged in */}
                                {/* <button 
                                    onClick={toggleLoginModal}
                                    className="hidden lg:block text-xl text-gray-700">
                                    <FaRegUser />
                                </button> */}
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            {showMobileMenu && (
                <div className="lg:hidden fixed inset-0 z-40  bg-opacity-50">
                    <div className="fixed inset-y-0 left-0 w-full bg-white shadow-lg">
                        <div className="w-11/12 mx-auto py-3">
                            <div className="flex justify-end items-center gap-2" onClick={toggleMobileMenu}>
                                <IoIosClose className='text-3xl' />
                            </div>
                        </div>
                        <div className="w-11/12 mx-auto mt-[20px]">

                            <nav className="flex flex-col">
                                <Link href="/profile"><div className="flex items-center gap-3 hover:bg-gray-100 py-3 px-4 rounded-md font-medium text-gray-700">
                                    <LiaClipboardListSolid className="w-[18px] h-[18px]" />
                                    Orders & reordering
                                </div>
                                </Link>
                                <Link href="/profile"><div className="flex items-center gap-3 hover:bg-gray-100 py-3 px-4 rounded-md font-medium text-gray-700">
                                    <FaRegUser className="w-[18px] h-[18px]" />
                                    Profile
                                </div>
                                </Link>
                                <hr className='text-gray-200/70' />
                                <Link href="/profile"><div className="flex items-center gap-3 hover:bg-gray-100 py-3 px-4 rounded-md font-medium text-gray-700">
                                    <IoHelpCircleOutline className="w-[18px] h-[18px]" />
                                    Help Center
                                </div>
                                </Link>

                                <button className="flex items-center justify-between gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 w-full"><div className="flex items-center gap-2 font-medium text-gray-700">
                                    <IoIosLogOut className="w-[18px] h-[18px]" />
                                    LogOut
                                </div>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}

            {/* Login Modal */}
            <LoginModal
                showLoginModal={showLoginModal}
                toggleLoginModal={toggleLoginModal}
                setIsLogged={setIsLogged}
            />
        </>
    );
}