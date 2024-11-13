"use client";

import React from "react";

interface ButtonProps {
  buttonText: string;
  onClick: () => void;
}

const Button = ({ buttonText, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default Button;
