const express = require('express');
const rootRoutes = require('./root');
const articleRoutes = require('./article');
const authorizationRoutes = require('./authorization');
const profileRoutes = require('./profile');
const adminPanelRoutes = require('./admin');
const { verifyJWT } = require('../security/middleware/verify-jwt');
const { verifyRoleAdmin } = require('../middleware/verify-role');

const routers = express.Router();

routers.use('/', rootRoutes);
routers.use('/article', articleRoutes);
routers.use('/auth', authorizationRoutes);
routers.use('/profile', verifyJWT, profileRoutes);
routers.use('/admin-panel', verifyJWT, verifyRoleAdmin, adminPanelRoutes);

module.exports = routers;