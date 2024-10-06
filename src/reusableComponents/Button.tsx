import React from 'react';

interface ButtonProps {
  label?: string;      
  type?: 'button' | 'submit' | 'reset'; 
  className?: string;  
  children?: React.ReactNode; 
}

const Button: React.FC<ButtonProps> = ({  label, type = 'button', className, children }) => {
  return (
    <button  type={type} className={`bg-blue-500 text-white p-2 rounded ${className}`}>
      {label || children}
    </button>
  );
};

export default Button;
