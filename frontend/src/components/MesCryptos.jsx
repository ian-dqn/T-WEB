import React, { useState } from 'react';
import '../asset/css/Accueil.css'
import Details from "../templates/Accueil/mesCrypto";


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
                   <Details  />
                </div>
            </div>
        </>
    );
}

export default DetailsCrypto;
