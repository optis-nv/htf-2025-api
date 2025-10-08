const express = require('express');
const fishService = require('./services/fishService');
const divingCenterService = require('./services/divingCenterService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint to get list of fishes common in Thailand
app.get('/api/fishes', (req, res) => {
    const fishes = fishService.getAllFishes();
    res.json(fishes);
});

// Endpoint to get list of diving centers in Thailand
app.get('/api/diving-centers', (req, res) => {
    const divingCenters = divingCenterService.getAllDivingCenters();
    res.json(divingCenters);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;