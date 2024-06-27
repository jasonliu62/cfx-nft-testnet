const express = require('express');
const { exec } = require('child_process');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());

app.post('/deploy', (req, res) => {
    exec('npx hardhat run scripts/deploy.js --network espaceTestnet', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send(`Error: ${error.message}`);
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).send(`Stderr: ${stderr}`);
        }
        console.log(`Stdout: ${stdout}`);
        res.send(`Stdout: ${stdout}`);
    });
});

app.post('/mint', (req, res) => {
    exec('node scripts/mint.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send(`Error: ${error.message}`);
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).send(`Stderr: ${stderr}`);
        }
        console.log(`Stdout: ${stdout}`);
        res.send(`Stdout: ${stdout}`);
    });
});

app.post('/query', (req, res) => {
    exec('node scripts/query.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send(`Error: ${error.message}`);
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).send(`Stderr: ${stderr}`);
        }
        console.log(`Stdout: ${stdout}`);
        res.send(`Stdout: ${stdout}`);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
