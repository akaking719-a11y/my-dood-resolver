const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = '388886cggxr0msydrw9fmq';

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Universal Dood Resolver</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body { font-family: sans-serif; background: #000; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                .box { width: 90%; max-width: 500px; background: #111; padding: 25px; border-radius: 12px; border: 1px solid #333; text-align: center; }
                input { width: 100%; padding: 15px; border-radius: 5px; border: 1px solid #444; background: #222; color: #fff; margin-bottom: 15px; box-sizing: border-box; }
                button { width: 100%; padding: 15px; background: #ff4500; color: #fff; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; }
                #v-player { margin-top: 20px; width: 100%; display: none; }
                iframe { width: 100%; height: 300px; border: 1px solid #444; }
            </style>
        </head>
        <body>
            <div class="box">
                <h2 style="color:#ff4500">DOOD RESOLVER</h2>
                <input type="text" id="urlInput" placeholder="Paste any Doodstream/MyVidPlay link...">
                <button onclick="resolveNow()">GET AD-FREE VIDEO</button>
                <div id="v-player">
                    <iframe id="iframePlayer" src="" allowfullscreen></iframe>
                </div>
            </div>
            <script>
                function resolveNow() {
                    let val = document.getElementById('urlInput').value.trim();
                    if(!val) return alert('Link dalo!');

                    // UNIVERSAL LOGIC: Yeh har domain se ID nikal lega
                    let parts = val.split('/');
                    let fileId = parts.pop() || parts.pop(); // Aakhri hissa uthayega
                    if(fileId.includes('?')) fileId = fileId.split('?')[0];

                    // Agar link /e/ ya /d/ wala hai toh handle karega
                    const finalLink = window.location.origin + '/player/' + fileId;
                    document.getElementById('iframePlayer').src = finalLink;
                    document.getElementById('v-player').style.display = 'block';
                }
            </script>
        </body>
        </html>
    `);
});

app.get('/player/:id', async (req, res) => {
    const id = req.params.id;
    try {
        // Doodstream API call
        const apiRes = await axios.get(`https://doodapi.com/api/file/direct?key=${API_KEY}&file_code=${id}`);
        
        if (apiRes.data && apiRes.data.result) {
            const directUrl = apiRes.data.result.url;
            res.send(`
                <html>
                <body style="margin:0;background:#000;">
                    <video controls autoplay style="width:100%;height:100vh;">
                        <source src="${directUrl}" type="video/mp4">
                    </video>
                </body>
                </html>
            `);
        } else {
            res.send("<h3 style='color:white;text-align:center;'>API Error: ID galat hai ya key block hai.</h3>");
        }
    } catch (err) {
        res.send("<h3 style='color:white;text-align:center;'>Server Error</h3>");
    }
});

module.exports = app;
