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
        <div className="fixed inset-0 bg-[#0a061f]/90 flex items-center justify-center z-50 p-4">
            <div className="bg-[#130b2f] rounded-xl w-full max-w-md relative">
                {/* Header with close button */}
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <div className="flex items-center">
                        <img src="https://www.tradetriump.com/assets/images/logoIcon/logo.png" alt="Logo" className="h-6 w-6 mr-2" />
                        <h3 className="text-lg font-semibold">Confirm to invest on {plan.name}</h3>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Investment Details */}
                <div className="p-6 space-y-6">
                    <div className="text-center space-y-2">
                        <p className="text-lg">Invest: {plan.min} - {plan.max}</p>
                        <p className="text-lg">Interest: {plan.roi}</p>
                        <p className="text-gray-400">Per 24 hours, 30 times</p>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">
                                Select Wallet <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select 
                                    value={wallet}
                                    onChange={(e) => setWallet(e.target.value)}
                                    className="w-full bg-[#1a1141] rounded-lg p-3 appearance-none border border-gray-700 focus:border-purple-500 
                                    focus:outline-none"
                                >
                                    <option value="">Select One</option>
                                    <option value="deposit">Deposit Wallet</option>
                                    <option value="interest">Interest Wallet</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">
                                Invest Amount <span className="text-red-500">*</span>
                            </label>
                            <div className="flex">
                                <input 
                                    type="number" 
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="flex-1 bg-[#1a1141] rounded-l-lg p-3 border border-gray-700 focus:border-purple-500 focus:outline-none"
                                    placeholder={`Min: ${plan.min}`}
                                />
                                <span className="bg-purple-600 px-4 flex items-center justify-center rounded-r-lg font-medium">
                                    USD
                                </span>
                            </div>
                            {error && <p className="text-red-500 text-center mt-2">{error} error</p>}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 p-4 border-t border-gray-700">
                    <button 
                        onClick={onClose}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors cursor-pointer"
                    >
                        No
                    </button>
                    <button 
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors cursor-pointer"
                        onClick={handleInvest}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}; 