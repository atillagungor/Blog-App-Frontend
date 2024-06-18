import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../Services/AuthService';
import { LoginRequestModel } from '../../Models/Requests/Auth/LoginRequestModel';
import './Login.css';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import axios, { AxiosError } from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginRequest: LoginRequestModel = { email, password };

    try {
      const token = await AuthService.login(loginRequest);
      toastr.success('Login successful!', 'Success');
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        if (axiosError.response) {
          toastr.error('Login failed. Please check your credentials and try again.', 'Error');
        } else {
          toastr.warning('Backend server is not reachable. Please try again later.', 'Warning');
        }
      } else {
        toastr.error('An unexpected error occurred. Please try again.', 'Error');
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Blog App</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="input-group remember-me">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>
        <div className="button-group">
          <button type="submit" className="login-button">Login</button>
          <button type="button" className="register-button" onClick={handleRegisterRedirect}>
            Register
          </button>
        </div>
        <a href="#" className="forgot-password">Forgot Password</a>
      </form>
    </div>
  );
};

export default Login;