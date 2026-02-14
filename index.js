const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = '388886cggxr0msydrw9fmq';

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Doodstream Ad-Free Player</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body { font-family: sans-serif; background: #121212; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                .container { width: 90%; max-width: 600px; text-align: center; }
                input { width: 100%; padding: 12px; border-radius: 5px; border: none; margin-bottom: 10px; font-size: 16px; }
                button { padding: 10px 20px; background: #ff4500; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; }
                #player-container { margin-top: 20px; width: 100%; display: none; }
                iframe { width: 100%; height: 350px; border: 2px solid #333; }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Doodstream Resolver</h2>
                <input type="text" id="doodLink" placeholder="Paste Doodstream Link Here...">
                <button onclick="playVideo()">Watch Ad-Free</button>
                <div id="player-container">
                    <iframe id="videoPlayer" src="" frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
            <script>
                function playVideo() {
                    const link = document.getElementById('doodLink').value;
                    const fileId = link.split('/').pop();
                    if(fileId) {
                        const playerUrl = window.location.origin + '/player/' + fileId;
                        document.getElementById('videoPlayer').src = playerUrl;
                        document.getElementById('player-container').style.display = 'block';
                    } else {
                        alert('Please enter a valid link!');
                    }
                }
            </script>
        </body>
        </html>
    `);
});

app.get('/player/:id', async (req, res) => {
    const fileId = req.params.id;
    try {
        const response = await axios.get(`https://doodapi.com/api/file/direct?key=${API_KEY}&file_code=${fileId}`);
        if (response.data && response.data.result && response.data.result.url) {
            const videoUrl = response.data.result.url;
            res.send(`
                <html>
                <body style="margin:0; background:#000;">
                    <video controls autoplay style="width:100%; height:100vh;">
                        <source src="${videoUrl}" type="video/mp4">
                    </video>
                </body>
                </html>
            `);
        } else { res.send('Video Error!'); }
    } catch (e) { res.send('Server Error!'); }
});

module.exports = app;
