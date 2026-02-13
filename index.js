const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = '388886cggxr0msydrw9fmq';

app.get('/player/:id', async (req, res) => {
    const fileId = req.params.id;
    try {
        // 1. Doodstream API se direct link fetch karna
        const response = await axios.get(`https://doodapi.com/api/file/direct?key=${API_KEY}&file_code=${fileId}`);
        
        if (response.data && response.data.result) {
            const videoUrl = response.data.result.url;

            // 2. Simple HTML Player return karna (No Header, No Ads)
            res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Player</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
                    <style>
                        body, html { margin: 0; padding: 0; width: 100%; height: 100%; background: #000; overflow: hidden; }
                        .container { width: 100%; height: 100vh; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <video id="player" playsinline controls data-poster="">
                            <source src="${videoUrl}" type="video/mp4" />
                        </video>
                    </div>
                    <script src="https://cdn.plyr.io/3.7.8/plyr.js"></script>
                    <script>const player = new Plyr('#player');</script>
                </body>
                </html>
            `);
        } else {
            res.status(404).send('Video not found or API error.');
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Vercel ke liye export
module.exports = app;
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
