const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const {existsSync, readFileSync} = require("node:fs");

dotenv.config();

const app = express();
const port = process.env.PORT;
const baseUrl = process.env.BASE_URL;

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.get('/metadata/:id', (req, res) => {
    const id = decodeURIComponent(req.params.id).replace(/[\n\r]/g, '');
    const metadataFileName = `mclaren${id}.json`; // 生成文件名
    const metadataPath = path.join(__dirname, 'metadata', metadataFileName);
    if (existsSync(metadataPath)) {
        const rawMetadata = readFileSync(metadataPath);
        const metadata = JSON.parse(rawMetadata);
        metadata.image = `${baseUrl}${metadata.image}`;
        res.json(metadata);
    } else {
        res.status(404).send('Metadata not found');
    }
});

app.listen(port, () => {
    console.log(`Metadata service running at ${baseUrl}`);
});
