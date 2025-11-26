const express = require('express');
const router = express.Router();
const { getHomeContent } = require('../controllers/content.controller');

router.get('/home', getHomeContent);

module.exports = router;
