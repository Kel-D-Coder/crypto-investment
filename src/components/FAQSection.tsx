import React, { useState } from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "When can I deposit/withdraw from my Investment account?",
        answer: "You can deposit at any time. Withdrawals are processed within 24-48 hours after request submission, subject to our terms and conditions."
    },
    {
        question: "How do I check my account balance?",
        answer: "Log into your dashboard to view your current balance, investment history, and transaction details in real-time."
    },
    // {
    //     question: "I forgot my password, what should I do?",
    //     answer: "Click on the 'Forgot Password' link on the login page. Follow the instructions sent to your registered email to reset your password."
    // },
    {
        question: "How will I know that the withdrawal has been successful?",
        answer: "You will get an automatic notification once we send the funds and you can always check your transactions or account balance. Your chosen payment system dictates how long it will take for funds to reach you."
    },
    {
        question: "How much can I withdraw?",
        answer: "You can withdraw any amount from your available balance, subject to minimum withdrawal limits and account verification status."
    }
];

export const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-[#0a061f] text-white py-16 px-6 md:px-20">
            <div className="text-center mb-12">
                <div className="bg-purple-600 text-sm inline-block px-4 py-1 rounded-full mb-4">
                    FAQ
                </div>
                <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className="bg-[#130b2f] rounded-xl overflow-hidden"
                    >
                        <button
                            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#1a1141] transition-colors"
                            onClick={() => toggleFAQ(index)}
                        >
                            <span className="font-medium">{faq.question}</span>
                            <svg 
                                className={`w-6 h-6 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M19 9l-7 7-7-7" 
                                />
                            </svg>
                        </button>
                        <div 
                            className={`px-6 transition-all duration-300 ease-in-out ${
                                openIndex === index ? 'py-4 max-h-40' : 'max-h-0 overflow-hidden'
                            }`}
                        >
                            <p className="text-gray-400">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}; 