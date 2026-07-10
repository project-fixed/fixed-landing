import React from 'react';

export const GradientShapes: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="animate-blob absolute -top-[150px] -left-[100px] h-[600px] w-[400px] -rotate-5 rounded-full bg-primary opacity-30 blur-[100px]"></div>
      <div className="animate-blob absolute -top-[250px] left-[300px] h-[550px] w-[600px] rotate-[125deg] rounded-full bg-primary opacity-20 blur-[100px]"></div>
      <div className="animate-blob absolute top-[250px] left-[550px] h-[250px] w-[350px] rotate-[110deg] rounded-full bg-primary opacity-20 blur-[100px]"></div>
      <div className="animate-blob absolute -top-[275px] left-[1050px] h-[600px] w-[800px] rotate-[-75deg] rounded-full bg-primary opacity-20 blur-[100px]"></div>
      <div className="animate-blob absolute -top-[325px] left-[1400px] h-[500px] w-[700px] rotate-0 rounded-full bg-primary opacity-20 blur-[100px]"></div>
    </div>
  );
};
