import express from 'express';
import fs from 'fs';
import yaml from 'js-yaml';
import cors from 'cors'; // Import the cors module
import path from 'path';
import { exec } from 'child_process'; // Import the exec function to execute shell commands

const app = express();

// Enable CORS middleware
app.use(cors());

// Define the directory for static files (like CSS, JavaScript, images)
app.use(express.static(path.join(__dirname, 'views')));

app.set('views', path.join(__dirname, 'views'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve the index.html file
app.get('/', (req, res) => {
    // Read the config.yaml file
    const configPath = 'config.yaml';
    const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

    // Get the boolean value from the config
    const isDefaultTalk = config.isDefaultTalk;

    // Render the index.html file as an EJS template
    res.render('index', { isDefaultTalk: isDefaultTalk });
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

// Route to restart the left Windows computer
app.post('/restart_left', (req, res) => {
    exec('ssh experiment@wd-left "shutdown /r /t 0"', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error}`);
            res.status(500).send('Error executing command');
        } else {
            console.log('Command executed successfully');
            res.sendStatus(200);
        }
    });
});

// Route to restart the right Windows computer
app.post('/restart_right', (req, res) => {
    exec('ssh experiment@wd-right "shutdown /r /t 0"', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error}`);
            res.status(500).send('Error executing command');
        } else {
            console.log('Command executed successfully');
            res.sendStatus(200);
        }
    });
});

// Start the server on port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
