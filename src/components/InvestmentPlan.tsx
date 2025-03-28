import React, { useState } from "react";
import { InvestmentModal } from "./InvestmentModal";

const plans = [
    {
        name: "starter",
        roi: "20.57%",
        daily: "30 Daily",
        min: "$500.00",
        max: "$2,500.00",
        return: "617.1%",
        capital: true,
    },
    {
        name: "silver",
        roi: "31.23%",
        daily: "30 Daily",
        min: "$3,000.00",
        max: "$9,000.00",
        return: "936.9%",
        capital: true,
    },
    {
        name: "gold",
        roi: "38.29%",
        daily: "30 Daily",
        min: "$9,500.00",
        max: "$20,000.00",
        return: "1148.7%",
        capital: true,
    },
    {
        name: "diamond",
        roi: "45.20%",
        daily: "30 Daily",
        min: "$20,500.00",
        max: "$100,000.00",
        return: "1356%",
        capital: true,
    },
];

export const InvestmentPlans: React.FC = () => {
    const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);

    return (
        <section className="relative overflow-hidden py-24 px-6">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a061f] to-[#130b2f]">
                <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-3xl top-20 -left-20 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-3xl bottom-20 -right-20 animate-pulse delay-1000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold tracking-wider text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text uppercase mb-4">
                        Investment Plans
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                        Choose Your Investment Strategy
                    </h3>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className="relative group"
                        >
                            {/* Card Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="relative bg-[#1a1141]/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-purple-500/20 transform transition-all duration-300 group-hover:scale-[1.02] group-hover:border-purple-500/40">
                                {/* ROI Header */}
                                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-center">
                                    <h3 className="text-lg font-medium text-white/80 mb-2">ROI</h3>
                                    <p className="text-4xl font-bold text-white">{plan.roi}</p>
                                </div>

                                {/* Plan Details */}
                                <div className="p-6 space-y-6">
                                    <div className="text-center">
                                        <h4 className="text-xl font-bold text-white capitalize mb-2">{plan.name}</h4>
                                        <p className="text-gray-400">{plan.daily}</p>
                                    </div>

                                    {/* Investment Range */}
                                    <div className="bg-[#130b2f] rounded-xl p-4 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Minimum</span>
                                            <span className="text-white font-medium">{plan.min}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Maximum</span>
                                            <span className="text-white font-medium">{plan.max}</span>
                                        </div>
                                    </div>

                                    {/* Returns */}
                                    <div className="space-y-2 text-center">
                                        <p className="text-gray-400">
                                            Total Return: <span className="text-white font-bold">{plan.return}</span>
                                        </p>
                                        {plan.capital && (
                                            <p className="text-emerald-400 font-medium">
                                                + Capital Back
                                            </p>
                                        )}
                                    </div>

                                    {/* Action Button */}
                                    <button 
                                        onClick={() => setSelectedPlan(plan)}
                                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-xl font-medium transition-all transform hover:scale-[1.02] cursor-pointer"
                                    >
                                        Choose Plan
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {selectedPlan && (
                <InvestmentModal 
                    plan={selectedPlan}
                    isOpen={selectedPlan !== null}
                    onClose={() => setSelectedPlan(null)}
                />
            )}
        </section>
    );
};

