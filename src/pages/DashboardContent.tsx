import React, { useEffect, useState } from "react";
import { UserInfo } from "./Dashboard";
import axios from "axios";

export const DashboardContent: React.FC = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [userData, setUserData] = useState<UserInfo | null>(null);

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
        const interval = setInterval(fetchUser, 5000);
        return () => clearInterval(interval);
    }, [apiUrl]);

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-gray-100 text-sm font-medium mb-2">Total Deposit</h2>
                    <p className="text-3xl font-bold text-white">${userData?.total?.toLocaleString() ?? "0.00"}</p>
                </div>

                <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-gray-100 text-sm font-medium mb-2">Total Withdraw</h2>
                    <p className="text-3xl font-bold text-white">${userData?.totalwithdrawal?.toLocaleString() ?? "0.00"}</p>
                </div>

                <div className="bg-gradient-to-br from-violet-600 to-violet-800 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-gray-100 text-sm font-medium mb-2">Deposit Wallet</h2>
                    <p className="text-3xl font-bold text-white">${userData?.DepositWallet?.toLocaleString() ?? "0.00"}</p>
                    <p className="text-emerald-300 text-sm mt-2">
                        ↑ {userData?.depositInterestRate?.toFixed(2) ?? 0}% Growth
                    </p>
                </div>

                <div className="bg-gradient-to-br from-pink-600 to-pink-800 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-gray-100 text-sm font-medium mb-2">Interest Wallet</h2>
                    <p className="text-3xl font-bold text-white">${userData?.interestWallet?.toLocaleString() ?? "0.00"}</p>
                    <p className="text-emerald-300 text-sm mt-2">
                        ↑ {userData?.interestRate?.toFixed(2) ?? 0}% Growth
                    </p>
                </div>
            </div>

            {/* Investment Overview */}
            <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-white mb-1">Investment Overview</h2>
                    <p className="text-gray-400 text-sm">Your current investment portfolio</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-300">Deposit Wallet</h3>
                            <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-lg text-sm">
                                Active
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-white mb-2">
                            ${userData?.DepositWallet?.toLocaleString() ?? "0.00"}
                        </p>
                        <div className="flex items-center text-emerald-400">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            <span>{userData?.depositInterestRate?.toFixed(2) ?? 0}% Growth rate</span>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-300">Interest Wallet</h3>
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-sm">
                                Earning
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-white mb-2">
                            ${userData?.interestWallet?.toLocaleString() ?? "0.00"}
                        </p>
                        <div className="flex items-center text-emerald-400">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            <span>{userData?.interestRate?.toFixed(2) ?? 0}% Growth rate</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 