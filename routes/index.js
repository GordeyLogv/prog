const express = require('express');
const rootRoutes = require('./root');
const articleRoutes = require('./article');
const authorizationRoutes = require('./authorization');

const routers = express.Router();

routers.use('/', rootRoutes);
routers.use('/article', articleRoutes);
routers.use('/authorization', authorizationRoutes);

module.exports = routers;