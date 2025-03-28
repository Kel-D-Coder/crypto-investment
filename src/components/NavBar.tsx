import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

export const NavBar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const isAdmin = JSON.parse(localStorage.getItem('currentUser') || '{}').role === 'admin';

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <nav className="relative z-50 border-b border-purple-500/20">
            <div className="bg-[#1a1141]/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                                CryptoInvestment
                            </h1>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-4">
                            {isAuthenticated ? (
                                <>
                                    <button 
                                        onClick={() => navigate('/dashboard')}
                                        className="bg-[#130b2f] hover:bg-[#1f1356] text-white px-6 py-2.5 rounded-xl font-medium transition-all transform hover:scale-[1.02] border border-purple-500/20"
                                    >
                                        Dashboard
                                    </button>
                                    {isAdmin && (
                                        <button 
                                            onClick={() => navigate('/admin/deposits')}
                                            className="bg-[#130b2f] hover:bg-[#1f1356] text-white px-6 py-2.5 rounded-xl font-medium transition-all transform hover:scale-[1.02] border border-purple-500/20"
                                        >
                                            Admin
                                        </button>
                                    )}
                                    <button 
                                        onClick={handleLogout}
                                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all transform hover:scale-[1.02]"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button 
                                        onClick={() => navigate('/register')}
                                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all transform hover:scale-[1.02]"
                                    >
                                        Register
                                    </button>
                                    <button 
                                        onClick={() => navigate('/login')}
                                        className="bg-[#130b2f] hover:bg-[#1f1356] text-white px-6 py-2.5 rounded-xl font-medium transition-all transform hover:scale-[1.02] border border-purple-500/20"
                                    >
                                        Login
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#130b2f] transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                <div className="bg-[#130b2f] border-t border-purple-500/20 px-6 py-4 space-y-3">
                    {isAuthenticated ? (
                        <>
                            <button 
                                onClick={() => navigate('/dashboard')}
                                className="w-full bg-[#1a1141] hover:bg-[#1f1356] text-white px-4 py-2.5 rounded-xl font-medium transition-colors text-left"
                            >
                                Dashboard
                            </button>
                            {isAdmin && (
                                <button 
                                    onClick={() => navigate('/admin/deposits')}
                                    className="w-full bg-[#1a1141] hover:bg-[#1f1356] text-white px-4 py-2.5 rounded-xl font-medium transition-colors text-left"
                                >
                                    Admin
                                </button>
                            )}
                            <button 
                                onClick={handleLogout}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button 
                                onClick={() => navigate('/register')}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors"
                            >
                                Register
                            </button>
                            <button 
                                onClick={() => navigate('/login')}
                                className="w-full bg-[#1a1141] hover:bg-[#1f1356] text-white px-4 py-2.5 rounded-xl font-medium transition-colors"
                            >
                                Login
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
