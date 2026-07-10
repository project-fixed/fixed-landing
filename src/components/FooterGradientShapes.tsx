import React from 'react';

export const FooterGradientShapes: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Left cyan/teal blob */}
      <div className="animate-blob bg-footer-blob-1 absolute -bottom-[200px] -left-[100px] h-[600px] w-[500px] rounded-full opacity-10 blur-[120px]"></div>

      {/* Center-left primary/steel blue blob */}
      <div
        className="animate-blob bg-footer-blob-2 absolute -bottom-[250px] left-[20%] h-[600px] w-[700px] rotate-[-10deg] rounded-full opacity-50 blur-[140px]"
        style={{ animationDelay: '2s' }}
      ></div>

      {/* Center-right blue/indigo blob */}
      <div
        className="animate-blob bg-footer-blob-3 absolute right-[25%] -bottom-[150px] h-[500px] w-[600px] rotate-[15deg] rounded-full opacity-15 blur-[120px]"
        style={{ animationDelay: '4s' }}
      ></div>

      {/* Right deep blue blob */}
      <div
        className="animate-blob bg-footer-blob-4 absolute -right-[150px] -bottom-[300px] h-[700px] w-[600px] rotate-[-5deg] rounded-full opacity-15 blur-[150px]"
        style={{ animationDelay: '6s' }}
      ></div>
    </div>
  );
};
