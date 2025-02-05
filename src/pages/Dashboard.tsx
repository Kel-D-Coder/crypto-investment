import React, {useEffect, useState} from "react";
import { Outlet, NavLink, useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../hooks/useAuth';


export interface UserInfo {
    username: string,
    email: string,
    balance: number,
    DepositWallet: number,
    interestWallet: number,
    total: number,
    totalwithdrawal: number,
    interestRate: number,
    depositInterestRate: number,
    // add other fields you need from the response
}

export const Dashboard: React.FC = () => {
    const location = useLocation();
    const isInvestmentPage = location.pathname.includes('/investment');
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const [userData, setUserData] = useState<UserInfo | null>(null);
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (!isAuthenticated) {
            navigate('/');
            return;
        }

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
    }, [isAuthenticated, isLoading, apiUrl, navigate]);

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#0a061f] overflow-x-hidden">
            <aside className="w-full md:w-1/4 lg:w-1/5 p-2 md:p-4 bg-[#130b2f]">
                <div className="flex flex-col items-center">
                    <Link to="/">
                        <img src="https://www.tradetriump.com/assets/images/logoIcon/logo.png" alt="Logo" className="mb-8 w-32" />
                    </Link>
                    <div className="text-center mb-8 w-full">
                        <h2 className="text-lg font-bold text-white mb-4">Account Balance</h2>
                        <div className="bg-[#1a1141] p-4 rounded-lg mb-4">
                            <p className="text-gray-300">Deposit Wallet</p>
                            <p className="text-2xl font-bold text-white">{userData?.DepositWallet.toLocaleString()} USD</p>
                        </div>
                        <div className="bg-[#1a1141] p-4 rounded-lg mb-4">
                            <p className="text-gray-300">Interest Wallet</p>
                            <p className="text-2xl font-bold text-white">{userData?.interestWallet.toLocaleString()} USD</p>
                        </div>
                        <div className="flex space-x-3">
                            <button onClick={() => navigate('/dashboard/deposit')} className="flex-1 bg-purple-600 cursor-pointer hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
                                Deposit
                            </button>
                            <button onClick={() => navigate('/dashboard/withdraw')} className="flex-1 bg-[#1a1141] cursor-pointer hover:bg-[#251856] text-white px-4 py-2 rounded-lg">
                                Withdraw
                            </button>
                        </div>
                    </div>
                </div>
                <nav className="mt-8">
                    <ul className="space-y-3">
                        <li>
                            <NavLink 
                                to="/dashboard"
                                end
                                className={({ isActive }) =>
                                    `flex items-center p-3 rounded-lg text-white ${
                                        isActive ? 'bg-purple-600' : 'bg-[#1a1141] hover:bg-[#251856]'
                                    }`
                                }
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                                    <path d="M3 10a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" />
                                    <path d="M3 16a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" />
                                </svg>
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/dashboard/investment"
                                className={({ isActive }) =>
                                    `flex items-center p-3 rounded-lg text-white ${
                                        isActive ? 'bg-purple-600' : 'bg-[#1a1141] hover:bg-[#251856]'
                                    }`
                                }
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                </svg>
                                Investment
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-3 md:p-6 bg-[#0a061f]">
                <header className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-white">
                            {isInvestmentPage ? 'Investment Plan' : 'Dashboard'}
                        </h1>
                        {isInvestmentPage && (
                            <button className="ml-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg">
                                My Investments
                            </button>
                        )}
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="font-bold text-white">{userData?.username}</p>
                            <p className="text-gray-400 text-sm">{userData?.email}</p>
                        </div>
                        <div className="bg-purple-600 w-10 h-10 flex items-center justify-center rounded-full">
                            <span className="text-xl font-bold text-white">{userData?.username.charAt(0).toUpperCase()}</span>
                        </div>
                    </div>
                </header>
                <Outlet />
            </main>
        </div>
    );
}