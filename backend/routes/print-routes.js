const express = require('express');
//const { check } = require('express-validator');
const checkAuthExchange = require('../../middleware/check-auth-exchange');
const printController = require('../controllers/print-controller');
const router = express.Router();

router.use(checkAuthExchange);
//api/print
router.post('/pdf', printController.printPDF);

module.exports = router;