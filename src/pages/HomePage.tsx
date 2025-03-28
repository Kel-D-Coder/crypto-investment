import LandingPic from '../assets/laning-bg.png'
import { AboutSection } from '../components/AboutSection'
import { AffiliateSection } from '../components/AffiliateSection.tsx';
import { InvestmentPlans } from "../components/InvestmentPlan.tsx";
import { NavBar } from '../components/NavBar.tsx';
import { WorkProcess } from '../components/WorkProcess';
import { useNavigate } from 'react-router-dom';
import { FAQSection } from '../components/FAQSection';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <NavBar />
            <div className="min-h-screen flex flex-col text-white">
                {/* Hero Section with Gradient Background */}
                <div className="relative bg-gradient-to-br from-[#0a061f] via-[#130b2f] to-[#1a1141] py-20 overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
                        <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse delay-1000"></div>
                    </div>

                    <div className="relative flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 max-w-7xl mx-auto gap-12">
                        {/* Text Section */}
                        <div className="text-center md:text-left md:w-1/2 space-y-6">
                            <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                                Unleash Your Financial Potential
                            </h1>
                            <p className="text-gray-300 text-lg md:text-xl">
                                Join thousands of investors making smart decisions with CryptoInc
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <button 
                                    onClick={() => navigate('/dashboard/investment')}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-medium text-lg transition-all transform hover:scale-105 cursor-pointer shadow-lg"
                                >
                                    Start Investing
                                </button>
                                <button 
                                    onClick={() => navigate('/register')}
                                    className="bg-transparent border-2 border-purple-500 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-purple-500/10 transition-all cursor-pointer"
                                >
                                    Create Account
                                </button>
                            </div>
                        </div>

                        {/* Image Section with Animation */}
                        <div className="w-full md:w-1/2 transform hover:scale-105 transition-transform duration-500">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl blur-2xl opacity-30"></div>
                                <img
                                    src={LandingPic}
                                    alt="Investment Platform"
                                    className="relative rounded-3xl shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-[#130b2f] py-12">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">$50M+</h3>
                            <p className="text-gray-400 mt-2">Total Investments</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">15K+</h3>
                            <p className="text-gray-400 mt-2">Active Users</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">99.9%</h3>
                            <p className="text-gray-400 mt-2">Uptime</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">24/7</h3>
                            <p className="text-gray-400 mt-2">Support</p>
                        </div>
                    </div>
                </div>

                {/* Other Sections */}
                <AboutSection />
                <InvestmentPlans />
                <AffiliateSection />
                <WorkProcess />
                <FAQSection />
            </div>
        </>
    )
}