import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
const CryptoList = () => {
    const [showModal, setShowModal] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 20;
    const startIdx = currentPage * itemsPerPage;
    const [cryptoData, setCryptoData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const userString = localStorage.getItem("user");
            const user = userString ? JSON.parse(userString) : null;

            if (user && user.crypto && user.crypto.length > 0) {
                try {
                    // Fetch data for each crypto in user.crypto
                    const promises = user.crypto.map(async (cryptoId) => {
                        const apiUrl = `http://localhost:4000/api/cryptodata/coin/${cryptoId}`;
                        const response = await fetch(apiUrl);
                        const data = await response.json();
                        return { cryptoId, data };
                    });

                    // Wait for all promises to resolve
                    const results = await Promise.all(promises);

                    // Set the data in state
                    setCryptoData(results);
                } catch (error) {
                    console.error('Error fetching crypto data:', error);
                }
            }
        };

        fetchData();
    }, []); // Run once when the component mounts

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);
    };


    const handleSort = (columnName) => {
        setCurrentPage(0); // Reset the current page to zero

        let sortedData;

        if (columnName === 'Prix') {
            sortedData = [...cryptoData].sort((a, b) => {
                const priceA = a.data.data[a.cryptoId].quote.USD.price;
                const priceB = b.data.data[b.cryptoId].quote.USD.price;

                return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
            });
        } else if (columnName === 'Nom') {
            sortedData = [...cryptoData].sort((a, b) => {
                const nameA = a.data.data[a.cryptoId].name.toUpperCase();
                const nameB = b.data.data[b.cryptoId].name.toUpperCase();
                return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
            });
        } else if (columnName === 'Symbole') {
            sortedData = [...cryptoData].sort((a, b) => {
                const symbolA = a.data.data[a.cryptoId].symbol.toUpperCase();
                const symbolB = b.data.data[b.cryptoId].symbol.toUpperCase();
                return sortOrder === 'asc' ? symbolA.localeCompare(symbolB) : symbolB.localeCompare(symbolA);
            });
        } else if (columnName === '1h %') {
            sortedData = [...cryptoData].sort((a, b) => sortOrder === 'asc' ? a.data.data[a.cryptoId].quote.USD.percent_change_1h - b.data.data[b.cryptoId].quote.USD.percent_change_1h : b.data.data[b.cryptoId].quote.USD.percent_change_1h - a.data.data[a.cryptoId].quote.USD.percent_change_1h);
        } else if (columnName === '24h %') {
            sortedData = [...cryptoData].sort((a, b) => sortOrder === 'asc' ? a.data.data[a.cryptoId].quote.USD.percent_change_24h - b.data.data[b.cryptoId].quote.USD.percent_change_24h : b.data.data[b.cryptoId].quote.USD.percent_change_24h - a.data.data[a.cryptoId].quote.USD.percent_change_24h);
        } else if (columnName === '7j %') {
            sortedData = [...cryptoData].sort((a, b) => sortOrder === 'asc' ? a.data.data[a.cryptoId].quote.USD.percent_change_7d - b.data.data[b.cryptoId].quote.USD.percent_change_7d : b.data.data[b.cryptoId].quote.USD.percent_change_7d - a.data.data[a.cryptoId].quote.USD.percent_change_7d);
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
                        crypto.data.data[crypto.cryptoId].quote.USD.percent_change_7d,
                        crypto.data.data[crypto.cryptoId].quote.USD.percent_change_24h,
                        crypto.data.data[crypto.cryptoId].quote.USD.percent_change_1h,
                    ],
                    fill: false,
                    borderColor: 'yellow',
                    key: crypto.id,
                },
            ],
        };
    };


    return (
        <>
            <div className='container'>
                {
                    cryptoData.length === 0 ? (
                        <p>No cryptocurrencies available.</p>
                    ) : (
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
                                {cryptoData.map((crypto, index) => (
                                    <tr key={index}>
                                        {/* {console.log(crypto.data.data[crypto.cryptoId])} */}
                                        <td>{startIdx + index + 1}</td>
                                        <td>  <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.cryptoId}.png`}
                                            width={25}
                                            alt={crypto.name}
                                        />   {crypto.name}</td>
                                        <td>{crypto.data.data[crypto.cryptoId].symbol}</td>
                                        <td>{formatCurrency(crypto.data.data[crypto.cryptoId].quote.USD.price)}</td>
                                        <td>
                                            {crypto.data.data[crypto.cryptoId].quote.USD.percent_change_1h !== undefined
                                                ? crypto.data.data[crypto.cryptoId].quote.USD.percent_change_1h.toFixed(2) + '%'
                                                : 'N/A'}
                                        </td>
                                        <td>
                                            {crypto.data.data[crypto.cryptoId].quote.USD.percent_change_24h !== undefined
                                                ? crypto.data.data[crypto.cryptoId].quote.USD.percent_change_24h.toFixed(2) + '%'
                                                : 'N/A'}
                                        </td>

                                        <td>
                                            {crypto.data.data[crypto.cryptoId].quote.USD.percent_change_7d !== undefined
                                                ? crypto.data.data[crypto.cryptoId].quote.USD.percent_change_7d.toFixed(2) + '%'
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
                                        {/* Ajoutez d'autres cellules de données si nécessaire */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                }
            </div>
        </>
    );
};

export default CryptoList;