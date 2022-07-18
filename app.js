const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const app = express();
const notFoundMiddleware = require('./app/middlewares/not-found')
const handleErrorMiddleware = require('./app/middlewares/handler-error')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const v1 = '/api/v1/cms';
const categoriesRouter = require('./app/api/v1/categories/router')
const imagesRouter = require('./app/api/v1/images/router')

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Selamat datang di SEMINA",
    })
})

app.use(v1, categoriesRouter)
app.use(v1, imagesRouter)

// Error Middleware
app.use(notFoundMiddleware)
app.use(handleErrorMiddleware)

module.exports = app;
