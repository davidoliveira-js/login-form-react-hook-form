const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const passaport = require('./middlewares/authentication/AuthenticationStrategys');
const exceptionsFilter = require('./utils/error-handler/ExceptionsFilter');
const morgan = require('./middlewares/Morgan');

const app = express();

app.use(morgan);
app.use(bodyParser.json());
app.use(passaport.initialize());
routes(app);
app.use((error, req, res, next) => {
  exceptionsFilter(error, req, res, next);
});

module.exports = app;
