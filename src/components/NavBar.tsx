import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';


export const NavBar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload(); // Or use your routing logic
    };

    return (
        <nav className="text-white shadow-md relative">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <div className="text-2xl font-bold">Profitablefxtpro</div>

                {/* Buttons */}
                <div className="hidden md:flex space-x-4">
                    {isAuthenticated ? (
                        <>
                            <button className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded cursor-pointer" onClick={() => navigate('/dashboard')}>
                                Dashboard
                            </button>
                            <button className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded cursor-pointer" onClick={handleLogout}>
                                Logout
                            </button>
                            {
                                JSON.parse(localStorage.getItem('currentUser') || '{}').role === 'admin' && (
                                    <button className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded cursor-pointer" onClick={() => navigate('/admin/deposits')}>
                                        Admin
                                    </button>
                                )
                            }
                        </>
                    ) : (
                        <>
                            <button className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded cursor-pointer" onClick={() => navigate('/register')}>
                                Register
                            </button>
                            <button className="bg-transparent border border-purple-500 hover:bg-purple-700 hover:text-white px-4 py-2 rounded cursor-pointer" onClick={() => navigate('/login')}>
                                Login
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-2xl focus:outline-none cursor-pointer"
                    onClick={toggleMobileMenu}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`${
                    isMobileMenuOpen ? "block" : "hidden"
                } md:hidden bg-blue-900 text-white absolute top-full left-0 w-full z-50`}
            >
                <ul className="flex flex-col items-center space-y-4 py-4">
                    {/* <li className="hover:text-purple-300 cursor-pointer">Home</li>
                    <li className="hover:text-purple-300 cursor-pointer">Plan</li>
                    <li className="hover:text-purple-300 cursor-pointer">Blog</li>
                    <li className="hover:text-purple-300 cursor-pointer">Contact</li> */}
                    <div className="flex flex-col space-y-4 mt-4">
                        {isAuthenticated ? (
                            <>
                                <button className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded cursor-pointer" onClick={() => navigate('/dashboard')}>
                                    Dashboard
                                </button>
                                <button className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded cursor-pointer" onClick={handleLogout}>
                                    Logout
                                </button>
                                {
                                JSON.parse(localStorage.getItem('currentUser') || '{}').role === 'admin' && (
                                    <button className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded cursor-pointer" onClick={() => navigate('/admin/deposits')}>
                                        Admin
                                    </button>
                                )
                            }
                            </>
                        ) : (
                            <>
                                <button className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded cursor-pointer" onClick={() => navigate('/register')}>
                                    Register
                                </button>
                                <button className="bg-transparent border border-purple-500 hover:bg-purple-700 hover:text-white px-4 py-2 rounded cursor-pointer" onClick={() => navigate('/login')}>
                                    Login
                                </button>
                            </>
                        )}
                    </div>
                </ul>
            </div>
        </nav>
    );
};
