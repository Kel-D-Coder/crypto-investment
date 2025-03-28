import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader } from '../components/Loader';

interface IUserData {
    plan: string;
}

export const Withdraw: React.FC = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [method, setMethod] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [userData, setUserData] = useState<IUserData>();
    const [planError, setPlanError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!method || !amount) {
            setError('Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            setError('');
            setSuccess('');
            setPlanError('');

            if (userData?.plan !== 'diamond') {
                setPlanError('Upgrade your plan to diamond in other to withdraw');
                return;
            }

            const response = await axios.post(`${apiUrl}/withdraw`, {
                wallet: method,
                amount: parseFloat(amount)
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            setSuccess(response.data.msg);
            setAmount('');
            setMethod('');
            setPlanError('');

        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.msg || 'An error occurred during withdrawal');
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`${apiUrl}/users/info`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUserData(response.data);
        }
        fetchUser();
    }, [apiUrl]);

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent mb-8">
                    Withdraw Funds
                </h1>

                {/* Withdrawal Form */}
                <div className="bg-[#1a1141]/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-purple-500/20 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Select Wallet <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    value={method}
                                    onChange={(e) => setMethod(e.target.value)}
                                    className="w-full bg-[#130b2f] rounded-xl p-3.5 appearance-none border border-purple-500/20 focus:border-purple-500 focus:outline-none text-white"
                                >
                                    <option value="">Select Gateway</option>
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
                                Amount <span className="text-red-500">*</span>
                            </label>
                            <div className="flex">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="flex-1 bg-[#130b2f] rounded-l-xl p-3.5 border border-purple-500/20 focus:border-purple-500 focus:outline-none text-white"
                                    placeholder="Enter amount"
                                />
                                <span className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 flex items-center justify-center rounded-r-xl font-medium text-white">
                                    USD
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-xl font-medium transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? <Loader /> : "Submit Withdrawal"}
                        </button>

                        {planError && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-center">
                                {planError}
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-center">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-green-400 text-center">
                                {success}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};