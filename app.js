const createError = require('http-errors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const transactionsRouter = require('./routes/transactions');
const reportRoutes = require('./routes/report');

const performanceLogger = require('./middleware/performanceLogger');
const requestLogger = require('./middleware/requestLogger');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(performanceLogger);
app.use(requestLogger);

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: '1.0.0',
            title: 'Express Application',
            description: 'Express Application API Documentation',
        },
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    apis: ['./models/*.js', './controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/transactions', transactionsRouter);
app.use('/report', reportRoutes); 
// 404 error handler
app.use((req, res, next) => {
    next(createError(404));
});

// General error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;