import React, { useState } from 'react';
import '../asset/css/Accueil.css'
import Details from "../templates/Accueil/mesCrypto";
import CryptoList from './User/CryptoList';


function MyCrypto() {
    const [isChecked, setIsChecked] = useState(true);
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    {user && user.crypto ? <CryptoList /> : <Details  />}
                </div>
            </div>
        </>
    );
}

export default MyCrypto;