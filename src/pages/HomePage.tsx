import LandingPic from '../assets/laning-bg.png'
import { AboutSection } from '../components/AboutSection'
import { AffiliateSection } from '../components/AffiliateSection.tsx';
import {InvestmentPlans} from "../components/InvestmentPlan.tsx";
import { NavBar } from '../components/NavBar.tsx';
import { WorkProcess } from '../components/WorkProcess';
import { useNavigate } from 'react-router-dom';
import { FAQSection } from '../components/FAQSection';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <NavBar />
            <div className="min-h-screen flex flex-col text-white mt-20 mb-10">
                {/* Hero Section */}
                <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 flex-grow">
                    {/* Text Section */}
                    <div className="text-center md:text-left md:max-w-md">
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            Unleash Your Financial Potential with Profitablefxtpro
                        </h1>
                        <div className="mt-6 space-x-4">
                            <button className="bg-purple-500 hover:bg-purple-700 text-white px-6 py-3 rounded cursor-pointer" onClick={() => navigate('/dashboard/investment')}>Invest Now</button>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="flex justify-center items-center w-full md:w-1/2">
                        <img
                        src={LandingPic}
                        alt="City Skyline"
                        className="rounded-xl"
                        />
                    </div>
                </div>
                <AboutSection />
                <InvestmentPlans />
                <AffiliateSection />
                <WorkProcess />
                <FAQSection />
            </div>
        </>
    )
}