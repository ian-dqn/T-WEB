import React from 'react';
import '../../asset/css/NavBar.css';

function NavBar() {
    const handleLogout = () => {
        // Ajoutez toute logique de déconnexion supplémentaire ici, par exemple, effacer le stockage local
        localStorage.removeItem('user');
        // Redirigez vers la page de connexion et actualisez la page
        window.location.href = '/login';
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

                    {localStorage.getItem('user') ? (   
                     <>
                        <li className="nav-item dropdown me-3">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                           <span><b className='be-2'>Bonjour</b> <span className='text-danger'>{user.email}</span></span>
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
