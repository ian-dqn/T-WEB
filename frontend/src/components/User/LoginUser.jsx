import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../asset/css/LoginUser.css";

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("userEmail", email);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("data", JSON.stringify(response.data));
      console.log("Server response:", response.data);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error in API request:", error.message);
      setErrorMessage("Identifiants incorrects");
    }
  };

  return (
    <div className="login-container">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <h1> Connexion </h1>

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

        <button type="submit">Login</button>
      </form>
      <div className="google-login-container">
        <a id="loginGoogle" href={"http://localhost:4000/auth/google"}>
          Se connecter avec Google
        </a>
      </div>
    </div>
  );
};

export default LoginUser;
