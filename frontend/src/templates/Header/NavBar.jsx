import React from 'react';
import '../../asset/css/NavBar.css';

function NavBar() {
    const handleLogout = () => {
        // Ajoutez toute logique de déconnexion supplémentaire ici, par exemple, effacer le stockage local
        localStorage.removeItem('token');
        // Redirigez vers la page de connexion et actualisez la page
        window.location.href = '/login';
    };

    const userEmail = localStorage.getItem('email');

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark  px-2">
                <a className="navbar-brand" href="/">
                    CoinMarketCap
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
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
                        <a className="nav-item nav-link ms-5" href="#">
                            Portefeuille
                        </a>
                        {localStorage.getItem('token') && (
                            <a className="nav-item nav-link ms-5" href="/profile">
                                Mon Profil
                            </a>
                        )}
                    </div>

                    {localStorage.getItem('token') ? (
                        <div className="navbar-nav ml-auto">
                            <span>{userEmail}</span>
                            <button className="nav-item nav-link nav-conn" onClick={handleLogout}>
                                Se déconnecter
                            </button>
                        </div>
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
