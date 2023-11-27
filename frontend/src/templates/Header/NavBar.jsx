import React from 'react'
import { Link } from 'react-router-dom'
import '../../asset/css/NavBar.css'
function NavBar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark  px-2">
                <Link className="navbar-brand" to="/">CoinMarketCap</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav mx-auto">
                        <a className="nav-item nav-link active ms-5" href="#">Cryptomonnaies <span className="sr-only">(current)</span></a>
                        <a className="nav-item nav-link ms-5" href="#">Échanges</a>
                        <a className="nav-item nav-link ms-5" href="#">Actualités</a>
                        <a className="nav-item nav-link ms-5" href="#">Portefeuille</a>
                    </div>
                    <div className="navbar-nav ml-auto">
                        <Link className="nav-item nav-link  nav-conn" to="/login">Se connecter</Link>
                        <Link className="nav-item nav-link nav-ins" to="/register">S'inscrire</Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar
