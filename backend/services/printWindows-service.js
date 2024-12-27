const { getPrinters, print } = require("pdf-to-printer");
const path = require('path');
const fs = require('fs');
const config = require('../config/config-service').getConfig();

const getPrintersList = async () => {
    // return await printLinuxService.getPrintersList();
    let dataResult = { is_error: false, message: '', printers: [] };
    try {
        const printersList = await getPrinters();
        dataResult.printers = printersList;
    } catch (error) {
        dataResult.is_error = true;
        dataResult.message = error.message;
    }
    return dataResult;
}

const printPdfBuffer = async (pdfBuffer, printerName, fileSuffix) => {

    // const filePath = path.join(__dirname, `pf_${fileSuffix}.pdf`);
    const filePath = path.join(process.cwd(), `pf_${fileSuffix}.pdf`);
    //console.log("збережено файл", filePath);
    fs.writeFileSync(filePath, pdfBuffer);
    const dataResult = await printFilePDF(filePath, printerName);

    return dataResult;
}

const printPdfBase64 = async (pdfBase64, printerName, fileSuffix) => {

    const pdfBuffer = Buffer.from(pdfBase64, 'base64');
    // const filePath = path.join(__dirname, `pf_${fileSuffix}.pdf`);
    const filePath = path.join(process.cwd(), `pf_${fileSuffix}.pdf`);
    console.log("збережено файл", filePath);
    // Збереження PDF-файлу на диску, перед друком
    fs.writeFileSync(filePath, pdfBuffer);

    const dataResult = await printFilePDF(filePath, printerName);

    return dataResult;
}

const printFilePDF = async (filePath, printerName) => {

    let dataResult = { is_error: false, message: '', printerName };
    try {
        if (printerName) {
            await print(filePath, { printer: printerName });
        } else {

        }
        console.log("printFilePDF", {res: 'success', filePath, printerName});
        setTimeout(() => {
            try {
                fs.unlinkSync(filePath);
            } catch (err) { }
        }, 25000);
    } catch (error) {
        console.error("Помилка при друку:", error);
        dataResult.is_error = true;
        dataResult.message = error.message;
    }
    return dataResult;
}

exports.getPrintersList = getPrintersList;
exports.printPdfBuffer = printPdfBuffer;
exports.printPdfBase64 = printPdfBase64;