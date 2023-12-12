import React, { useState } from 'react';
import axios from 'axios'
import '../../asset/css/NavBar.css';
import {Link} from 'react-router-dom'
import Edit from '../../components/User/Edit'; // Assurez-vous de spécifier le bon chemin pour le fichier Edit

function NavBar() {

    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark  px-2">
                <a className="navbar-brand" href="/">
                    CoinMarketCap
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
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

                    {localStorage.getItem('user') ? (
                        <>
                            <li className="nav-item dropdown me-3">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span><b className='be-2'>Bonjour</b> <span className='text-danger'>{user.email}</span></span>
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link to={`/Edit/${user._id}`}>Edit</Link> </li>
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
