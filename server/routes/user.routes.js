const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/:id', userController.getUserProfile);
router.put('/change-password', userController.changePassword);

module.exports = router;
