import React, { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Form from '../reusableComponents/Form';

const SignUp: React.FC = () => {
    const navigate =useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); 
    try {
      const response = await register(email, password);
      console.log('Registration successful:', response.data);
      navigate('/signin')
    } catch (error:any) {
      if (error.response && error.response.data) {
        console.error('API Error:', error.response.data.error);
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An unexpected error occurred.');
        console.error('Registration failed', error);
      }
    }
  };

  const navigateSignIn =() =>{
    navigate('/signin')
  }

  return (
    <Form handleSubmit={handleSubmit} label='Sign Up' email={email} setEmail={setEmail} password={password} setPassword={setPassword} errorMessage={errorMessage} handleNavigate={navigateSignIn}/>
  );
};

export default SignUp;
