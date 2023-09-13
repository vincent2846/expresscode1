const express = require('express');
const path = require('path');
const app = express();
// const router = require('./routes');
const productrouter = require('./app/products/routes');
const productrouterV2 = require('./app/products_v2/routes');
// const log = require('./middlewares/logger')
const logger = require('morgan')

app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public',express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1', productrouter);
app.use('/api/v2', productrouterV2);
app.use((req, res, next) => {
    res.status(404);
    res.send({
        status: 'failed',
        message: 'Reource ' + req.originalUrl + ' Not Found'
    })
})
app.listen(3000, () => console.log('Server: http://localhost:3000'))