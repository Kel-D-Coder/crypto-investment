import React from 'react';

const steps = [
    {
        number: "1",
        title: "Registration",
        description: "Create your account in minutes",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
        )
    },
    {
        number: "2",
        title: "Deposit",
        description: "Fund your investment account",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        )
    },
    {
        number: "3",
        title: "Investing",
        description: "Choose your investment plan",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        )
    },
    {
        number: "4",
        title: "Profit",
        description: "Earn consistent returns",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        number: "5",
        title: "Withdraw",
        description: "Cash out your earnings",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
        )
    }
];

export const WorkProcess: React.FC = () => {
    return (
        <section className="relative overflow-hidden py-24 px-6 md:px-20">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a061f] to-[#130b2f]">
                <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-3xl top-20 -left-20 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-3xl bottom-20 -right-20 animate-pulse delay-1000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20 mb-4">
                        <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            WORK PROCESS
                        </span>
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Start Investing in 5 Simple Steps
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Begin your investment journey with our straightforward process
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {steps.map((step, index) => (
                        <div 
                            key={step.number}
                            className="relative group"
                        >
                            {/* Connection line */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 w-8">
                                    <div className="h-0.5 w-full bg-gradient-to-r from-purple-500 to-blue-500 transform translate-y-px"></div>
                                </div>
                            )}

                            <div className="bg-[#1a1141]/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group-hover:transform group-hover:scale-[1.02]">
                                {/* Step number */}
                                <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white mb-6">
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <div className="text-purple-400 group-hover:text-purple-300 transition-colors mb-4">
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-400">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 