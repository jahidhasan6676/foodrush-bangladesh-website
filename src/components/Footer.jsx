"use client";
import { usePathname } from 'next/navigation';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaAppleAlt, FaGooglePlay } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa6';
import { MdDeliveryDining } from 'react-icons/md';

const Footer = () => {
    const pathname = usePathname();
    if(pathname.startsWith("/dashboard")) return null;
    return (
        <footer className="w-11/12 mx-auto text-gray-700 pt-16 pb-8 border-t border-gray-200 ">
            {/* Main Footer Content */}
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                {/* Brand Column */}
                <div className="space-y-6">
                    <div className="flex items-center">
                        <MdDeliveryDining className="text-3xl text-[#ff2e87]" />
                        <span className="ml-2 text-2xl font-bold text-gray-800">Food<span className="text-[#ff2e87]">Rush</span></span>
                    </div>
                    <p className="text-gray-700 leading-relaxed font-medium">
                        The fastest food delivery service in town. Bringing your favorite meals to your doorstep in record time.
                    </p>

                    {/* Social Media */}
                    <div className="flex space-x-4">
                        <a href="#" className="bg-gray-800 hover:bg-[#ff2e87] text-white p-2 rounded-full transition-colors">
                            <FaFacebookF className="w-4 h-4" />
                        </a>
                        <a href="#" className="bg-gray-800 hover:bg-[#ff2e87] text-white p-2 rounded-full transition-colors">
                            <FaInstagram className="w-4 h-4" />
                        </a>
                        <a href="#" className="bg-gray-800 hover:bg-[#ff2e87] text-white p-2 rounded-full transition-colors">
                            <FaTwitter className="w-4 h-4" />
                        </a>
                        <a href="#" className="bg-gray-800 hover:bg-[#ff2e87] text-white p-2 rounded-full transition-colors">
                            <FaYoutube className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800 uppercase tracking-wider">Quick Links</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:text-[#ff2e87] transition-colors font-medium flex items-center">
                            <span className="w-1 h-1 bg-[#ff2e87] rounded-full mr-2"></span> Home</a></li>
                        <li><a href="#" className="hover:text-[#ff2e87] transition-colors font-medium flex items-center">
                            <span className="w-1 h-1 bg-[#ff2e87] rounded-full mr-2"></span> Restaurants</a></li>
                        <li><a href="#" className="hover:text-[#ff2e87] transition-colors font-medium flex items-center">
                            <span className="w-1 h-1 bg-[#ff2e87] rounded-full mr-2"></span> How It Works</a></li>
                        <li><a href="#" className="hover:text-[#ff2e87] transition-colors font-medium flex items-center">
                            <span className="w-1 h-1 bg-[#ff2e87] rounded-full mr-2"></span> Promotions</a></li>
                        <li><a href="#" className="hover:text-[#ff2e87] transition-colors font-medium flex items-center">
                            <span className="w-1 h-1 bg-[#ff2e87] rounded-full mr-2"></span> Contact Us</a></li>
                    </ul>
                </div>

                {/* Popular Categories */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800 uppercase tracking-wider">Popular Categories</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <a href="#" className="hover:text-[#ff2e87] transition-colors font-medium  text-sm">Burgers</a>
                        <a href="#" className="hover:text-[#ff2e87] transition-colors font-medium text-sm">Pizza</a>
                        <a href="#" className="hover:text-[#ff2e87] transition-colors font-medium text-sm">Sushi</a>
                        <a href="#" className="hover:text-[#ff2e87] transition-colors font-medium text-sm">Pasta</a>
                        <a href="#" className="hover:text-[#ff2e87] transition-colors font-medium text-sm">Salads</a>
                        <a href="#" className="hover:text-[#ff2e87] transition-colors font-medium text-sm">Desserts</a>
                        <a href="#" className="hover:text-[#ff2e87] transition-colors font-medium text-sm">Beverages</a>
                        <a href="#" className="hover:text-[#ff2e87] transition-colors font-medium text-sm">Breakfast</a>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800 uppercase tracking-wider">Contact Us</h3>
                    <ul className="space-y-4 font-medium">
                        <li className="flex items-start">
                            <FaMapMarkerAlt className="text-[#ff2e87] mt-1 mr-3 flex-shrink-0" />
                            <span>123 Food Street, Culinary District, Dhaka 1207</span>
                        </li>
                        <li className="flex items-center">
                            <FaPhoneAlt className="text-[#ff2e87] mr-3" />
                            <span>+880 1234 567890</span>
                        </li>
                        <li className="flex items-center">
                            <FaEnvelope className="text-[#ff2e87] mr-3" />
                            <span>support@foodrush.com</span>
                        </li>
                        <li className="flex items-center">
                            <FaClock className="text-[#ff2e87] mr-3" />
                            <span>24/7 Service</span>
                        </li>
                    </ul>

                    {/* App Download Badges */}
                    <div className="pt-2">
                        <p className="text-gray-800 font-medium mb-1">Download Our App</p>
                        <div className="flex space-x-4">
                            <a href="#" className="block">
                                <FaApple className='h-10' />
                            </a>
                            <a href="#" className="block">
                                <FaGooglePlay className='h-10' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className=" mt-16 pt-8 border-t border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} FoodRush. All rights reserved.
                    </p> 

                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-gray-600 hover:text-[#ff2e87] text-sm transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-600 hover:text-[#ff2e87] text-sm transition-colors">Terms of Service</a>
                        <a href="#" className="text-gray-600 hover:text-[#ff2e87] text-sm transition-colors">Refund Policy</a>
                    </div>

                    <div className="mt-4 md:mt-0">
                        <img src="/ssl.png" alt="Accepted payment methods" className="h-[25px] w-[150px]" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;