import React from "react";

export const AboutSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-20 px-6 md:px-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a061f] to-[#130b2f]">
        <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-3xl top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-3xl bottom-20 -right-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          {/* Left Image Section */}
          <div className="w-full md:w-1/2">
            <div className="relative group">
              {/* Image Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-2xl opacity-30 group-hover:opacity-40 transition-opacity"></div>
              
              <img
                src="https://www.tradetriump.com/assets/images/frontend/about/669aad68751f01721412968.png"
                alt="About Trade Triump"
                className="relative rounded-2xl shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Right Content Section */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="space-y-2">
              <h2 className="text-sm font-bold tracking-wider text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text uppercase">
                About Us
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Know More About Our Journey
              </h3>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Trade Triump is a private online investment firm that was legally
              registered in the United States in 2020. Over the years, we have
              successfully provided profitable investment services to private
              clients and have refined our expertise in managing business with
              limited capital.
            </p>

            <div className="space-y-4">
              {[
                "Access a wide range of assets including stocks, bonds, cryptocurrencies, and alternative investments.",
                "Make informed decisions with our state-of-the-art analytics tools and real-time market data.",
                "Receive tailored investment strategies to meet your individual financial goals and risk tolerance.",
                "Enjoy high financial security with our proven strategies."
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 group">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mt-1">
                    <svg 
                      className="w-4 h-4 text-white transform group-hover:scale-110 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

