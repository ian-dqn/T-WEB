import axios from 'axios';

// Function that returns a promise with newsOptions
export const getNewsOptions = () => {
    return new Promise((resolve, reject) => {
        let newsOptions = [];  // Initialize an empty array

        // Make the Axios request
        axios.get('http://localhost:4000/api/cryptodata/coin')
            .then(response => {
                console.log(response.data.data);

                // Use the response data to create the newsOptions array
                newsOptions = response.data.data.map(coin => ({
                    value: coin.id,
                    label: coin.name,
                }));

                console.log("newsOptions", newsOptions);

                // Resolve the promise with the populated newsOptions
                resolve(newsOptions);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Reject the promise with the error
                reject(error);
            });
    });
};