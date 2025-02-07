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
        <div className="min-h-screen bg-[#0a061f] text-white relative overflow-hidden">
            {/* Breadcrumb */}
            <div className="px-4 md:px-20 py-4 md:py-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Reset Password</h1>
                <div className="flex items-center gap-2 text-sm">
                    <Link to="/" className="hover:text-purple-400">Home</Link>
                    <span>/</span>
                    <span>Reset Password</span>
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

            {/* Reset Password Form */}
            <div className="container mx-auto px-4 relative z-10 pb-8">
                <div className="max-w-md mx-auto bg-[#130b2f] rounded-2xl p-4 md:p-8 shadow-lg">
                    <h2 className="text-xl md:text-2xl font-bold mb-6">Create New Password</h2>
                    <p className="text-gray-400 mb-6">Please enter your new password below.</p>

                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        {/* Password Field */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-1 md:mb-2">New Password</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    className="w-full bg-[#1a1141] rounded-lg p-2.5 md:p-3 border border-gray-700 focus:border-purple-500 focus:outline-none text-sm md:text-base pr-10"
                                    placeholder="Enter new password"
                                    name="password"
                                    onChange={handleChange}
                                    required
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
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
                            <label className="block text-sm text-gray-400 mb-1 md:mb-2">Confirm New Password</label>
                            <div className="relative">
                                <input 
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="w-full bg-[#1a1141] rounded-lg p-2.5 md:p-3 border border-gray-700 focus:border-purple-500 focus:outline-none text-sm md:text-base pr-10"
                                    placeholder="Confirm new password"
                                    name="confirmPassword"
                                    onChange={handleChange}
                                    required
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
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
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 md:py-3 rounded-lg font-medium transition-colors text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? <Loader /> : 'Reset Password'}
                        </button>

                        {error && <p className="text-red-500 text-center text-sm md:text-base">{error}</p>}
                        {success && <p className="text-green-500 text-center text-sm md:text-base">{success}</p>}
                    </form>

                    <div className="mt-4 md:mt-6 text-center text-xs md:text-sm text-gray-400">
                        Remember your password? {' '}
                        <Link to="/login" className="text-white hover:text-purple-400">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
