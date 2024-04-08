import express from 'express';
import fs from 'fs';
import yaml from 'js-yaml';
import cors from 'cors'; // Import the cors module

const app = express();

// Enable CORS middleware
app.use(cors());

// Serve the index.html file
app.get('/', (req, res) => {
    // Read the config.yaml file
    const configPath = 'config.yaml';
    const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

    // Get the boolean value from the config
    const isDefaultTalk = config.isDefaultTalk;

    // Dynamically generate HTML content based on the boolean value
    const toggleSwitch = ``;

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
