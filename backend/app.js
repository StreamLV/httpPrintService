const express = require('express');
// const path = require('path');
const config = require('./config/config-service').getConfig();

const defaultRoutes = require('./routes/default-routes');
const printRoutes = require('./routes/print-routes');

const app = express();
// app.set('view engine', 'ejs');

app.use(express.json({ limit: '250mb' }));
app.use(express.urlencoded({ limit: '250mb' }));
// app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    // res.setHeader('Content-Type', 'application/json');
    next();
});

app.use('/', defaultRoutes);
app.use('/api/print', printRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Could not find this route' });
});

app.listen(config.port);