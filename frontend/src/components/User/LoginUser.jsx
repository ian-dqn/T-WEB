import React, { useState } from 'react';
import axios from 'axios';
import '../../asset/css/LoginUser.css';

const LoginUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        // Effacez le message d'erreur lorsqu'un champ est modifié
        setErrorMessage('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        // Effacez le message d'erreur lorsqu'un champ est modifié
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });

            console.log('Réponse du serveur:', response.data);

            // Si la connexion réussit, ajoutez ici le traitement supplémentaire, par exemple, rediriger l'utilisateur, mettre à jour l'état, etc.

        } catch (error) {
            console.error('Erreur lors de la requête API:', error.message);

            // Si la connexion échoue, affichez le message d'erreur
            setErrorMessage('Identifiants invalides. Veuillez réessayer.');
        }
    };

    return (
        <div className="login-container">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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

                <label htmlFor="password">Mot de passe:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />

                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default LoginUser;
