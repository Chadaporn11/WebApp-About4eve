const expressFunctions = require('express');
const mongoose = require('mongoose');
const expressApp = expressFunctions();
const bodyParser = require('body-parser');

const url = 'mongodb://localhost:27017/About4eve';
const config = {
    autoIndex: true,
    useNewUrlparser: true,
    useUnifiedTopology: true
};

// Middleware1
expressApp.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Optional, Authorization')
    return next();
});

expressApp.use(expressFunctions.json()); // Middleware2
// Middleware3
expressApp.use((req, res, next) => {
    mongoose.connect(url, config)
        .then(() => {
            console.log('Connected to MongoBD...');
            next();
        })
        .catch(err => {
            console.log('Cannot connect to MongoBD');
            res.status(501).send('Cannot connect to MongoBD');
        });
});

expressApp.use('/user', require('./routes/user'))

expressApp.listen(4200, function () {
    console.log('Listening on port 4200');
});

