const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = '388886cggxr0msydrw9fmq';

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Premium Ad-Free Player</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0f0f0f; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                .container { width: 95%; max-width: 500px; background: #1e1e1e; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.7); text-align: center; border: 1px solid #333; }
                h2 { color: #ff4500; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px; }
                input { width: 100%; padding: 15px; border-radius: 8px; border: 1px solid #444; background: #111; color: #fff; margin-bottom: 20px; box-sizing: border-box; font-size: 14px; outline: none; }
                input:focus { border-color: #ff4500; }
                button { width: 100%; padding: 15px; background: #ff4500; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 16px; transition: all 0.3s ease; }
                button:hover { background: #e63e00; transform: translateY(-2px); }
                #player-container { margin-top: 25px; width: 100%; display: none; border-radius: 10px; overflow: hidden; border: 2px solid #333; }
                iframe { width: 100%; height: 300px; border: none; background: #000; }
                .footer-text { margin-top: 15px; font-size: 11px; color: #666; }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Dood Resolver</h2>
                <input type="text" id="doodLink" placeholder="Paste Doodstream or MyVidPlay link here...">
                <button onclick="playVideo()">WATCH NOW (NO ADS)</button>
                <div id="player-container">
                    <iframe id="videoPlayer" src="" allowfullscreen scrolling="no"></iframe>
                </div>
                <p class="footer-text">Works with all Doodstream extensions (myvidplay, dood.li, etc.)</p>
            </div>
            <script>
                function playVideo() {
                    let input = document.getElementById('doodLink').value.trim();
                    if(!input) return alert('Link toh dalo!');

                    // Advanced ID Extraction (Sab domains ke liye)
                    let fileId = "";
                    if (input.includes('/e/')) {
                        fileId = input.split('/e/')[1].split(/[?#]/)[0];
                    } else if (input.includes('/d/')) {
                        fileId = input.split('/d/')[1].split(/[?#]/)[0];
                    } else if (input.includes('/v/')) {
                        fileId = input.split('/v/')[1].split(/[?#]/)[0];
                    } else {
                        // Agar sirf ID dali ho
                        fileId = input.split('/').pop().split(/[?#]/)[0];
                    }

                    if(fileId.length < 5) return alert('Link sahi nahi hai, dobara check karo!');

                    const playerUrl = window.location.origin + '/player/' + fileId;
                    document.getElementById('videoPlayer').src = playerUrl;
                    document.getElementById('player-container').style.display = 'block';
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
                <head><meta name="viewport" content="width=device-width, initial-scale=1"></head>
                <body style="margin:0;background:#000;display:flex;align-items:center;justify-content:center;">
                    <video controls autoplay style="width:100%;max-height:100vh;">
                        <source src="${videoUrl}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </body>
                </html>
            `);
        } else {
            res.status(404).send("<body style='background:#000;color:white;text-align:center;padding:50px;'><h3>Video Error: File Not Found or API Key Issue</h3></body>");
        }
    } catch (e) {
        res.status(500).send("Server Error");
    }
});

module.exports = app;
