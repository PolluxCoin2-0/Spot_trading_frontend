import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-row justify-center  gap-2">
      <div className="w-3 h-3 rounded-full bg-black animate-bounce"></div>
      <div className="w-3 h-3 rounded-full bg-black animate-bounce [animation-delay:-0.2s]"></div>
      <div className="w-3 h-3 rounded-full bg-black animate-bounce [animation-delay:-0.4s]"></div>
    </div>
  );
};

export default Loader;