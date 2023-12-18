import React from 'react';
import '../../asset/css/NavBar.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function NavBar() {
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserEmail = async () => {
            try {
                const response = await axios.get("http://localhost:3000");
                console.log("Response from server:", response);
                const { userEmail } = response.data;
                console.log("User email:", userEmail);
                setUserEmail(userEmail);
                localStorage.setItem('userEmail', userEmail);
                window.location.href('http://localhost:3000');
            } catch (error) {
                console.error("Erreur lors de la récupération de l'e-mail utilisateur:", error.message);
            }
        };
        fetchUserEmail();
    }, [navigate]);

    const handleLogout = () => {
        try {
            localStorage.removeItem('user');
            document.cookie = 'userEmail=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            window.location.href = '/login';
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error.message);
        }
    };


    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark  px-2">
                <a className="navbar-brand" href="/">
                    CoinMarketCap
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav mx-auto">
                        <a className="nav-item nav-link active ms-5" href="#">
                            Cryptomonnaies <span className="sr-only">(current)</span>
                        </a>
                        <a className="nav-item nav-link ms-5" href="#">
                            Échanges
                        </a>
                        <a className="nav-item nav-link ms-5" href="/news">
                            Actualités
                        </a>
                    </div>

                    {userEmail ? (
                        <>
                            <li className="nav-item dropdown me-3">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className='text-danger'>{userEmail || user.user.email}</span>
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Edit</a></li>
                                    <li><a className="dropdown-item" href="#">Portefeuille</a></li>
                                </ul>
                            </li>
                            <div className="navbar-nav ml-auto">
                                <button className="nav-item nav-link nav-conn" onClick={handleLogout}>
                                    Se déconnecter
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <a className="nav-item nav-link nav-conn" href="/login">
                                Se connecter
                            </a>
                            <a className="nav-item nav-link nav-ins" href="/register">
                                S'inscrire
                            </a>
                        </div>
                    )}
                </div>
            </nav>

        </>
    );
}

export default NavBar;