import React from 'react';
import { Link } from 'react-router';

const Error404Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
        <div className="relative bg-rose-400 w-[150px] h-[150px] md:w-[250px] md:h-[250px] transform rotate-45 flex items-center justify-center overflow-hidden">
          {/* Pseudo-element for animated dashed border */}
          <div className="absolute inset-0 border-4 border-transparent animate-dashed-border" />
          <div className="absolute transform -rotate-45 text-3xl md:text-4xl lg:text-6xl font-bold text-white">
            404
          </div>
        </div>
      </div>
      <div className="text-center mt-6 px-4">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800">Page Not Found</h1>
        <p className="text-sm md:text-base lg:text-lg text-gray-600 mt-2 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block px-6 py-2 bg-[#f43f5e] text-white rounded-md hover:bg-[#f70f35] transition-colors text-sm md:text-base"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Error404Page;