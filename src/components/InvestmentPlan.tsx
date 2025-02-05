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
        <section className="bg-blue-950 text-white py-16 px-6">
            <h2 className="text-center text-4xl font-bold mb-12">Investment Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className="bg-blue-900 rounded-xl p-6 flex flex-col items-center text-center shadow-lg hover:scale-105 transition-transform"
                    >
                        <div className="bg-gradient-to-b from-purple-500 to-purple-700 w-full rounded-t-xl py-4">
                            <h3 className="text-xl font-semibold">ROI</h3>
                            <p className="text-3xl font-bold">{plan.roi}</p>
                        </div>
                        <p className="mt-4 text-lg font-bold">{plan.name}</p>
                        <p className="text-sm mt-2">{plan.daily}</p>
                        <div className="mt-4 w-full flex justify-between text-sm">
                            <span>Min: {plan.min}</span>
                            <span>Max: {plan.max}</span>
                        </div>
                        <hr className="w-full my-4 border-blue-800" />
                        <p>Return {plan.roi}</p>
                        <p className="mt-2">{plan.daily}</p>
                        <p className="mt-4">
                            Total {plan.return}{" "}
                            {plan.capital && (
                                <span className="text-green-400 font-semibold">+ Capital</span>
                            )}
                        </p>
                        <button 
                            className="mt-6 bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-lg cursor-pointer"
                            onClick={() => setSelectedPlan(plan)}
                        >
                            Invest Now
                        </button>
                    </div>
                ))}
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

