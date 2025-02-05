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
        <>
            <section className="bg-[#130b2f] p-3 md:p-4 rounded-lg mb-4 md:mb-6">
                <h2 className="text-lg font-bold text-white mb-2">Holiday</h2>
                <p className="text-gray-300 text-sm md:text-base">
                    Today is holiday on this system. You'll not get any interest today from this system. 
                    Also you're unable to make withdrawal request today. The next working day is coming after 
                    <span className="text-blue-400 ml-1">1d 13h 43m 30s</span>
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-4 md:mb-6">
                <div className="bg-[#130b2f] p-3 md:p-4 rounded-lg">
                    <h2 className="text-lg font-bold text-white mb-2 text-center">Total Deposit</h2>
                    <p className="text-2xl font-bold text-white mb-4 text-center">{userData?.total?.toLocaleString() ?? "0.00"} USD</p>
                </div>

                <div className="bg-[#130b2f] p-3 md:p-4 rounded-lg">
                    <h2 className="text-lg text-center font-bold text-white mb-2">Total Withdraw</h2>
                    <p className="text-2xl font-bold text-white mb-4 text-center">{userData?.totalwithdrawal?.toLocaleString() ?? "0.00"} USD</p>
                </div>
            </section>

            <section className="bg-[#130b2f] p-3 md:p-4 rounded-lg">
                <h2 className="text-lg font-bold text-white mb-2">Invested By Wallets</h2>
                <div className="mb-4">
                    <h3 className="text-gray-300 text-sm mb-2">Total Invested By Wallets</h3>
                    <p className="text-3xl font-bold text-white">${userData?.total.toLocaleString() ?? "0.00"} USD</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#1a1141] p-3 rounded-lg">
                        <p className="text-gray-300 text-sm mb-1">Deposit Wallet</p>
                        <p className="text-white font-bold">${userData?.DepositWallet?.toLocaleString() ?? "0.00"}</p>
                        <p className="text-green-400 text-sm">↑ {userData?.depositInterestRate.toFixed(2) ?? 0}%</p>
                    </div>
                    <div className="bg-[#1a1141] p-3 rounded-lg">
                        <p className="text-gray-300 text-sm mb-1">Interest Wallet</p>
                        <p className="text-white font-bold">${userData?.interestWallet?.toLocaleString() ?? "0.00"}</p>
                        <p className="text-green-400 text-sm">↑ {userData?.interestRate.toFixed(2) ?? 0}%</p>
                    </div>
                </div>
            </section>
        </>
    );
} 