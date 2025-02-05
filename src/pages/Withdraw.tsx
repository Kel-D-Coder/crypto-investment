import React, { useState } from 'react';
import axios from 'axios';
import { Loader } from '../components/Loader';

export const Withdraw: React.FC = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [method, setMethod] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

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

    console.log(method)

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="bg-[#130b2f] rounded-xl p-4 sm:p-6 lg:p-8">
                <h1 className="text-xl text-white sm:text-2xl lg:text-3xl font-bold mb-6 lg:mb-8">Withdraw Money</h1>

                <div className="bg-[#1a1141] rounded-xl p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-300 mb-2">
                                Method <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={method}
                                onChange={(e) => setMethod(e.target.value)}
                                className="w-full bg-[#130b2f] rounded-lg p-3 border cursor-pointer border-gray-700 focus:border-purple-500 focus:outline-none text-white"
                            >
                                <option value="">Select Gateway</option>
                                <option value="deposit">Deposit Wallet</option>
                                <option value="interest">Interest Wallet</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-2">
                                Amount <span className="text-red-500">*</span>
                            </label>
                            <div className="flex">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="flex-1 bg-[#130b2f] rounded-l-lg p-3 border border-gray-700 focus:border-purple-500 focus:outline-none text-white"
                                    placeholder="Enter amount"
                                />
                                <span className="bg-purple-600 px-4 flex items-center justify-center rounded-r-lg font-medium text-white">
                                    USD
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg font-medium transition-colors cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? <Loader /> : "Submit"}
                        </button>

                        {error && <p className="text-red-500 text-center">{error}</p>}
                        {success && <p className="text-green-500 text-center">{success}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};