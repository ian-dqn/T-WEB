import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../asset/css/RegisterUser.css'; // Assurez-vous d'importer le fichier CSS approprié

const RegisterUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
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
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                email,
                password,
            });

            console.log('Réponse du serveur:', response.data);
            navigate('/login');
            window.location.reload();
            // Si l'inscription réussit, ajoutez ici le traitement supplémentaire, par exemple, rediriger l'utilisateur, mettre à jour l'état, etc.

        } catch (error) {
            console.error('Erreur lors de la requête API:', error.message);

            // Si l'inscription échoue, affichez le message d'erreur
            setErrorMessage('Inscription échouée. Veuillez réessayer.');
        }
    };

    return (
        <div className="register-container">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <h1>  Inscription  </h1>
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

                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
};

export default RegisterUser;
