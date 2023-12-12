import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import '../../asset/css/LoginUser.css';

const LoginUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Use useNavigate for navigation
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        // Clear the error message when a field is modified
        setErrorMessage('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        // Clear the error message when a field is modified
        setErrorMessage('');
    };

    const handleCryptoParamsChange = (e) => {
        const selectedCryptoParams = Array.from(e.target.selectedOptions, (option) => option.value);
        setCryptoParams(selectedCryptoParams);
    };

    const handleNewsParamsChange = (e) => {
        const selectedNewsParams = Array.from(e.target.selectedOptions, (option) => option.value);
        setNewsParams(selectedNewsParams);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
                cryptoParams,
                newsParams,
            });
            // Store the token in localStorage
            localStorage.setItem('user',JSON.stringify(response.data.user));
            localStorage.setItem('data',JSON.stringify(response.data));
            localStorage.setItem('data',JSON.stringify(response.data));
            localStorage.setItem('data',JSON.stringify(response.data));
            console.log('Server response:', response.data);
            // Redirect the user to the home page
            navigate('/');
            window.location.reload();

        } catch (error) {
            console.error('Error in API request:', error.message);

            // If login fails, display the error message
            setErrorMessage('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="login-container">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <h1>  Connexion  </h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginUser;
