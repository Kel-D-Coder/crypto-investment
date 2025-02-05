import React from 'react';

export const AffiliateSection: React.FC = () => {
    return (
        <section className="bg-[#0a061f] text-white py-16 px-6 md:px-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="w-full md:w-1/2">
                    <div className="bg-purple-600 inline-block px-4 py-1 rounded-full mb-4">
                        AFFILIATE
                    </div>
                    <h2 className="text-4xl font-bold mb-6">Affiliate Program</h2>
                    
                    <div className="space-y-6">
                        <div className="bg-[#130b2f] p-6 rounded-xl flex items-start gap-4">
                            <div className="bg-purple-600 p-3 rounded-xl">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Affiliate Networks</h3>
                                <p className="text-gray-400">
                                    Learn content by interacting with an expert and find the problem by with ai.
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#130b2f] p-6 rounded-xl flex items-start gap-4">
                            <div className="bg-purple-600 p-3 rounded-xl">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Amazon Associates</h3>
                                <p className="text-gray-400">
                                    Learn content by interacting with an expert and find the problem by with ai.
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#130b2f] p-6 rounded-xl flex items-start gap-4">
                            <div className="bg-purple-600 p-3 rounded-xl">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Affiliate Management</h3>
                                <p className="text-gray-400">
                                    Learn content by interacting with an expert and find the problem by with ai.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2">
                    <img 
                        src="https://www.tradetriump.com/assets/images/frontend/affiliate/669aada2d6c4f1721413026.png" 
                        alt="Affiliate Program Illustration"
                        className="w-full"
                    />
                </div>
            </div>
        </section>
    );
} 