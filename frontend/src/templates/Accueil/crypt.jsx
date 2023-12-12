import React, { useState, useEffect } from 'react';
import '../../asset/css/Accueil.css';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

const CryptoCurrencies = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const [showModal, setShowModal] = useState(false); // État pour afficher ou masquer la modal
    const [sortOrder, setSortOrder] = useState('asc'); // État pour suivre l'ordre de tri

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/cryptodata/coin');

                console.log(response.data.data);
                if (response.data && response.data.data) {
                    setCryptoData(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);
    };

    const handleSort = (columnName) => {
        let sortedData;

        if (columnName === 'Prix') {
            sortedData = [...cryptoData].sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.quote.USD.price - b.quote.USD.price;
                } else {
                    return b.quote.USD.price - a.quote.USD.price;
                }
            });
        } else if (columnName === 'Nom') {
            sortedData = [...cryptoData].sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();

                return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
            });
        } else if (columnName === 'Symbole') {
            sortedData = [...cryptoData].sort((a, b) => {
                const symbolA = a.symbol.toUpperCase();
                const symbolB = b.symbol.toUpperCase();

                return sortOrder === 'asc' ? symbolA.localeCompare(symbolB) : symbolB.localeCompare(symbolA);
            });
        } else if (columnName === '1h %') {
            sortedData = [...cryptoData].sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.quote.USD.percent_change_1h - b.quote.USD.percent_change_1h;
                } else {
                    return b.quote.USD.percent_change_1h - a.quote.USD.percent_change_1h;
                }
            });
        } else if (columnName === '24h %') {
            sortedData = [...cryptoData].sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h;
                } else {
                    return b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h;
                }
            });
        } else if (columnName === '7j %') {
            sortedData = [...cryptoData].sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.quote.USD.percent_change_7d - b.quote.USD.percent_change_7d;
                } else {
                    return b.quote.USD.percent_change_7d - a.quote.USD.percent_change_7d;
                }
            });
        }
     else {
            // Si ce n'est aucune des colonnes ci-dessus, affichez la modal
            setShowModal(true);
            return;
        }

        setCryptoData(sortedData);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };



    return (
        <div>
            <table className="table table-dark">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col" onClick={() => handleSort('Nom')}>
                        Nom
                    </th>
                    <th scope="col" onClick={() => handleSort('Symbole')}>
                        Symbole
                    </th>
                    <th scope="col" onClick={() => handleSort('Prix')}>
                        Prix
                    </th>
                    <th scope="col" onClick={() => handleSort('1h %')}>
                        1h %
                    </th>
                    <th scope="col" onClick={() => handleSort('24h %')}>
                        24h %
                    </th>
                    <th scope="col" onClick={() => handleSort('7j %')}>
                        7j %
                    </th>
                </tr>
                </thead>
                <tbody>
                {cryptoData.map((crypto, index) => (
                    <tr key={crypto.id}>
                        <td>{index + 1}</td>
                        <td> <img src={"https://s2.coinmarketcap.com/static/img/coins/64x64/"+crypto.id+".png"} width={30} />
                            {crypto.name}</td>
                        <td>{crypto.symbol}</td>
                        <td>{formatCurrency(crypto.quote.USD.price)}</td>
                        <td>
                            {crypto.quote.USD.percent_change_1h !== undefined
                                ? crypto.quote.USD.percent_change_1h.toFixed(2) + '%'
                                : 'N/A'}
                        </td>
                        <td>
                            {crypto.quote.USD.percent_change_24h !== undefined
                                ? crypto.quote.USD.percent_change_24h.toFixed(2) + '%'
                                : 'N/A'}
                        </td>
                        <td>
                            {crypto.quote.USD.percent_change_7d !== undefined
                                ? crypto.quote.USD.percent_change_7d.toFixed(2) + '%'
                                : 'N/A'}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Filter by</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="primary" onClick={handleSort}>Sort by Price ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})</Button>
                    {/* Ajoutez d'autres boutons de filtre ici si nécessaire */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={() => setShowModal(false)}>Apply Filters</Button>
                    <Button variant="danger" onClick={() => console.log('Reset filters')}>Reset Filters</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CryptoCurrencies;