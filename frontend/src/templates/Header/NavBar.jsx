import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../asset/css/NavBar.css";
import profile from './1012.jpg'

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("userEmail");
    if (email) {
      localStorage.setItem("userEmail", email); // Ajouter cette ligne
      setUserEmail(email);
      window.history.replaceState(null, null, window.location.pathname);
    } else {
      // Récupérer l'email du stockage local si l'URL n'a pas de paramètre userEmail
      const storedEmail = localStorage.getItem("userEmail");
      if (storedEmail) {
        setIsLoggedIn(true);
        setUserEmail(storedEmail);
      }
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("user");
      localStorage.removeItem("data");
      setIsLoggedIn(false);
      window.location.href = "/login";
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error.message);
    }
  };

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark px-2">
        <a className="navbar-brand" href="/">
          CryptoMarket
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav mx-auto">
            <Link
              className={`nav-item nav-link ms-5 ${location.pathname === "/" ? "active" : ""
                }`}
              to="/"
            >
              Cryptomonnaies <span className="sr-only">(current)</span>
            </Link>
            {user || userEmail ? (
              <Link className={`nav-item nav-link ms-5 ${location.pathname === '/myCrypto' ? 'active' : ''}`} to="/myCrypto">
                Mes Cryptos
              </Link>
            ) : null}
            <Link
              className={`nav-item nav-link ms-5 ${location.pathname === "/news" ? "active" : ""
                }`}
              to="/news"
            >
              Actualités
            </Link>
            {user && user.isAdmin ? (
              <Link
                className={`nav-item nav-link ms-5 ${location.pathname === "/dashborad" ? "active" : ""}`}
                to="/dashboard"
              >
                Dashboard
              </Link>
            ) : null}
          </div>

          {isLoggedIn ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <span className="nav-link">Bonjour, {userEmail}</span>
              </li>
              <li className="nav-item dropdown pe-2 d-flex align-items-center">
                <a className="nav-link text-white p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={profile} className="avatar avatar-sm me-2" alt="User" />
                  <i className="fa fa-angle-down cursor-pointer"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                  <li className="mb-2">
                    <span className="text-sm font-weight-normal mb-1">
                      {user && user._id ? (
                        <Link className="fw-bold" to={`/edit/${user._id}`} style={{ color: "#0d1421" }}>
                          Profil
                        </Link>
                      ) : (
                        <span className="fw-bold" style={{ color: "#0d1421" }}>
                          Profil
                        </span>
                      )}
                    </span>
                  </li>
                  <li>
                    <span className="text-sm font-weight-normal mb-1">
                      <button className="font-weight-bold border-button-logout" onClick={handleLogout}>
                        Se déconnecter
                      </button>
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link nav-conn" href="/login">
                  Se connecter
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-ins" href="/register">
                  S'inscrire
                </a>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;