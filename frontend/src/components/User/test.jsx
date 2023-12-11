import React, { useState } from 'react';
import '../../asset/css/NavBar.css';
import Edit from './Edit';  // Import the Edit component

function NavBar() {
    // ... (existing code)

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark  px-2">
                {/* ... (existing code) */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* ... (existing code) */}
                    {localStorage.getItem('user') ? (
                        <>
                            {/* ... (existing code) */}
                            <li className="nav-item dropdown me-3">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span><b className='be-2'>Bonjour</b> <span className='text-danger'>{user.email}</span></span>
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {editMode ? (
                                        <>
                                            <li>
                                                <input
                                                    type="password"
                                                    placeholder="New Password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                />
                                            </li>
                                            <li>
                                                <button onClick={handleSaveEdit}>Save</button>
                                                <button onClick={handleCancelEdit}>Cancel</button>
                                            </li>
                                            {/* Conditionally render the Edit component when in editMode */}
                                            <li>
                                                <Edit />
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            {/* ... (existing code) */}
                                        </>
                                    )}
                                </ul>
                            </li>
                            {/* ... (existing code) */}
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
