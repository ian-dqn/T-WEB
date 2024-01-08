import React from 'react';
import Sidebar from '../../templates/Header/Sidebar';

const MesNews = () => {
    // Suppose you get the user object from somewhere, either from props or state
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    // Check if the user object exists and has the crypto property
    if (user && user.crypto && user.crypto.length > 0) {
        return (
            <>
                <div className='container'>
                    <div className='aside-profile'>
                        <Sidebar />
                    </div>
                    <div className='aside-profile'>
                        <h2>Mes Articles</h2>
                        <ul>
                            {user.crypto.map((crypto, index) => (
                                <li key={index}>{crypto}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </>



            // //     <div className="">
            // <div className='aside-profile'>
            // <Sidebar />
        );
    } else {
        // Handle the case where the user object or crypto property is not available or empty
        return (
            <div className='container'>
                <div className='aside-profile'>
                    <Sidebar />
                    <div className='aside-profile-form text-center text-danger'>
                        <h2>Mes Cryptos</h2>
                        <p>Aucune article trouvée.</p>
                        <p className='text-success'>choisir un article : </p>
                    </div>
                </div>

            </div>
        );
    }
};

export default MesNews;