const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Ad-Free Player</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body { background: #000; color: white; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                .box { width: 90%; max-width: 500px; background: #111; padding: 20px; border-radius: 10px; text-align: center; border: 1px solid #333; }
                input { width: 100%; padding: 12px; margin-bottom: 15px; background: #222; border: 1px solid #444; color: #fff; border-radius: 5px; box-sizing: border-box; }
                button { width: 100%; padding: 12px; background: #ff4500; color: white; border: none; font-weight: bold; cursor: pointer; border-radius: 5px; }
                #player { margin-top: 20px; display: none; width: 100%; height: 300px; border: 1px solid #ff4500; }
            </style>
        </head>
        <body>
            <div class="box">
                <h2>PLAYER GENERATOR</h2>
                <input type="text" id="url" placeholder="Paste link (myvidplay, dood, etc.)">
                <button onclick="load()">WATCH NOW</button>
                <iframe id="player" src="" allowfullscreen></iframe>
            </div>
            <script>
                function load() {
                    let val = document.getElementById('url').value.trim();
                    let id = val.split('/').pop();
                    // Hum yahan Doodstream ka direct embed link use karenge jo ads block karta hai
                    document.getElementById('player').src = "https://dood.li/e/" + id;
                    document.getElementById('player').style.display = "block";
                }
            </script>
        </body>
        </html>
    `);
});

module.exports = app;
