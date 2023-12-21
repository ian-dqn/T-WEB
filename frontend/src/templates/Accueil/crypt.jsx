import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import '../../asset/css/Paginate.css';
import '../../asset/css/Accueil.css';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


const CryptoCurrencies = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 20;
    const startIdx = currentPage * itemsPerPage;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/cryptodata/coin');
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
        setCurrentPage(0); // Réinitialise la page actuelle à zéro

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
        return cryptoData.slice(start, end);
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
        return {
            labels: ['7j', '24h', '1h'],
            datasets: [
                {
                    data: [
                        crypto.quote.USD.percent_change_7d,
                        crypto.quote.USD.percent_change_24h,
                        crypto.quote.USD.percent_change_1h,
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
                    <th scope="col">Graphique</th>
                </tr>
                </thead>
                <tbody>
                {displayedData().map((crypto, index) => (
                    <tr key={crypto.id}>
                        <td>{startIdx + index + 1}</td>
                        <td>
                            <a href={`http://localhost:3000/${crypto.id}`}>
                                <img
                                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
                                    width={25}
                                    alt={crypto.name}
                                />
                                {' '}
                                {crypto.name}
                            </a>
                        </td>

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
                        <td className="chart-container">
                            <Line
                                data={generateChartData(crypto)}
                                options={{
                                    ...options,
                                    responsive: true
                                }}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <ReactPaginate
                previousLabel={'Precedent'}
                nextLabel={'Suivant'}
                breakLabel={'...'}
                pageCount={Math.ceil(cryptoData.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={({ selected }) => setCurrentPage(selected)}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Filter by</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="primary" onClick={handleSort}>
                        Sort by Price ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
                    </Button>
                    {/* Ajoutez d'autres boutons de filtre ici si nécessaire */}
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

export default CryptoCurrencies;
