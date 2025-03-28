import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Loader } from '../components/Loader';

export const ResetPassword: React.FC = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [passwords, setPasswords] = useState({
        password: '',
        confirmPassword: ''
    });
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (passwords.password !== passwords.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const response = await axios.post(`${apiUrl}/reset-password/${token}`, {
                password: passwords.password
            });
            setSuccess(response.data.msg);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
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
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a061f] to-[#130b2f]">
                <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-3xl top-20 -left-20 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-3xl bottom-20 -right-20 animate-pulse delay-1000"></div>
            </div>

            <div className="relative">
                {/* Header */}
                <div className="px-6 md:px-20 py-8">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white to-purple-400 bg-clip-text">
                            Create New Password
                        </h1>
                        <div className="flex items-center gap-2 text-sm">
                            <Link to="/" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Home
                            </Link>
                            <span className="text-gray-600">/</span>
                            <span className="text-purple-400">Reset Password</span>
                        </div>
                    </div>
                </div>

                {/* Reset Password Form */}
                <div className="container mx-auto px-6 pb-20">
                    <div className="max-w-md mx-auto">
                        <div className="bg-[#1a1141]/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-purple-500/20">
                            <div className="mb-8 text-center">
                                <h2 className="text-2xl font-bold text-white mb-2">Set New Password</h2>
                                <p className="text-gray-400">
                                    Please create a strong password for your account
                                </p>
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {/* Password Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
                                    <div className="relative">
                                        <input 
                                            type={showPassword ? "text" : "password"}
                                            className="w-full bg-[#130b2f] rounded-xl p-3.5 border border-purple-500/20 focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 pr-10"
                                            placeholder="Enter new password"
                                            name="password"
                                            onChange={handleChange}
                                            required
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            {showPassword ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Confirm Password</label>
                                    <div className="relative">
                                        <input 
                                            type={showConfirmPassword ? "text" : "password"}
                                            className="w-full bg-[#130b2f] rounded-xl p-3.5 border border-purple-500/20 focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 pr-10"
                                            placeholder="Confirm new password"
                                            name="confirmPassword"
                                            onChange={handleChange}
                                            required
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            {showConfirmPassword ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-xl font-medium transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    disabled={loading}
                                >
                                    {loading ? <Loader /> : 'Reset Password'}
                                </button>

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

                            <div className="mt-8 text-center text-gray-400">
                                Remember your password?{' '}
                                <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
                                    Back to Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
