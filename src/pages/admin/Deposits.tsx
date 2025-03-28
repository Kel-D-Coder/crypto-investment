import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from '../../components/Loader';

interface Deposit {
    _id: string;
    userId: string;
    amount: number;
    btc: number;
    wallet: string;
    plan: string;
    status: 'pending' | 'approved' | 'declined';
    proof: string;
    createdAt: string;
    userName: string;
}

export const AdminDeposits: React.FC = () => {
    const [deposits, setDeposits] = useState<Deposit[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleStatusUpdate = async (depositId: string, status: 'approved' | 'declined', userId: string, amount: number, wallet: string) => {
        try {
            await axios.put(`${apiUrl}/users/${userId}/amount`, {
                amount,
                status,
                wallet
            });
            
            setDeposits(deposits.map(deposit => 
                deposit._id === depositId ? { ...deposit, status } : deposit
            ));
            
        } catch (error) {
            console.error('Error updating deposit status:', error);
        }
    };

    useEffect(() => {
        const fetchAllDeposits = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${apiUrl}/get-deposits`);
                setDeposits(response.data.deposits.reverse());
            } catch (error) {
                console.error('Error fetching deposits:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchAllDeposits();
    }, [apiUrl]);

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                        Deposit Management
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Review and manage user deposits
                    </p>
                </div>

                {/* Content */}
                <div className="bg-[#1a1141]/80 backdrop-blur-xl rounded-2xl border border-purple-500/20 shadow-2xl overflow-hidden">
                    {isLoading ? (
                        <div className="text-center py-12">
                            <Loader />
                        </div>
                    ) : deposits.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                            No deposits yet
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-purple-500/20">
                                <thead className="bg-[#130b2f]">
                                    <tr>
                                        <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                                        <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                                        <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">BTC</th>
                                        <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Wallet</th>
                                        <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Plan</th>
                                        <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                                        <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Proof</th>
                                        <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-purple-500/20">
                                    {deposits.map((deposit) => (
                                        <tr key={deposit._id} className="hover:bg-[#130b2f] transition-colors">
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{deposit.userName}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">${deposit.amount.toLocaleString()}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{deposit.btc}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{deposit.wallet}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{deposit.plan}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {new Date(deposit.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => setSelectedImage(deposit.proof)}
                                                    className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
                                                >
                                                    View
                                                </button>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    deposit.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                                                    deposit.status === 'declined' ? 'bg-red-500/20 text-red-400' :
                                                    'bg-yellow-500/20 text-yellow-400'
                                                }`}>
                                                    {deposit.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                {deposit.status === 'pending' && (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleStatusUpdate(deposit._id, 'approved', deposit.userId, deposit.amount, deposit.wallet)}
                                                            className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-xs transition-colors"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(deposit._id, 'declined', deposit.userId, deposit.amount, deposit.wallet)}
                                                            className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-xs transition-colors"
                                                        >
                                                            Decline
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Image Preview Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-[#0a061f]/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1a1141]/80 backdrop-blur-xl rounded-2xl max-w-3xl w-full overflow-hidden border border-purple-500/20 shadow-2xl">
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b border-purple-500/20">
                            <h3 className="text-lg font-semibold text-white">Payment Proof</h3>
                            <button 
                                onClick={() => setSelectedImage(null)}
                                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-purple-500/10 rounded-lg"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Image */}
                        <div className="relative aspect-[4/3] w-full bg-[#0a061f]">
                            <img
                                src={selectedImage}
                                alt="Proof of payment"
                                className="absolute inset-0 w-full h-full object-contain"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                                }}
                            />
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-purple-500/20">
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => window.open(selectedImage, '_blank')}
                                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl text-sm transition-all transform hover:scale-[1.02]"
                                >
                                    Open Original
                                </button>
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="px-4 py-2 bg-[#130b2f] hover:bg-[#1f1356] text-white rounded-xl text-sm transition-all transform hover:scale-[1.02]"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}; 