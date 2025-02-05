import React from "react";

export const AboutSection: React.FC = () => {
  return (
    <section className=" text-white py-16 px-6 md:px-20 flex flex-col md:flex-row items-center mt-5">
      {/* Left Image Section */}
      <div className="flex justify-center items-center w-full md:w-1/2">
        <img
          src="https://www.tradetriump.com/assets/images/frontend/about/669aad68751f01721412968.png" // Replace with your actual illustration URL
          alt="Illustration"
          className="rounded-xl"
        />
      </div>

      {/* Right Content Section */}
      <div className="md:w-1/2 mt-10 md:mt-0 md:ml-10 text-center md:text-left">
        <h2 className="text-purple-400 text-lg font-bold uppercase">About</h2>
        <h3 className="text-4xl font-bold mt-4">Know More About Us</h3>
        <p className="mt-4 leading-relaxed">
          Trade Triump is a private online investment firm that was legally
          registered in the United States in 2020. Over the years, we have
          successfully provided profitable investment services to private
          clients and have refined our expertise in managing business with
          limited capital. During this time, we have developed our own trading
          strategy across various markets, ensuring high financial security.
        </p>
        <ul className="mt-6 space-y-3">
          <li className="flex items-start">
            <span className="text-green-400 mr-3">✔</span>
            Access a wide range of assets including stocks, bonds,
            cryptocurrencies, and alternative investments.
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-3">✔</span>
            Make informed decisions with our state-of-the-art analytics tools
            and real-time market data.
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-3">✔</span>
            Receive tailored investment strategies to meet your individual
            financial goals and risk tolerance.
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-3">✔</span>
            Enjoy high financial security with our proven strategies.
          </li>
        </ul>
      </div>
    </section>
  );
};

