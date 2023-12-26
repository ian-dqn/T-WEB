import React, { useState } from 'react';
import '../asset/css/Accueil.css'
import IdCrypto from "../templates/Accueil/details.jsx";


function DetailsCrypto() {
    const [isChecked, setIsChecked] = useState(true);
    const user = localStorage.getItem('token') ;

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <IdCrypto  />
                </div>
            </div>
        </>
    );
}

export default DetailsCrypto;
