import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Loader } from '../components/Loader';

export const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            setSuccess(null);
            const response = await axios.post(`${apiUrl}/forgot-password`, { email });
            setSuccess(response.data.msg);
            setError(null);
        } catch (error) {
            setSuccess(null);
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.msg || 'An error occurred');
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a061f] text-white relative overflow-hidden">
            {/* Breadcrumb */}
            <div className="px-4 md:px-20 py-4 md:py-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Forgot Password</h1>
                <div className="flex items-center gap-2 text-sm">
                    <Link to="/" className="hover:text-purple-400">Home</Link>
                    <span>/</span>
                    <span>Forgot Password</span>
                </div>
            </div>

            {/* Purple Wave */}
            <div className="absolute w-full h-[300px] bottom-0">
                <svg 
                    className="absolute bottom-0 w-full h-full"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                >
                    <path 
                        fill="#9333EA"
                        fillOpacity="0.2"
                        d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,234.7C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </div>

            {/* Forgot Password Form */}
            <div className="container mx-auto px-4 relative z-10 pb-8">
                <div className="max-w-md mx-auto bg-[#130b2f] rounded-2xl p-4 md:p-8 shadow-lg">
                    <h2 className="text-xl md:text-2xl font-bold mb-6">Reset Password</h2>
                    <p className="text-gray-400 mb-6">Enter your email address and we'll send you instructions to reset your password.</p>
                    
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1 md:mb-2">Email</label>
                            <input 
                                type="email"
                                className="w-full bg-[#1a1141] rounded-lg p-2.5 md:p-3 border border-gray-700 focus:border-purple-500 focus:outline-none text-sm md:text-base"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-purple-600 cursor-pointer hover:bg-purple-700 text-white py-2.5 md:py-3 rounded-lg font-medium transition-colors text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? <Loader /> : 'Send Reset Link'}
                        </button>

                        {error && <p className="text-red-500 text-center text-sm md:text-base">{error}</p>}
                        {success && <p className="text-green-500 text-center text-sm md:text-base">{success}</p>}
                    </form>

                    <div className="mt-4 md:mt-6 text-center text-xs md:text-sm text-gray-400">
                        Remember your password? {' '}
                        <Link to="/login" className="text-white hover:text-purple-400 cursor-pointer underline">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}; 