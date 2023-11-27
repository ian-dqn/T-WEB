import React, { useState } from 'react';
import '../asset/css/Accueil.css'
import img1 from "../asset/img/23930.png";
// import img2 from "../asset/img/28467.png";
import img3 from "../asset/img/28468.png";
import img4 from "../asset/img/5426.png";
import A from '../asset/img/A.png'
import B from '../asset/img/B.png'
import C from '../asset/img/c.jpg'
import Table from '../templates/Accueil/Table';


function Accueil() {
    // Use state to track the checked state
    const [isChecked, setIsChecked] = useState(true);

    // Define an onChange handler to update the state when the checkbox is clicked
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <>
            <div className="container">
                <div className="row mt-5 mb-5">
                    <div className="col-md-8 info">
                        <h1>Top 100 Crypto-monnaies par capitalisation de marché</h1>
                        <p>
                            La capitalisation boursière globale du marché crypto est de €1.3T,
                            soit une augmentation de <span><i className="fa-solid fa-arrow-up"></i> 1.62%</span> <span>au cours des dernières 24 heures. Lire plus</span>
                        </p>
                    </div>
                    <div className="col-md-4 swichBtn">
                        <span>Essentiels</span>
                        <div className="form-check form-switch">
                            {/* Use the state variable and the onChange handler */}
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckChecked"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-4 mb-5">
                        <div id="carouselExampleDark" className="carousel carousel-dark slide">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            </div>
                            <div className="carousel-inner">

                                <div className="carousel-item active" data-bs-interval="2000">
                                    <div className="titre">
                                        <i className="fa-solid fa-clock"></i>
                                        <span>Récemment Ajoutées</span>
                                    </div>
                                    <div className="plus">
                                        <span>Plus</span>
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </div>
                                    <div className="box-caruse">
                                        <div className="info">
                                            <div className='box'>
                                                <span>1</span>
                                                <img src={img1} alt="img 1" className='img-info' />
                                                <h6>lorem</h6>
                                            </div>
                                            <div className='box'>
                                                <span>3</span>
                                                <img src={img3} alt="img 3" className='img-info' />
                                                <h6>lorem</h6>
                                            </div>
                                            <div className='box'>
                                                <span>4</span>
                                                <img src={img4} alt="img 4" className='img-info' />
                                                <h6>lorem</h6>
                                            </div>
                                        </div>
                                        <div className="numbers">
                                            <h5>€ 10124.16564</h5>
                                            <h5>€ 10124.16564</h5>
                                            <h5>€ 10124.16564</h5>
                                        </div>
                                    </div>
                                    {/* <div className="carousel-caption">
                                        <h2>hooo</h2>
                                       
                                    </div> */}
                                </div>
                                <div className="carousel-item" data-bs-interval="2000">
                                    <div className="titre">
                                        <i className="fa-solid fa-clock"></i>
                                        <span>Récemment Ajoutées</span>
                                    </div>
                                    <div className="plus">
                                        <span>Plus</span>
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </div>
                                    <div className="box-caruse">
                                        <div className="info">
                                            <div className='box'>
                                                <span>1</span>
                                                <img src={img1} alt="img 1" className='img-info' />
                                                <h6>lorem</h6>
                                            </div>
                                            <div className='box'>
                                                <span>3</span>
                                                <img src={img3} alt="img 3" className='img-info' />
                                                <h6>lorem</h6>
                                            </div>
                                            <div className='box'>
                                                <span>4</span>
                                                <img src={img4} alt="img 4" className='img-info' />
                                                <h6>lorem</h6>
                                            </div>
                                        </div>
                                        <div className="numbers text-number">
                                            <p className='text-danger'><i className="fa-solid fa-arrow-down"></i> 00.67%</p>
                                            <p className='text-success'><i className="fa-solid fa-arrow-up"></i> 85.99%</p>
                                            <p className='text-danger'><i className="fa-solid fa-arrow-down"></i> 20.75%</p>
                                        </div>
                                    </div>
                                    {/* <div className="carousel-caption">
                                        <h2>hooo</h2>
                                       
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-5">
                        <div id="carouselExampleDark1" className="carousel carousel-dark slide">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleDark1" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleDark1" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            </div>
                            <div className="carousel-inner">

                                <div className="carousel-item active" data-bs-interval="2000">
                                    <div className="titre text-gold">
                                        <i className="fa-solid fa-star"></i>
                                        <span>Principales publications de la communauté</span>
                                    </div>
                                    <div className="plus">
                                        <span>Plus</span>
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </div>
                                    <div className="box-caruse">
                                        <div className="info">

                                            <div className='box'>
                                                <img src={A} alt="img 1" className='img-info' />
                                                <i className="fa-solid fa-certificate"></i>
                                                <span>@1inch</span>
                                            </div>
                                            <div className='box'>
                                                <img src={B} alt="img 1" className='img-info' />
                                                <i className="fa-solid fa-certificate"></i>
                                                <span>@1inch</span>
                                            </div>
                                            <div className='box'>
                                                <img src={C} alt="img 1" className='img-info' />
                                                <i className="fa-solid fa-certificate"></i>
                                                <span>@1inch</span>
                                            </div>
                                        </div>
                                        <div className="numbers">
                                            <span className='btn-text'>+ S'abonner</span>
                                            <span className='btn-text'>+ S'abonner</span>
                                            <span className='btn-text'>+ S'abonner</span>
                                        </div>
                                    </div>
                                    {/* <div className="carousel-caption">
                                        <h2>hooo</h2>
                                       
                                    </div> */}
                                </div>
                                <div className="carousel-item" data-bs-interval="2000">
                                    <div className="titre">
                                        <i className="fa-solid fa-clock"></i>
                                        <span>Récemment Ajoutées</span>
                                    </div>
                                    <div className="plus">
                                        <span>Plus</span>
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </div>
                                    <div className="box-caruse">
                                        <div className="info">
                                            <div className='box'>
                                                <span>1</span>
                                                <img src={img1} alt="img 1" className='img-info' />
                                                <h6>lorem</h6>
                                            </div>
                                            <div className='box'>
                                                <span>3</span>
                                                <img src={img3} alt="img 3" className='img-info' />
                                                <h6>lorem</h6>
                                            </div>
                                            <div className='box'>
                                                <span>4</span>
                                                <img src={img4} alt="img 4" className='img-info' />
                                                <h6>lorem</h6>
                                            </div>
                                        </div>
                                        <div className="numbers text-number">
                                            <p className='text-danger'><i className="fa-solid fa-arrow-down"></i> 00.67%</p>
                                            <p className='text-success'><i className="fa-solid fa-arrow-up"></i> 85.99%</p>
                                            <p className='text-danger'><i className="fa-solid fa-arrow-down"></i> 20.75%</p>
                                        </div>
                                    </div>
                                    {/* <div className="carousel-caption">
                                        <h2>hooo</h2>
                                       
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-5 col-sm-12">
                        <div className="graph col-12">
                        <span className='total'>74</span>
                         <span>Cupidité </span>
                        <svg width="177" height="89" viewBox="0 0 177 89" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M173.262 88C174.967 88 176.354 86.6173 176.294 84.9135C175.747 69.3495 171.069 54.2074 162.739 41.0369C161.829 39.5992 159.909 39.2385 158.502 40.1946V40.1946C157.091 41.1536 156.731 43.073 157.639 44.5176C165.272 56.6598 169.575 70.5911 170.116 84.9137C170.181 86.6174 171.557 88 173.262 88V88Z" fill="#16C784"></path><path d="M156.897 37.9461C158.276 36.9419 158.582 35.0049 157.527 33.664C147.855 21.3698 135.074 11.8665 120.501 6.13374C118.919 5.51151 117.158 6.35475 116.589 7.9564V7.9564C116.019 9.56129 116.861 11.3189 118.444 11.9467C131.848 17.2616 143.611 26.0103 152.545 37.3081C153.6 38.6424 155.522 38.9473 156.897 37.9461V37.9461Z" fill="#93D900"></path><path d="M113.03 6.79368C113.529 5.1655 112.613 3.4359 110.968 2.99624C95.9311 -1.02229 80.0941 -0.998203 65.0696 3.06605C63.4258 3.51072 62.5154 5.24312 63.0192 6.86979V6.86979C63.5221 8.49352 65.2439 9.3971 66.8859 8.95738C80.732 5.24947 95.3122 5.22729 109.17 8.89306C110.813 9.32777 112.532 8.41894 113.03 6.79368V6.79368Z" fill="#F3D42F"></path><path d="M60.1455 7.80322C59.5852 6.19848 57.8286 5.34566 56.2435 5.95929C41.7314 11.5772 28.9667 20.9284 19.2489 33.0606C18.1823 34.3922 18.4716 36.3318 19.842 37.3481V37.3481C21.2083 38.3612 23.1323 38.0731 24.1989 36.7482C33.1738 25.6002 44.9213 16.992 58.2681 11.7833C59.8547 11.1641 60.707 9.41116 60.1455 7.80322V7.80322Z" fill="#EA8C00"></path><path d="M17.7126 40.3161C16.3039 39.3625 14.3841 39.7265 13.4772 41.1658C5.1935 54.313 0.544063 69.4152 0.00210452 84.935C-0.0573952 86.6388 1.3307 88.0212 3.03561 88.0208V88.0208C4.74051 88.0203 6.11617 86.6374 6.18018 84.9337C6.71672 70.6522 10.9931 56.7581 18.5827 44.6376C19.4882 43.1915 19.1255 41.2726 17.7126 40.3161V40.3161Z" fill="#EA3943"></path></svg>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                  <Table />
                </div>
            </div>
        </>
    );
}

export default Accueil;
