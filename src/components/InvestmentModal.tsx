import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Plan {
    name: string;
    roi: string;
    daily: string;
    min: string;
    max: string;
    return: string;
    capital: boolean;
}

interface InvestmentModalProps {
    plan: Plan;
    isOpen: boolean;
    onClose: () => void;
}

export const InvestmentModal: React.FC<InvestmentModalProps> = ({ plan, isOpen, onClose }) => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState<string>("");
    const [wallet, setWallet] = useState<string>("");
    const [error, setLocalError] = useState<string>("");

    const handleInvest = () => {
        if (!amount || !wallet) return;
        
        const minAmount = parseFloat(plan.min.replace('$', '').replace(',', ''));
        const inputAmount = parseFloat(amount);

        if (inputAmount < minAmount) {
            setLocalError(`Minimum investment amount is ${plan.min}`);
            return;
        }

        setLocalError("");
        navigate('/dashboard/deposit', {
            state: {
                amount: inputAmount,
                wallet: wallet,
                planName: plan.name
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#0a061f]/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1141]/80 backdrop-blur-xl rounded-2xl w-full max-w-md relative border border-purple-500/20 shadow-2xl transform transition-all duration-300">
                {/* Header with close button */}
                <div className="flex justify-between items-center p-6 border-b border-purple-500/20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white">Invest in {plan.name}</h3>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-purple-500/10 rounded-lg"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Investment Details */}
                <div className="p-6 space-y-6">
                    <div className="bg-[#130b2f] rounded-xl p-6 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Investment Range</span>
                            <span className="text-white font-medium">{plan.min} - {plan.max}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Daily ROI</span>
                            <span className="text-white font-medium">{plan.roi}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Duration</span>
                            <span className="text-white font-medium">30 Days</span>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Select Wallet <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select 
                                    value={wallet}
                                    onChange={(e) => setWallet(e.target.value)}
                                    className="w-full bg-[#130b2f] rounded-xl p-3.5 appearance-none border border-purple-500/20 focus:border-purple-500 
                                    focus:outline-none text-white"
                                >
                                    <option value="">Select One</option>
                                    <option value="deposit">Deposit Wallet</option>
                                    <option value="interest">Interest Wallet</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Investment Amount <span className="text-red-500">*</span>
                            </label>
                            <div className="flex">
                                <input 
                                    type="number" 
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="flex-1 bg-[#130b2f] rounded-l-xl p-3.5 border border-purple-500/20 focus:border-purple-500 focus:outline-none text-white"
                                    placeholder={`Min: ${plan.min}`}
                                />
                                <span className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 flex items-center justify-center rounded-r-xl font-medium text-white">
                                    USD
                                </span>
                            </div>
                            {error && (
                                <p className="text-red-400 text-sm mt-2">{error}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 p-6 border-t border-purple-500/20">
                    <button 
                        onClick={onClose}
                        className="flex-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02]"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleInvest}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02]"
                    >
                        Confirm Investment
                    </button>
                </div>
            </div>
        </div>
    );
}; 