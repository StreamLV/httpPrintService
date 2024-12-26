// const uuid = require('uuid');
require('dotenv').config();
const printWindowsService = require('../services/printWindows-service');

const printPdf = async (req, res, next) => {
  //let resObject = null;
  try {
    
    await printWindowsService.printPdfBuffer(
      res,
      null,
      req.params.receiptId,
      req.params.scale,
      req.params.isCopy == 1 ? true : false
    );
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  //res.json(resObject);
};

exports.printPdf = printPdf;