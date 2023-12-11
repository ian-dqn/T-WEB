import React, { useState } from 'react';
import axios from 'axios'
import '../../asset/css/NavBar.css';
import Edit from '../../components/User/Edit'; // Assurez-vous de spécifier le bon chemin pour le fichier Edit

function NavBar() {
    const [editMode, setEditMode] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    const handleSaveEdit = () => {
        const userId = user._id;
        console.log(user)
      
        const dataString = localStorage.getItem('data');
        const data = JSON.parse(dataString);
        const token = data.token
        console.log(data)
        console.log(token)

        // Send a request to update the user information on the server using Axios
        axios.put(`http://localhost:5000/api/auth/${userId}`, {
            password: newPassword,
        },   {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            console.log('User updated successfully', response.data);
            setEditMode(false);
            setNewPassword('');
            // You may want to update the user information in the state here
        })
        .catch(error => {
            console.error('Error updating user', error);
        });
    };

    // ... (rest of the component)


    const handleCancelEdit = () => {
        setEditMode(false);
        setNewPassword('');
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
                                    {/* Incorporate the Edit component */}
                                    <Edit
                                        editMode={editMode}
                                        setEditMode={setEditMode}
                                        newPassword={newPassword}
                                        setNewPassword={setNewPassword}
                                        handleSaveEdit={handleSaveEdit}
                                        handleCancelEdit={handleCancelEdit}
                                    />
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
                            {/* ... (existing code) */}
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}

export default NavBar;
