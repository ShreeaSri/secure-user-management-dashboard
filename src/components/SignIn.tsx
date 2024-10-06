import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/slices/authSlice';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Form from '../reusableComponents/Form';

const SignIn: React.FC = () => {
  const navigate = useNavigate()  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log(response)
      dispatch(signIn(response.data.token));
      navigate('/dashboard')
    }catch (error:any) {
        if (error.response && error.response.data) {
          console.error('API Error:', error.response.data.error);
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage('An unexpected error occurred.');
          console.error('Registration failed', error);
        }
      }
  };

  const navigateSignUp =() =>{
    navigate('/signUp')
  }

  return (  
    <Form handleSubmit={handleSubmit} label='Sign In' email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleNavigate={navigateSignUp} errorMessage={errorMessage}/>
  );
};

export default SignIn;
