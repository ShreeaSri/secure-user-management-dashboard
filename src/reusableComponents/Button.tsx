import React from 'react';

interface ButtonProps {
  clickHandler?:()=>void;  
  disabled?:boolean;
  label?: string;      
  type?: 'button' | 'submit' | 'reset'; 
  className?: string;  
  children?: React.ReactNode; 
}

const Button: React.FC<ButtonProps> = ({ clickHandler, label, type = 'button', className, children ,disabled}) => {
  return (
    <button  disabled={disabled} type={type} className={`clickHandler text-white bg-amber-700 hover:bg-amber-600  p-2 rounded ${className}`} onClick={clickHandler}>
      {label || children}
    </button>
  );
};

export default Button;
