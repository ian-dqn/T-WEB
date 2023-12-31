import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { Line } from 'react-chartjs-2';
import {Link, useParams} from 'react-router-dom';
import '../../asset/css/Paginate.css';
import '../../asset/css/details.css'
import CryptoCurrencies from '../Accueil/crypt';

const IdCrypto = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 20;
    const startIdx = currentPage * itemsPerPage;

    const { coinId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/cryptodata/coin/${coinId}`);
                console.log(response.data.data);

                if (response.data && response.data.data[coinId]) {
                    setCryptoData(response.data.data[coinId]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [coinId]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);
    };

    const handleSort = (columnName) => {
        setCurrentPage(0);

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
        } else {
            setShowModal(true);
            return;
        }

        setCryptoData(sortedData);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const displayedData = () => {
        const start = currentPage * itemsPerPage;
        const end = (currentPage + 1) * itemsPerPage;

        // Assurez-vous que cryptoData est un tableau avant d'appeler slice
        const slicedData = Array.isArray(cryptoData) ? cryptoData.slice(start, end) : [];

        return slicedData;
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                labels: ['7j', '24h', '1h'],
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const generateChartData = (crypto) => {
        if (!crypto.quote || !crypto.quote.USD) {
            // Si crypto.quote ou crypto.quote.USD est undefined, retournez un objet vide ou une valeur par défaut
            return { labels: [], datasets: [] };
        }

        return {
            labels: ['7j', '24h', '1h'],
            datasets: [
                {
                    data: [
                        crypto.quote.USD.percent_change_7d || 0,
                        crypto.quote.USD.percent_change_24h || 0,
                        crypto.quote.USD.percent_change_1h || 0,
                    ],
                    fill: false,
                    borderColor: 'yellow',
                    key: crypto.id,
                },
            ],
        };
    };

    return (
        <div>
            {cryptoData && cryptoData.name && (
                <div className="sidebar">
                    <div>
                        <Link to="/">
                            <button style={{ backgroundColor: 'black' }} type="button">Retour</button>
                        </Link>
                    </div>
                    <div id="name">
                        <img
                            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${cryptoData.id}.png`}
                        />
                        <span>{cryptoData.name}</span>
                        <span style={{ marginLeft: '10px' }}>{cryptoData.symbol}</span>
                        <p style={{ fontSize: '25px',fontWeight: 'bold' }}> {formatCurrency(cryptoData.quote?.USD?.price)}</p>
                    </div>

                </div>
            )}
            <div className="chart">
                <Line
                    data={generateChartData(cryptoData)}
                    options={{
                        ...options,
                        responsive: true,
                        maintainAspectRatio: false,
                    }}
                />
            </div>

            <div className="crypto-currencies-container">
                <CryptoCurrencies />
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Filter by</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="primary" onClick={handleSort}>
                        Sort by Price ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => setShowModal(false)}>
                        Apply Filters
                    </Button>
                    <Button variant="danger" onClick={() => console.log('Reset filters')}>
                        Reset Filters
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default IdCrypto;
