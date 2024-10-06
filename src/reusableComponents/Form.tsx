import React from 'react';
import Button from './Button';

interface Formprops {
  handleSubmit: (e: React.FormEvent) => Promise<void>; 
  handleNavigate?: () => void;
  label: string;  
  email: string;      
  password: string;  
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  errorMessage?: string;
}

const Form: React.FC<Formprops> = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  label,
  handleNavigate,
  errorMessage
}) => {
  return (
    <div className="flex items-center justify-center h-screen p-4">
      <div className="bg-white p-6 rounded shadow-md max-w-sm w-full"> 
        <form onSubmit={handleSubmit}>
          <h1 className='flex justify-center pb-2 text-2xl text-amber-700'>{label}</h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-300 p-2 rounded mb-4 w-full"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-300 p-2 rounded mb-4 w-full"
          />
          <Button type="submit" className="w-full bg-amber-700">{label}</Button> 
          <h1 className='flex justify-center pt-2'>
            {label === 'Sign Up' ? 'Go back to' : 'Not a user?'}
            <span className='px-2 text-amber-700' onClick={handleNavigate}>
              {label === 'Sign Up' ? 'Sign In' : 'Sign Up'}
            </span>
            {label === 'Sign Up' ? 'page' : 'here'}
          </h1>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Form;
