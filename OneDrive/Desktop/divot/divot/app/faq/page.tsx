"use client";

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What is Divot?",
        a: "Divot is Cameroon's premier car rental and sales platform, offering a wide range of vehicles for rent and purchase across major cities including Douala, Yaoundé, and Bafoussam."
      },
      {
        q: "How do I create an account?",
        a: "Click on the 'Sign Up' button in the top right corner of our website. Fill in your details including name, email, and password. You'll receive a confirmation email to verify your account."
      },
      {
        q: "Is Divot available in other cities?",
        a: "Yes, we operate in major cities across Cameroon including Douala, Yaoundé, Bafoussam, and more. We're constantly expanding our network to serve you better."
      }
    ]
  },
  {
    category: "Rentals",
    questions: [
      {
        q: "What documents do I need to rent a car?",
        a: "To rent a car, you need a valid driver's license, national ID or passport, and a credit card for the security deposit. International customers need a valid international driving permit."
      },
      {
        q: "What is the minimum age to rent a car?",
        a: "The minimum age to rent a car is 21 years old. Drivers under 25 may be subject to a young driver surcharge."
      },
      {
        q: "Can I add an additional driver?",
        a: "Yes, you can add additional drivers for a small daily fee. All additional drivers must present valid identification and driver's license at pickup."
      },
      {
        q: "What is your fuel policy?",
        a: "All our rentals come with a full tank of fuel. You should return the car with the same fuel level. If returned with less fuel, you'll be charged for the missing fuel plus a service fee."
      },
      {
        q: "Is insurance included in the rental price?",
        a: "Basic insurance is included in all rentals. You can purchase additional coverage for more comprehensive protection, including zero-deductible options."
      }
    ]
  },
  {
    category: "Purchases",
    questions: [
      {
        q: "How do I purchase a car through Divot?",
        a: "Browse our available vehicles, select the car you're interested in, and click 'Purchase Now' or contact us directly. Our team will guide you through the purchase process including inspection, documentation, and payment."
      },
      {
        q: "Do you offer financing options?",
        a: "Yes, we partner with several financial institutions to offer competitive financing options. Contact our sales team to discuss available plans tailored to your needs."
      },
      {
        q: "Can I test drive a car before purchasing?",
        a: "Absolutely! We encourage test drives for all potential buyers. Schedule a test drive through our website or by contacting our sales team."
      },
      {
        q: "What documents are required for car purchase?",
        a: "You'll need a valid national ID or passport, proof of address (utility bill or bank statement), and proof of income or bank statements for financing applications."
      }
    ]
  },
  {
    category: "Payments & Refunds",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept cash, bank transfers, mobile money (Orange Money, MTN Mobile Money), and major credit/debit cards for both rentals and purchases."
      },
      {
        q: "What is your cancellation policy?",
        a: "For rentals, you can cancel up to 24 hours before pickup for a full refund. Cancellations within 24 hours may incur a cancellation fee. For purchases, our team will discuss specific terms based on your situation."
      },
      {
        q: "How is the security deposit handled?",
        a: "A security deposit is required for all rentals and is held on your credit card. It's released within 7-14 business days after the car is returned, provided there's no damage or additional charges."
      }
    ]
  },
  {
    category: "Support",
    questions: [
      {
        q: "What if I have an accident or breakdown?",
        a: "In case of an accident, contact our 24/7 roadside assistance immediately at +237 123 456 789. We'll guide you through the process and arrange for a replacement vehicle if needed."
      },
      {
        q: "How can I contact customer support?",
        a: "You can reach our customer support team via phone at +237 123 456 789, email at support@divot.cm, or through the contact form on our website. Our support is available 24/7."
      },
      {
        q: "Do you offer airport pickup and drop-off?",
        a: "Yes, we offer airport pickup and drop-off services at Douala and Yaoundé airports for an additional fee. This service can be requested during the booking process."
      }
    ]
  }
];

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<string>('General');
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Find answers to common questions about our services
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Categories</h2>
              <nav className="space-y-2">
                {faqs.map((category) => (
                  <button
                    key={category.category}
                    onClick={() => {
                      setOpenCategory(category.category);
                      setOpenQuestion(null);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors ${
                      openCategory === category.category
                        ? 'bg-sky-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.category}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{openCategory}</h2>
              
              <div className="space-y-4">
                {faqs.find(f => f.category === openCategory)?.questions.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-900">{faq.q}</span>
                      <svg
                        className={`w-5 h-5 text-gray-500 transition-transform ${
                          openQuestion === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openQuestion === index && (
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="mt-8 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-white/90 mb-6">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="px-6 py-3 bg-white text-sky-600 font-bold rounded-lg hover:bg-gray-100 transition-colors text-center">
                  Contact Support
                </Link>
                <a href="tel:+237123456789" className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors text-center">
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
