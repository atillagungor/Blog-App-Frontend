import React, { useState } from 'react';
import AuthService from '../../Services/AuthService';
import { RegisterRequestModel } from '../../Models/Requests/Auth/RegisterRequestModel';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import axios, { AxiosError } from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toastr.error('Passwords do not match', 'Error');
            return;
        }

        const registerRequest: RegisterRequestModel = { email, password, userName, firstName, lastName };

        try {
            const token = await AuthService.register(registerRequest);
            toastr.success('Registration successful!', 'Success');
            navigate('/login');
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError;
                if (axiosError.response) {
                    if (axiosError.response.status === 409) {
                        toastr.warning('This email is already registered.', 'Warning');
                    } else {
                        toastr.error('Registration failed. Please try again.', 'Error');
                    }
                } else {
                    toastr.warning('Backend server is not reachable. Please try again later.', 'Warning');
                }
            } else {
                toastr.error('An unexpected error occurred. Please try again.', 'Error');
            }
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2 className="register-title">Register</h2>
                <div className="input-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter your first name"
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter your last name"
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="userName">Username</label>
                    <input
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </div>
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
                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        required
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="register-button">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;