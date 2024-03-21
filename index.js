import express from 'express';
import fs from 'fs';
import yaml from 'js-yaml';

const app = express();

// Serve the index.html file
app.get('/', (req, res) => {
    // Read the config.yaml file
    const configPath = 'config.yaml';
    const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

    // Get the boolean value from the config
    const isDefaultTalk = config.isDefaultTalk;

    // Dynamically generate HTML content based on the boolean value
    const toggleSwitch = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Default Talk Toggle</title>
            <link href="https://fonts.googleapis.com/css?family=Fira+Sans:400,700&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Fira Sans', sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .switch-container {
                    display: flex;
                    align-items: center;
                }
                .switch {
                    position: relative;
                    display: inline-block;
                    width: 60px;
                    height: 34px;
                    margin-left: 10px;
                }
                .switch input { 
                    opacity: 0;
                    width: 0;
                    height: 0;
                }
                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #ccc;
                    -webkit-transition: .4s;
                    transition: .4s;
                }
                .slider:before {
                    position: absolute;
                    content: "";
                    height: 26px;
                    width: 26px;
                    left: 4px;
                    bottom: 4px;
                    background-color: white;
                    -webkit-transition: .4s;
                    transition: .4s;
                }
                input:checked + .slider {
                    background-color: #2196F3;
                }
                input:focus + .slider {
                    box-shadow: 0 0 1px #2196F3;
                }
                input:checked + .slider:before {
                    -webkit-transform: translateX(26px);
                    -ms-transform: translateX(26px);
                    transform: translateX(26px);
                }
            </style>
        </head>
        <body>

        <h2>DEFAULT TALK</h2>

        <div class="switch-container">
            <label class="switch">
                <input type="checkbox" id="toggleSwitch" ${isDefaultTalk ? 'checked' : ''} onchange="toggleSwitchChanged()">
                <span class="slider"></span>
            </label>
        </div>

        <script>
            function toggleSwitchChanged() {
                // Send an AJAX request to update the boolean value in config.yaml
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/toggle_default_talk', true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send();
            }
        </script>

        </body>
        </html>
    `;

    // Send the HTML content as response
    res.send(toggleSwitch);
});

// Route to check the boolean value
app.get('/is_default_talk', (req, res) => {
    // Read the config.yaml file
    const configPath = 'config.yaml';
    const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

    // Get the boolean value from the config
    const isDefaultTalk = config.isDefaultTalk;

    res.json({ isDefaultTalk });
});

// Route to toggle the boolean value
app.post('/toggle_default_talk', (req, res) => {
    // Read the config.yaml file
    const configPath = 'config.yaml';
    const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

    // Toggle the boolean value
    config.isDefaultTalk = !config.isDefaultTalk;

    // Write the updated config back to config.yaml
    fs.writeFileSync(configPath, yaml.dump(config));

    res.sendStatus(200);
});

// Start the server on port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
