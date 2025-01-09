const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get a random quote in JSON format
app.get('/api/quote', (req, res) => {
    const quotesPath = path.join(__dirname, 'quotes.json');

    fs.readFile(quotesPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading quotes file:', err);
            const errorResponse = {
                creator: "BLUE DEMON",
                status: 500,
                success: false,
                Author: null,
                quote: "Failed to load quotes."
            };
            return res
                .status(500)
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(errorResponse, null, 2));
        }

        const quotes = JSON.parse(data);
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        const response = {
            creator: "BLUE DEMON",
            status: 200,
            success: true,
            Author: randomQuote.author,
            quote: randomQuote.quote
        };

        // Pretty-print the JSON response
        res
            .status(200)
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(response, null, 2));
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});