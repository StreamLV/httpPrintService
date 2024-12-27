const { v4: uuidv4, v5: uuidv5 } = require('uuid');
require('dotenv').config();
const printWindowsService = require('../services/printWindows-service');

const printPdf = async (req, res, next) => {
  //let resObject = null;
  console.log('printPdf-printer', req.body.printer);
  try {
    await printWindowsService.printPdfBase64(
      req.body.pdfBase64,
      req.body.printer,
      uuidv4()
    );
  } catch (err) {
    console.log('printPdf-error', err);
    return res.status(500).json({ message: err.message });
  }
  //res.json(resObject);
};

exports.printPdf = printPdf;