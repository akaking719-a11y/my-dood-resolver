const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = '388886cggxr0msydrw9fmq';

// Home page par error nahi aayega ab
app.get('/', (req, res) => {
    res.send('<h1>Doodstream Resolver is Active!</h1><p>Use: /player/VIDEO_ID</p>');
});

app.get('/player/:id', async (req, res) => {
    const fileId = req.params.id;
    try {
        const response = await axios.get(`https://doodapi.com/api/file/direct?key=${API_KEY}&file_code=${fileId}`);
        
        if (response.data && response.data.result && response.data.result.url) {
            const videoUrl = response.data.result.url;
            res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
                    <style>
                        body, html { margin: 0; padding: 0; width: 100%; height: 100%; background: #000; overflow: hidden; }
                        .plyr { height: 100vh; }
                    </style>
                </head>
                <body>
                    <video id="player" playsinline controls>
                        <source src="${videoUrl}" type="video/mp4" />
                    </video>
                    <script src="https://cdn.plyr.io/3.7.8/plyr.js"></script>
                    <script>const player = new Plyr('#player');</script>
                </body>
                </html>
            `);
        } else {
            res.status(404).send('Error: Video link fetch nahi ho saka. Check API Key or File ID.');
        }
    } catch (error) {
        res.status(500).send('Server Error: ' + error.message);
    }
});

module.exports = app;
