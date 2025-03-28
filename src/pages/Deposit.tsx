import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Loader } from '../components/Loader';

export const Deposit: React.FC = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const location = useLocation();
    const { amount, wallet, planName } = location.state || { amount: 0, wallet: 'deposit', planName: 'Investment' };
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [btcAddress] = useState('bc1qsrvjmzs2sut9txgkv3tcgukt839tfelhz5xegk');
    const [btcAmount, setBtcAmount] = useState<string>('0');
    const [isLoading, setIsLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchBtcPrice = async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
                const data = await response.json();
                const btcPrice = data.bitcoin.usd;
                setBtcAmount((amount / btcPrice).toFixed(8));
                setIsLoading(false);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setIsLoading(false);
                }
            }
        };

        fetchBtcPrice();
    }, [amount]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!selectedFile) {
            alert('Please select a proof of payment file');
            return;
        }

        setUploading(true);

        try {
            // Prepare form data for Cloudinary
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('upload_preset', 'Profitablefxtpro'); // Replace with your actual preset
            formData.append('folder', 'deposits'); // Optional: Define a folder in Cloudinary

            
            // Upload to Cloudinary
            const uploadResponse = await axios.post(
                `https://api.cloudinary.com/v1_1/djyud9uky/image/upload`, // Replace with your Cloudinary cloud name
                formData,
            );
            
            const data = await uploadResponse.data;
            
            if (!data.secure_url) {
                throw new Error('Cloudinary upload failed');
            }
            
            const imageUrl = data.secure_url;
            
            const depositData = {
                userName: JSON.parse(localStorage.getItem('currentUser') || '{}').username,
                proof: imageUrl,
                amount: amount.toString(),
                plan: planName,
                btc: btcAmount,
                wallet
            }
            // Send deposit data to your backend
            await axios.post(`${apiUrl}/deposit`, depositData , {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            setSuccess('Deposit submitted successfully');
            setUploading(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError('Failed to upload proof of payment');
                setUploading(false);
            }
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent mb-2">
                        Confirm Deposit
                    </h1>
                    <p className="text-gray-400">Complete your investment deposit securely</p>
                </div>

                {amount === 0 && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-red-400 text-center">
                        Please select an investment plan and deposit amount first
                    </div>
                )}

                <div className="bg-[#130b2f]/80 backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-2xl border border-purple-500/20">
                    {/* Investment Summary */}
                    <div className="bg-[#1a1141]/50 rounded-xl p-6 mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4">Investment Summary</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Amount (USD)</p>
                                <p className="text-2xl font-bold text-white">${amount.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Amount (BTC)</p>
                                <p className="text-2xl font-bold text-white">
                                    {isLoading ? (
                                        <span className="text-gray-500">Calculating...</span>
                                    ) : (
                                        <>{btcAmount} BTC</>
                                    )}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Selected Plan</p>
                                <p className="text-lg font-medium text-white">{planName}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Payment Method</p>
                                <p className="text-lg font-medium text-white capitalize">{wallet}</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Instructions */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-white mb-4">
                                Send Payment to Bitcoin Address
                            </h3>
                            <div className="bg-[#1a1141]/50 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
                                <code className="font-mono bg-black/30 p-3 rounded-lg flex-1 text-sm break-all text-gray-300">
                                    {btcAddress}
                                </code>
                                <button 
                                    onClick={() => copyToClipboard(btcAddress)}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all transform hover:scale-[1.02] cursor-pointer flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                    Copy Address
                                </button>
                            </div>
                        </div>

                        {/* Upload Proof */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-white mb-4">
                                    Upload Payment Proof
                                </h3>
                                <div className="bg-[#1a1141]/50 rounded-xl p-6">
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="proof-file"
                                    />
                                    <label
                                        htmlFor="proof-file"
                                        className="block w-full border-2 border-dashed border-purple-500/50 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500 transition-colors"
                                    >
                                        <div className="space-y-2">
                                            <svg className="w-10 h-10 mx-auto text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p className="text-gray-300">Click to upload proof of payment</p>
                                            <p className="text-purple-500 text-sm">Supported: JPG, JPEG, PNG</p>
                                        </div>
                                    </label>
                                    {selectedFile && (
                                        <p className="mt-4 text-sm text-gray-400 text-center">
                                            Selected: {selectedFile.name}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={uploading || !selectedFile}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-xl font-medium transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {uploading ? <Loader /> : "Confirm Payment"}
                            </button>

                            {success && (
                                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-green-400 text-center">
                                    {success}
                                </div>
                            )}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-center">
                                    {error}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
