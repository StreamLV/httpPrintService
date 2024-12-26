const express = require('express');
//const { check } = require('express-validator');
const defaultController = require('../controllers/default-controller');
const router = express.Router();
//
router.get('/', defaultController.defaultTestPage);
module.exports = router;