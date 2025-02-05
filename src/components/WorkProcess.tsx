import React from 'react';

const steps = [
    {
        number: "1",
        title: "Registration",
        icon: (
            <svg className="w-16 h-16 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
            </svg>
        )
    },
    {
        number: "2",
        title: "Deposit",
        icon: (
            <svg className="w-16 h-16 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
        )
    },
    {
        number: "3",
        title: "Investing",
        icon: (
            <svg className="w-16 h-16 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
            </svg>
        )
    },
    {
        number: "4",
        title: "Profit",
        icon: (
            <svg className="w-16 h-16 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
            </svg>
        )
    },
    {
        number: "5",
        title: "Withdraw",
        icon: (
            <svg className="w-16 h-16 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
            </svg>
        )
    }
];

export const WorkProcess: React.FC = () => {
    return (
        <section className="bg-[#0a061f] text-white py-16 px-6 md:px-20">
            <div className="text-center mb-16">
                <div className="bg-purple-600 text-sm inline-block px-4 py-1 rounded-full mb-4">
                    WORK PROCESS
                </div>
                <h2 className="text-4xl font-bold">5 Simple Steps to Start Investing</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {steps.map((step, index) => (
                    <div 
                        key={step.number}
                        className="relative flex flex-col items-center"
                    >
                        <div className="bg-[#130b2f] rounded-2xl p-8 flex flex-col items-center w-full aspect-square hover:scale-105 transition-transform">
                            {step.icon}
                            <h3 className="text-xl font-bold mt-4">{step.title}</h3>
                        </div>
                        
                        {/* Connection line */}
                        {index < steps.length - 1 && (
                            <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-purple-600" />
                        )}
                        
                        {/* Step number */}
                        <div className="absolute -top-4 left-4 bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                            {step.number}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
} 