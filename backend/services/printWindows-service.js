const { getPrinters, print } = require("pdf-to-printer");
const path = require('path');
const fs = require('fs');

const printReceipt = async (printer, receiptId) => {
    let dataResult = { is_error: false, message: '', printer };
    let resPdfBuffer;
    
    
    const filePath = path.join(__dirname, "receipt.pdf");

    // Збереження PDF-файлу на диску, перед друком
    //await fs.writeFile(filePath, resPdfBuffer);
    fs.writeFileSync(filePath, resPdfBuffer);

    const options = {
        printer: printer.url,
    };

    try {
        await print(filePath, options);
        console.log("Друк успішно завершено");
    } catch (error) {
        //console.error("Помилка при друку:", error);
        dataResult.is_error = true;
        dataResult.message = error.message;
    }

    setTimeout(() => {
        try {
            fs.unlinkSync(filePath);
        } catch(err) {}
    }, 25000);

    return dataResult;
};

const getPrintersList = async() => {
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

const printPdfBuffer = async (pdfBuffer, printer, fileSuffix) => {
    
    let dataResult = { is_error: false, message: '', printer };
    if (!printer?.url) {
        dataResult.is_error = true;
        dataResult.message = 'no printer data'
        return false;
    }
    const filePath = path.join(__dirname, `pf_${fileSuffix}.pdf`);
    //console.log("збережено файл", filePath);
    // Збереження PDF-файлу на диску, перед друком
    fs.writeFileSync(filePath, pdfBuffer);

    const options = {
        printer: printer.url,
    };

    try {
        await print(filePath, options);
        //console.log("Друк успішно завершено");
    } catch (error) {
        //console.error("Помилка при друку:", error);
        dataResult.is_error = true;
        dataResult.message = error.message;
    }
    // try {
    //     fs.unlinkSync(filePath);
    // } catch(err) {}
    return dataResult;
}

exports.printReceipt = printReceipt;
exports.getPrintersList = getPrintersList;
exports.printPdfBuffer = printPdfBuffer;