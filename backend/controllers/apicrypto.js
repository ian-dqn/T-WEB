const axios = require("axios");

exports.getApi = async (req, res, next) => {
    try {
        // Make a request to the CoinGecko API using axios
        const response = await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets",
            {
                params: {
                    vs_currency: "usd",
                    ids: "bitcoin,ethereum,solana",
                    order: "market_cap_desc",
                    per_page: 10,
                    page: 1,
                    sparkline: false,
                },
            }
        );

        //  Send the data as JSON in the response
        res.json(response.data);
    } catch (error) {
        //   Handle errors
        console.error(error);
        res.status(500).json({ error: "Error fetching cryptocurrency data" });
    }
};

exports.getApiId = async (req, res) => {
    const cryptoId = req.params.id;

    try {
        const response = await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets",
            {
                params: {
                    vs_currency: "usd",
                    ids: cryptoId,
                    order: "market_cap_desc",
                    per_page: 10,
                    page: 1,
                    sparkline: false,
                },
            }
        );

        const data = response.data;

        // Extract specific details
        const { name, current_price, high_24h, low_24h, image } = data[0];

        // Send a JSON response with the extracted details
        res.json({
            fullName: name,
            currentPrice: current_price,
            high_24h: high_24h,
            low_24h: low_24h,
            image: image,
        });

        //    res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching cryptocurrency data" });
    }
};
