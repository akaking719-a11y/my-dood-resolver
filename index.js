const express = require('express');
const app = express();

// Home page par wahi generator rahega jo abhi chal raha hai
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Doodstream Embed Link Generator</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body { background: #000; color: #fff; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                .box { width: 90%; max-width: 500px; background: #111; padding: 25px; border-radius: 12px; border: 1px solid #333; text-align: center; }
                input { width: 100%; padding: 12px; margin-bottom: 15px; background: #222; border: 1px solid #444; color: #fff; border-radius: 5px; box-sizing: border-box; }
                button { width: 100%; padding: 12px; background: #ff4500; color: #fff; border: none; font-weight: bold; cursor: pointer; border-radius: 5px; }
                .result { margin-top: 20px; background: #222; padding: 10px; border-radius: 5px; word-break: break-all; color: #00ff00; font-size: 13px; display:none; }
            </style>
        </head>
        <body>
            <div class="box">
                <h2 style="color:#ff4500">EMBED LINK GENERATOR</h2>
                <input type="text" id="url" placeholder="Paste Doodstream/Myvidplay Link">
                <button onclick="gen()">GENERATE EMBED LINK</button>
                <div id="res" class="result"></div>
                <p style="font-size:11px; color:#888; margin-top:10px;">Copy the green link and paste it in your DooPlay site.</p>
            </div>
            <script>
                function gen() {
                    let val = document.getElementById('url').value.trim();
                    let id = val.split('/').filter(Boolean).pop();
                    if(id.includes('?')) id = id.split('?')[0];
                    let finalUrl = window.location.origin + "/embed/" + id;
                    document.getElementById('res').innerText = finalUrl;
                    document.getElementById('res').style.display = "block";
                }
            </script>
        </body>
        </html>
    `);
});

// YEH HAI ASLI CHEEZ: Jo apki site par video dikhayega
app.get('/embed/:id', (req, res) => {
    const videoId = req.params.id;
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body, html { margin: 0; padding: 0; width: 100%; height: 100%; background: #000; overflow: hidden; }
                iframe { width: 100%; height: 100%; border: none; }
            </style>
        </head>
        <body>
            <iframe src="https://dood.li/e/${videoId}" allowfullscreen scrolling="no"></iframe>
        </body>
        </html>
    `);
});

module.exports = app;
