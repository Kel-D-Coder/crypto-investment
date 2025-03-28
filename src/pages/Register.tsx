import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader } from '../components/Loader';

interface UserInfo {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    countryCode: string;
    phoneNumber: string;
}

// Add this constant at the top of your file, outside the component
const COUNTRY_CODES = [
    { code: '+1', name: 'United States/Canada' },
    { code: '+44', name: 'United Kingdom' },
    { code: '+93', name: 'Afghanistan' },
    { code: '+355', name: 'Albania' },
    { code: '+213', name: 'Algeria' },
    { code: '+376', name: 'Andorra' },
    { code: '+244', name: 'Angola' },
    { code: '+54', name: 'Argentina' },
    { code: '+374', name: 'Armenia' },
    { code: '+61', name: 'Australia' },
    { code: '+43', name: 'Austria' },
    { code: '+994', name: 'Azerbaijan' },
    { code: '+973', name: 'Bahrain' },
    { code: '+880', name: 'Bangladesh' },
    { code: '+375', name: 'Belarus' },
    { code: '+32', name: 'Belgium' },
    { code: '+501', name: 'Belize' },
    { code: '+229', name: 'Benin' },
    { code: '+975', name: 'Bhutan' },
    { code: '+591', name: 'Bolivia' },
    { code: '+387', name: 'Bosnia and Herzegovina' },
    { code: '+267', name: 'Botswana' },
    { code: '+55', name: 'Brazil' },
    { code: '+673', name: 'Brunei' },
    { code: '+359', name: 'Bulgaria' },
    { code: '+226', name: 'Burkina Faso' },
    { code: '+257', name: 'Burundi' },
    { code: '+855', name: 'Cambodia' },
    { code: '+237', name: 'Cameroon' },
    { code: '+238', name: 'Cape Verde' },
    { code: '+236', name: 'Central African Republic' },
    { code: '+235', name: 'Chad' },
    { code: '+56', name: 'Chile' },
    { code: '+86', name: 'China' },
    { code: '+57', name: 'Colombia' },
    { code: '+269', name: 'Comoros' },
    { code: '+242', name: 'Congo' },
    { code: '+506', name: 'Costa Rica' },
    { code: '+385', name: 'Croatia' },
    { code: '+53', name: 'Cuba' },
    { code: '+357', name: 'Cyprus' },
    { code: '+420', name: 'Czech Republic' },
    { code: '+45', name: 'Denmark' },
    { code: '+253', name: 'Djibouti' },
    { code: '+593', name: 'Ecuador' },
    { code: '+20', name: 'Egypt' },
    { code: '+503', name: 'El Salvador' },
    { code: '+240', name: 'Equatorial Guinea' },
    { code: '+291', name: 'Eritrea' },
    { code: '+372', name: 'Estonia' },
    { code: '+251', name: 'Ethiopia' },
    { code: '+679', name: 'Fiji' },
    { code: '+358', name: 'Finland' },
    { code: '+33', name: 'France' },
    { code: '+241', name: 'Gabon' },
    { code: '+220', name: 'Gambia' },
    { code: '+995', name: 'Georgia' },
    { code: '+49', name: 'Germany' },
    { code: '+233', name: 'Ghana' },
    { code: '+30', name: 'Greece' },
    { code: '+502', name: 'Guatemala' },
    { code: '+224', name: 'Guinea' },
    { code: '+245', name: 'Guinea-Bissau' },
    { code: '+592', name: 'Guyana' },
    { code: '+509', name: 'Haiti' },
    { code: '+504', name: 'Honduras' },
    { code: '+852', name: 'Hong Kong' },
    { code: '+36', name: 'Hungary' },
    { code: '+354', name: 'Iceland' },
    { code: '+91', name: 'India' },
    { code: '+62', name: 'Indonesia' },
    { code: '+98', name: 'Iran' },
    { code: '+964', name: 'Iraq' },
    { code: '+353', name: 'Ireland' },
    { code: '+972', name: 'Israel' },
    { code: '+39', name: 'Italy' },
    { code: '+81', name: 'Japan' },
    { code: '+962', name: 'Jordan' },
    { code: '+7', name: 'Kazakhstan/Russia' },
    { code: '+254', name: 'Kenya' },
    { code: '+82', name: 'South Korea' },
    { code: '+965', name: 'Kuwait' },
    { code: '+996', name: 'Kyrgyzstan' },
    { code: '+856', name: 'Laos' },
    { code: '+371', name: 'Latvia' },
    { code: '+961', name: 'Lebanon' },
    { code: '+231', name: 'Liberia' },
    { code: '+218', name: 'Libya' },
    { code: '+423', name: 'Liechtenstein' },
    { code: '+370', name: 'Lithuania' },
    { code: '+352', name: 'Luxembourg' },
    { code: '+853', name: 'Macau' },
    { code: '+389', name: 'Macedonia' },
    { code: '+261', name: 'Madagascar' },
    { code: '+265', name: 'Malawi' },
    { code: '+60', name: 'Malaysia' },
    { code: '+960', name: 'Maldives' },
    { code: '+223', name: 'Mali' },
    { code: '+356', name: 'Malta' },
    { code: '+222', name: 'Mauritania' },
    { code: '+230', name: 'Mauritius' },
    { code: '+52', name: 'Mexico' },
    { code: '+373', name: 'Moldova' },
    { code: '+377', name: 'Monaco' },
    { code: '+976', name: 'Mongolia' },
    { code: '+382', name: 'Montenegro' },
    { code: '+212', name: 'Morocco' },
    { code: '+258', name: 'Mozambique' },
    { code: '+95', name: 'Myanmar' },
    { code: '+264', name: 'Namibia' },
    { code: '+977', name: 'Nepal' },
    { code: '+31', name: 'Netherlands' },
    { code: '+64', name: 'New Zealand' },
    { code: '+505', name: 'Nicaragua' },
    { code: '+227', name: 'Niger' },
    { code: '+234', name: 'Nigeria' },
    { code: '+47', name: 'Norway' },
    { code: '+968', name: 'Oman' },
    { code: '+92', name: 'Pakistan' },
    { code: '+970', name: 'Palestine' },
    { code: '+507', name: 'Panama' },
    { code: '+675', name: 'Papua New Guinea' },
    { code: '+595', name: 'Paraguay' },
    { code: '+51', name: 'Peru' },
    { code: '+63', name: 'Philippines' },
    { code: '+48', name: 'Poland' },
    { code: '+351', name: 'Portugal' },
    { code: '+974', name: 'Qatar' },
    { code: '+40', name: 'Romania' },
    { code: '+7', name: 'Russia' },
    { code: '+250', name: 'Rwanda' },
    { code: '+966', name: 'Saudi Arabia' },
    { code: '+221', name: 'Senegal' },
    { code: '+381', name: 'Serbia' },
    { code: '+65', name: 'Singapore' },
    { code: '+421', name: 'Slovakia' },
    { code: '+386', name: 'Slovenia' },
    { code: '+252', name: 'Somalia' },
    { code: '+27', name: 'South Africa' },
    { code: '+34', name: 'Spain' },
    { code: '+94', name: 'Sri Lanka' },
    { code: '+249', name: 'Sudan' },
    { code: '+46', name: 'Sweden' },
    { code: '+41', name: 'Switzerland' },
    { code: '+963', name: 'Syria' },
    { code: '+886', name: 'Taiwan' },
    { code: '+992', name: 'Tajikistan' },
    { code: '+255', name: 'Tanzania' },
    { code: '+66', name: 'Thailand' },
    { code: '+228', name: 'Togo' },
    { code: '+216', name: 'Tunisia' },
    { code: '+90', name: 'Turkey' },
    { code: '+993', name: 'Turkmenistan' },
    { code: '+256', name: 'Uganda' },
    { code: '+380', name: 'Ukraine' },
    { code: '+971', name: 'United Arab Emirates' },
    { code: '+598', name: 'Uruguay' },
    { code: '+998', name: 'Uzbekistan' },
    { code: '+58', name: 'Venezuela' },
    { code: '+84', name: 'Vietnam' },
    { code: '+967', name: 'Yemen' },
    { code: '+260', name: 'Zambia' },
    { code: '+263', name: 'Zimbabwe' },
];

export const Register: React.FC = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        countryCode: '+1',
        phoneNumber: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => { 
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value

        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            setSuccess('');
            const response = await axios.post(`${apiUrl}/register`, userInfo);
            setLoading(false);
            setSuccess(response.data.msg);
            navigate('/login');
        } catch (error) {
            setLoading(false);
            setSuccess('');
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.msg || 'An error occurred during registration');
            } else {
                setError('An unexpected error occurred');
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a061f] via-[#130b2f] to-[#1a1141] text-white relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse delay-1000"></div>
            </div>

            {/* Header */}
            <div className="relative px-4 md:px-20 py-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">Create Account</h1>
                    <div className="flex items-center gap-2 text-sm">
                        <Link to="/" className="hover:text-purple-400 transition-colors flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            Home
                        </Link>
                        <span className="text-gray-500">/</span>
                        <span className="text-purple-400">Register</span>
                    </div>
                </div>
            </div>

            {/* Form Container */}
            <div className="container mx-auto px-4 relative z-10 pb-20">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-[#130b2f]/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl border border-purple-500/20">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Form Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Email Field */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                    <input 
                                        type="email"
                                        className="w-full bg-[#1a1141]/50 rounded-xl p-3.5 border border-purple-500/20 focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 transition-colors"
                                        placeholder="Enter your email"
                                        name="email"
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Username Field */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                                    <input 
                                        type="text"
                                        className="w-full bg-[#1a1141]/50 rounded-xl p-3.5 border border-purple-500/20 focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 transition-colors"
                                        placeholder="Choose a username"
                                        name="username"
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Address Fields */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                                    <input 
                                        type="text"
                                        className="w-full bg-[#1a1141]/50 rounded-xl p-3.5 border border-purple-500/20 focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 transition-colors"
                                        placeholder="Enter your address"
                                        name="address"
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* City and State */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                                    <input 
                                        type="text"
                                        className="w-full bg-[#1a1141]/50 rounded-xl p-3.5 border border-purple-500/20 focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 transition-colors"
                                        placeholder="Your city"
                                        name="city"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                                    <input 
                                        type="text"
                                        className="w-full bg-[#1a1141]/50 rounded-xl p-3.5 border border-purple-500/20 focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 transition-colors"
                                        placeholder="Your state"
                                        name="state"
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* ZIP and Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">ZIP Code</label>
                                    <input 
                                        type="text"
                                        className="w-full bg-[#1a1141]/50 rounded-xl p-3.5 border border-purple-500/20 focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 transition-colors"
                                        placeholder="ZIP code"
                                        name="zipCode"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                                    <div className="flex gap-2">
                                        <select
                                            name="countryCode"
                                            onChange={handleChange}
                                            value={userInfo.countryCode}
                                            className="w-32 bg-[#1a1141]/50 rounded-xl p-3.5 border border-purple-500/20 focus:border-purple-500 focus:outline-none text-white"
                                        >
                                            {COUNTRY_CODES.map(country => (
                                                <option key={country.code} value={country.code}>
                                                    {country.code}
                                                </option>
                                            ))}
                                        </select>
                                        <input 
                                            type="tel"
                                            className="flex-1 bg-[#1a1141]/50 rounded-xl p-3.5 border border-purple-500/20 focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 transition-colors"
                                            placeholder="Phone number"
                                            name="phoneNumber"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Password Fields */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                                    <div className="relative">
                                        <input 
                                            type={showPassword ? "text" : "password"}
                                            className="w-full bg-[#1a1141]/50 rounded-xl p-3.5 border border-purple-500/20 focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 transition-colors pr-10"
                                            placeholder="Create password"
                                            name="password"
                                            onChange={handleChange}
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

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                                    <div className="relative">
                                        <input 
                                            type={showConfirmPassword ? "text" : "password"}
                                            className="w-full bg-[#1a1141]/50 rounded-xl p-3.5 border border-purple-500/20 focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 transition-colors pr-10"
                                            placeholder="Confirm password"
                                            name="confirmPassword"
                                            onChange={handleChange}
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
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-xl font-medium transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                disabled={loading}
                            >
                                {loading ? <Loader /> : 'Create Account'}
                            </button>

                            {/* Error/Success Messages */}
                            {error && <p className="text-red-500 text-center">{error}</p>}
                            {success && <p className="text-green-500 text-center">{success}</p>}
                        </form>

                        {/* Login Link */}
                        <div className="mt-6 text-center text-gray-400">
                            Already have an account?{' '}
                            <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
                                Login here
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 