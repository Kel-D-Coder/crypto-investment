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
        <section className="relative overflow-hidden py-24 px-6 md:px-20">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a061f] to-[#130b2f]">
                <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-3xl top-20 -left-20 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-3xl bottom-20 -right-20 animate-pulse delay-1000"></div>
            </div>

            <div className="relative max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20 mb-4">
                        <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            FAQ
                        </span>
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Find quick answers to common questions about our investment platform
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className="group bg-[#1a1141]/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 overflow-hidden transition-all duration-300 hover:border-purple-500/40"
                        >
                            <button
                                className="w-full px-6 py-5 text-left flex justify-between items-center"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="font-medium text-white text-lg pr-4">
                                    {faq.question}
                                </span>
                                <div className={`flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                    <svg 
                                        className="w-5 h-5 text-white"
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
                                </div>
                            </button>
                            <div 
                                className={`transition-all duration-300 ease-in-out ${
                                    openIndex === index 
                                        ? 'max-h-48 opacity-100' 
                                        : 'max-h-0 opacity-0'
                                } overflow-hidden`}
                            >
                                <div className="px-6 pb-5 pt-2">
                                    <p className="text-gray-400 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Support Link */}
                <div className="text-center mt-12">
                    <p className="text-gray-400 mb-4">
                        Still have questions?
                    </p>
                    <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] cursor-pointer">
                        Contact Support
                    </button>
                </div>
            </div>
        </section>
    );
}; 