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

    // const handleStatusUpdate = (depositId: string, newStatus: 'approved' | 'declined') => {
    //     setDeposits(deposits.map(deposit => deposit.id === depositId ? { ...deposit, status: newStatus } : deposit ));
    // };

    const handleStatusUpdate = async (depositId: string, status: 'approved' | 'declined', userId : string, amount: number, wallet: string) => {
        try {
            // Replace with your actual API endpoint
            const response = await axios.put(`${apiUrl}/users/${userId}/amount`, {
                amount,
                status,
                wallet
            });

            // setSuccess(response.data.msg);

            console.log(response.data.msg);
            
            // Update local state
            setDeposits(deposits.map(deposit => deposit._id === depositId ? { ...deposit, status: status } : deposit ));
            
        } catch (error) {
            console.error('Error updating deposit status:', error);
        }
    };

    useEffect(() => {
        const fetchAllDeposits = async () => {
            try {
               setIsLoading(true);
               const response = await axios.get(`${apiUrl}/get-deposits`);
               console.log(response.data.deposits);
                setDeposits(response.data.deposits.reverse());
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching deposits:', error);
                setIsLoading(false);

            }
        }
        fetchAllDeposits();
    }, [apiUrl]);

    return (
        <div className="p-2 sm:p-4 lg:p-6  h-screen">
            <div className="bg-[#130b2f] rounded-xl p-3 sm:p-4 lg:p-6">
                <h1 className="text-xl text-white sm:text-2xl lg:text-3xl font-bold mb-6">Deposit Management</h1>

                {isLoading ? (
                    <div className="text-center py-8">
                        <Loader />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full align-middle">
                            <div className="overflow-hidden rounded-lg">
                                <table className="min-w-full divide-y divide-[#1a1141]">
                                    <thead className="bg-[#1a1141]">
                                        <tr>
                                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                User
                                            </th>
                                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                BTC
                                            </th>
                                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                Wallet
                                            </th>
                                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                Plan
                                            </th>
                                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                Proof
                                            </th>
                                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1a1141] bg-[#130b2f]">
                                        {deposits.map((deposit) => (
                                            <tr key={deposit._id} className="hover:bg-[#1a1141]/50">
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-300">
                                                    {deposit.userName}
                                                </td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-300">
                                                    ${deposit.amount.toLocaleString()}
                                                </td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-300">
                                                    {deposit.btc}
                                                </td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-300">
                                                    {deposit.wallet}
                                                </td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-300">
                                                    {deposit.plan}
                                                </td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-300">
                                                    {new Date(deposit.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm">
                                                    <button
                                                        onClick={() => setSelectedImage(deposit.proof)}
                                                        className="text-blue-400 hover:text-blue-500"
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                                        deposit.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                                                        deposit.status === 'declined' ? 'bg-red-500/20 text-red-500' :
                                                        'bg-yellow-500/20 text-yellow-500'
                                                    }`}>
                                                        {deposit.status}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm">
                                                    {deposit.status === 'pending' && (
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleStatusUpdate(deposit._id, 'approved', deposit.userId, deposit.amount, deposit.wallet)}
                                                                className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs cursor-pointer"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusUpdate(deposit._id, 'declined', deposit.userId, deposit.amount, deposit.wallet)}
                                                                className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs cursor-pointer"
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
                        </div>
                    </div>
                )}
            </div>

            {/* Image Preview Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="relative bg-[#130b2f] rounded-xl max-w-3xl w-full overflow-hidden">
                        {/* Header with close button */}
                        <div className="flex justify-between items-center p-4 border-b border-gray-700">
                            <h3 className="text-lg font-semibold text-white">Payment Proof</h3>
                        </div>

                        {/* Image container */}
                        <div className="relative aspect-[4/3] w-full bg-black/50">
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

                        {/* Footer with actions */}
                        <div className="p-4 border-t border-gray-700">
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => window.open(selectedImage, '_blank')}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors cursor-pointer"
                                >
                                    Open Original
                                </button>
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors cursor-pointer"
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