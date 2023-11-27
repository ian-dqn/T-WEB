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

exports.getHistoryApiparDays = async (req, res, next) => {
    const cryptoId = req.params.cryptoId;
    const currency = req.params.currency;
    const startDate = req.params.startDate; // Cette ligne capture le paramètre de date de début

    try {
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart`,
            {
                params: {
                    vs_currency: currency,
                    from: startDate,
                    days: 60, // ajustez cette valeur en fonction de vos besoins
                },
            }
        );

        const data = response.data;
        const history = {
            prices: data.prices.map((entry) => entry[1]),
        };

        console.log("Fetched history successfully:", history);

        res.json(history);
    } catch (error) {
        console.error("Error fetching price history:", error);
        res.status(500).json({ error: "Error fetching price history" });
    }
};

exports.getHistoryApiparHeure = async (req, res, next) => {
    const cryptoId = req.params.cryptoId;
    const currency = req.params.currency;
    //  const startDate = req.params.startDate;
    const api_key = "CG-ktjj2Hs8Q21XTLe1DCud6LGV";

    try {
        // Utilisation de la bonne URL pour obtenir l'historique des prix
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart`,
            {
                params: {
                    vs_currency: currency,
                    //  days: 1, // Vous pouvez ajuster cette valeur en fonction de vos besoins
                    interval: "48h",
                    api_key: api_key,
                },
            }
        );

        const data = response.data;

        // Vérification si les données des prix sont disponibles
        if (data.prices && data.prices.length > 0) {
            const history = {
                prices: data.prices.map((entry) => entry[1]),
            };

            console.log("Fetched history successfully:", history);

            res.json(history);
        } else {
            console.error("Prices data not available");
            res.status(500).json({ error: "Prices data not available" });
        }
    } catch (error) {
        console.error("Error fetching price history:", error);
        res.status(500).json({ error: "Error fetching price history" });
    }
};
exports.getHistoryApiparMinute = async (req, res, next) => {
    const cryptoId = req.params.cryptoId;
    const currency = req.params.currency;
    //  const startDate = req.params.startDate;
    const api_key = "CG-ktjj2Hs8Q21XTLe1DCud6LGV";

    try {
        // Utilisation de la bonne URL pour obtenir l'historique des prix
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart`,
            {
                params: {
                    vs_currency: currency,
                    //  days: 1, // Vous pouvez ajuster cette valeur en fonction de vos besoins
                    interval: "60m",
                    api_key: api_key,
                },
            }
        );

        const data = response.data;

        // Vérification si les données des prix sont disponibles
        if (data.prices && data.prices.length > 0) {
            const history = {
                prices: data.prices.map((entry) => entry[1]),
            };

            console.log("Fetched history successfully:", history);

            res.json(history);
        } else {
            console.error("Prices data not available");
            res.status(500).json({ error: "Prices data not available" });
        }
    } catch (error) {
        console.error("Error fetching price history:", error);
        res.status(500).json({ error: "Error fetching price history" });
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
