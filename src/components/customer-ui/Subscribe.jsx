"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import sub from "../../../public/tilted.png";

const Subscribe = () => {
    const plans = [
        {
            title: 'Monthly Plan',
            duration: '1 Month',
            price: '$9.99',
            description: 'Billed monthly. Cancel anytime.',
            features: [
                'Unlimited free deliveries',
                'Exclusive discounts on orders',
                'Priority customer support',
                'Access to premium vendors',
            ],
            buttonText: 'Subscribe Now',
        },
        {
            title: 'Semi-Annual Plan',
            duration: '6 Months',
            price: '$49.99',
            description: 'Billed every 6 months. Save 17%!',
            features: [
                'Unlimited free deliveries',
                'Exclusive discounts on orders',
                'Priority customer support',
                'Access to premium vendors',
                'Bonus: Free appetizer on first order',
            ],
            buttonText: 'Subscribe Now',
            highlighted: true,
        },
        {
            title: 'Annual Plan',
            duration: '12 Months',
            price: '$89.99',
            description: 'Billed annually. Save 25%!',
            features: [
                'Unlimited free deliveries',
                'Exclusive discounts on orders',
                'Priority customer support',
                'Access to premium vendors',
                'Bonus: Free appetizer on first order',
                'VIP events and promotions',
            ],
            buttonText: 'Subscribe Now',
        },
    ];

    const faqs = [
        {
            question: 'What is the FoodRush Subscription?',
            answer: 'The FoodRush Subscription is a premium membership that offers benefits like unlimited free deliveries, exclusive discounts, and priority support to enhance your food delivery experience.',
        },
        {
            question: 'What are the benefits of subscribing?',
            answer: 'Subscribers enjoy unlimited free deliveries on eligible orders, special discounts from partner vendors, faster customer support, and access to exclusive promotions and events.',
        },
        {
            question: 'How can I cancel my subscription?',
            answer: 'You can cancel your subscription at any time through your account settings. Go to Profile > Subscriptions > Cancel. Note that cancellations take effect at the end of the current billing period.',
        },
        {
            question: 'What payment methods are accepted?',
            answer: 'We accept major credit cards (Visa, Mastercard, American Express), debit cards, and popular digital wallets like Apple Pay and Google Pay for subscription payments.',
        },
    ];

    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 py-20 ">
            {/* Header Section */}
            <div className='w-11/12 mx-auto'>
                <div className="flex justify-between items-center mb-20">
                    <div>
                        <div className='w-24 h-24'>
                            <Image
                                src={sub}
                                alt='cover'
                                width={96}
                                height={96}
                                className=' w-full h-full'
                            />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mt-4">Unlimited free delivery</h1>
                    </div>

                    <div>
                        <button className='bg-indigo-600 text-white px-28 rounded-md cursor-pointer py-3  font-medium '>Choose Your Plan</button>
                    </div>

                </div>

                {/* Plans Section */}
                <div className=" grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:scale-105 ${plan.highlighted ? 'border-4 border-indigo-500' : ''
                                }`}
                        >
                            {plan.highlighted && (
                                <div className="bg-indigo-500 text-white text-center py-2 font-semibold">
                                    Most Popular
                                </div>
                            )}
                            <div className="p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.title}</h2>
                                <p className="text-gray-600 mb-4">{plan.duration}</p>
                                <div className="text-4xl font-bold text-indigo-600 mb-4">{plan.price}</div>
                                <p className="text-sm text-gray-500 mb-6">{plan.description}</p>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-gray-700">
                                            <svg
                                                className="w-5 h-5 text-green-500 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full bg-indigo-600 cursor-pointer text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                                    {plan.buttonText}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-4xl mx-auto mt-20">
                <h2 className="text-3xl font-semibold text-gray-900  mb-10">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-lg border border-gray-200">
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex justify-between items-center cursor-pointer p-5 text-left text-gray-900"
                            >
                                <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                                <svg
                                    className={`w-6 h-6 transform transition-transform duration-300 ${openFaqIndex === index ? 'rotate-45' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </button>
                            {openFaqIndex === index && (
                                <div className="px-6 pb-6 text-gray-700">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Subscribe;