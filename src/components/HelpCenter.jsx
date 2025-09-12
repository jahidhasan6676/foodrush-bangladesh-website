// pages/help-center.jsx
"use client"
import { useState } from 'react';
import Head from 'next/head';

export default function HelpCenter() {
  const [activeTab, setActiveTab] = useState('customer');
  const [openSections, setOpenSections] = useState({
    customer: {},
    vendor: {},
    general: {}
  });

  const toggleSection = (category, sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [sectionId]: !prev[category][sectionId]
      }
    }));
  };

  const customerFAQs = [
    {
      id: 'cust1',
      question: 'How do I place an order?',
      answer: 'Browse products from vendors, add items to your cart, and proceed to checkout. You can pay online or choose cash on delivery if available.'
    },
    {
      id: 'cust2',
      question: 'How can I track my order?',
      answer: 'Once your order is confirmed, you\'ll receive tracking details in the app and via email/SMS. You can view real-time updates in your order history.'
    },
    {
      id: 'cust3',
      question: 'What if I receive the wrong item?',
      answer: 'Contact our support team immediately with photos of the incorrect item. We\'ll arrange for a replacement or refund as per our policy.'
    }
  ];

  const vendorFAQs = [
    {
      id: 'vend1',
      question: 'How do I list my products on FoodRush?',
      answer: 'Register as a vendor, complete your profile, and submit your product catalog for approval. Our team will verify and activate your listings.'
    },
    {
      id: 'vend2',
      question: 'How are payments processed?',
      answer: 'We transfer payments to your registered bank account weekly. A small commission is deducted as per our agreement.'
    },
    {
      id: 'vend3',
      question: 'How do I manage inventory?',
      answer: 'Use the vendor dashboard to update stock levels in real-time. Mark items as out of stock when unavailable.'
    }
  ];

  const generalFAQs = [
    {
      id: 'gen1',
      question: 'What areas do you serve?',
      answer: 'We currently serve major cities across the country. Enter your address during checkout to confirm availability in your area.'
    },
    {
      id: 'gen2',
      question: 'What are your delivery hours?',
      answer: 'Delivery times vary by vendor. Most operate from 8 AM to 10 PM. Check individual shop pages for specific timings.'
    },
    {
      id: 'gen3',
      question: 'How do I contact customer support?',
      answer: 'Use the live chat feature in the app, email support@foodrush.com, or call our helpline at +8801818186676.'
    }
  ];

  return (
    <div className="w-11/12 mx-auto">
      <Head>
        <title>FoodRush Help Center</title>
        <meta name="description" content="Get help with your FoodRush orders, vendor services, and more" />
      </Head>

      <main className=" py-20">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow p-4 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Help Topics</h2>
              <nav>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab('customer')}
                      className={`w-full text-left px-3 py-2 cursor-pointer rounded ${activeTab === 'customer' ? 'bg-gray-100  font-medium' : 'hover:bg-gray-50'}`}
                    >
                      Customer Help
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('vendor')}
                      className={`w-full text-left px-3 py-2 cursor-pointer rounded ${activeTab === 'vendor' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'}`}
                    >
                      Vendor Help
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('general')}
                      className={`w-full text-left px-3 py-2 rounded cursor-pointer ${activeTab === 'general' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'}`}
                    >
                      General Questions
                    </button>
                  </li>
                </ul>
              </nav>

              <div className="mt-8">
                <h3 className="font-medium mb-2">Need more help?</h3>
                <button className="w-full bg-[#ff2e87] text-white py-2 px-4 rounded">
                  Contact Support
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            {activeTab === 'customer' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6 text-[#ff2e87]">Customer Help</h2>
                <div className="space-y-4">
                  {customerFAQs.map(faq => (
                    <div key={faq.id} className="border-b pb-4">
                      <button
                        onClick={() => toggleSection('customer', faq.id)}
                        className="flex justify-between items-center w-full text-left font-medium text-lg  cursor-pointer focus:outline-none"
                      >
                        <span>{faq.question}</span>
                        <span>{openSections.customer[faq.id] ? '−' : '+'}</span>
                      </button>
                      {openSections.customer[faq.id] && (
                        <div className="mt-2 text-gray-600 pl-2">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'vendor' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6 text-[#ff2e87]">Vendor Help</h2>
                <div className="space-y-4">
                  {vendorFAQs.map(faq => (
                    <div key={faq.id} className="border-b pb-4">
                      <button
                        onClick={() => toggleSection('vendor', faq.id)}
                        className="flex justify-between items-center w-full text-left font-medium text-lg cursor-pointer focus:outline-none"
                      >
                        <span>{faq.question}</span>
                        <span>{openSections.vendor[faq.id] ? '−' : '+'}</span>
                      </button>
                      {openSections.vendor[faq.id] && (
                        <div className="mt-2 text-gray-600 pl-2">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'general' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6 text-[#ff2e87]">General Questions</h2>
                <div className="space-y-4">
                  {generalFAQs.map(faq => (
                    <div key={faq.id} className="border-b pb-4">
                      <button
                        onClick={() => toggleSection('general', faq.id)}
                        className="flex justify-between items-center w-full text-left font-medium text-lg cursor-pointer focus:outline-none"
                      >
                        <span>{faq.question}</span>
                        <span>{openSections.general[faq.id] ? '−' : '+'}</span>
                      </button>
                      {openSections.general[faq.id] && (
                        <div className="mt-2 text-gray-600 pl-2">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Resources */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-3">Ordering Guide</h3>
                <p className="text-gray-600 mb-4">Learn how to browse, order, and track your food items.</p>
                <button className="text-[#ff2e87] cursor-pointer hover:underline">View Guide →</button>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-3">Vendor Resources</h3>
                <p className="text-gray-600 mb-4">Tools and guides for vendors to manage their shops effectively.</p>
                <button className="text-[#ff2e87] cursor-pointer hover:underline">Explore Resources →</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}