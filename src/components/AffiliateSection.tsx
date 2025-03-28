import React from 'react';

export const AffiliateSection: React.FC = () => {
    const features = [
        {
            title: "Affiliate Networks",
            description: "Join our global network of affiliates and earn competitive commissions through our multi-tier reward system.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        },
        {
            title: "Commission Structure",
            description: "Earn up to 10% commission on all referral investments with instant payouts to your wallet.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            title: "Affiliate Management",
            description: "Access real-time analytics, tracking tools, and comprehensive reporting for your referral network.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        }
    ];

    return (
        <section className="relative overflow-hidden py-24 px-6 md:px-20">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a061f] to-[#130b2f]">
                <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-3xl top-20 -left-20 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-3xl bottom-20 -right-20 animate-pulse delay-1000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                    {/* Content Section */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        {/* Header */}
                        <div className="space-y-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20">
                                <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                    AFFILIATE PROGRAM
                                </span>
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                Earn While You Refer
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Join our affiliate program and earn competitive commissions by referring new investors.
                            </p>
                        </div>
                        
                        {/* Features */}
                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <div 
                                    key={index}
                                    className="group bg-[#1a1141]/50 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-white mb-2">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-400 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative group">
                            {/* Image Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-2xl opacity-30 group-hover:opacity-40 transition-opacity"></div>
                            
                            <img 
                                src="https://www.tradetriump.com/assets/images/frontend/affiliate/669aada2d6c4f1721413026.png" 
                                alt="Affiliate Program"
                                className="relative rounded-2xl shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 