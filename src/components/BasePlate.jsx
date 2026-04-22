import React from 'react';

const BasePlate = ({ children }) => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden mounting-board">
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BasePlate;
