const { getPrinters, print } = require("pdf-to-printer");
const path = require('path');
const fs = require('fs');
const config = require('../config/config-service').getConfig();
const { spawn } = require('child_process');
const axios = require('axios');

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

    const filePath = path.join(process.cwd(), 'printfiles', `pf_${fileSuffix}.pdf`);

    fs.writeFileSync(filePath, pdfBuffer);
    if (config.log) {
        console.log("saved file", filePath);
    }

    let dataResult;
    if (config.nmVersion) {
        dataResult = await printFilePDF(filePath, printerName);
    } else {
        dataResult = await printFilePDF_sumatra(filePath, printerName);
    }

    return dataResult;
}

const printPdfBase64 = async (pdfBase64, printerName, fileSuffix) => {

    const pdfBuffer = Buffer.from(pdfBase64, 'base64');
    const filePath = path.join(process.cwd(), 'printfiles', `pf_${fileSuffix}.pdf`);

    fs.writeFileSync(filePath, pdfBuffer);
    if (config.log) {
        console.log("saved file", filePath);
    }

    let dataResult;
    if (config.nmVersion) {
        dataResult = await printFilePDF(filePath, printerName);
    } else {
        dataResult = await printFilePDF_sumatra(filePath, printerName);
    }

    return dataResult;
}

const printFilePDF = async (filePath, printerName) => {

    let dataResult = { is_error: false, message: '', printerName };
    try {
        if (printerName) {
            await print(filePath, { printer: printerName });
        } else {
            await print(filePath);
        }
        if (config.log) {
            console.log("printFilePDF", { res: 'success', filePath, printerName });
        }
        setTimeout(() => {
            try {
                fs.unlinkSync(filePath);
            } catch (err) { }
        }, 25000);
    } catch (error) {
        console.error("print error:", error);
        dataResult.is_error = true;
        dataResult.message = error.message;
    }
    return dataResult;
}

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const printFilePDF_sumatra = async (filePath, inPrinterName) => {

    const printerName = inPrinterName ?? config.printer;

    let dataResult = { is_error: false, message: '', printerName };
    const sumatraPath = path.join(process.cwd(), 'pdfprintsoftware', 'SumatraPDF-3.4.6-32.exe');

    try {

        let printMainCommand;
        if (printerName) {
            printMainCommand = ['-print-to', printerName];
        } else {
            printMainCommand = ['-print-to-default'];
        }
        const printFullCommand = printMainCommand.concat([
            '-print-settings',
            'fit',
            '-silent',
            filePath
        ]);
        const printProcess = spawn(sumatraPath, printFullCommand);

        printProcess.stdout.on('data', (data) => {
            if (config.log) {
                console.log(`STDOUT: ${data}`);
            }
        });

        printProcess.stderr.on('data', (data) => {
            console.error(`STDERR: ${data}`);
            dataResult.is_error = true;
            dataResult.message = data;
        });

        printProcess.on('close', (code) => {
            if (code === 0) {
                console.log(`Printed successfully: ${filePath}`);
            } else {
                console.error(`Print error code: ${code}`);
                dataResult.is_error = true;
                dataResult.message = code;
            }
        });

        if (config.log) {
            console.log("printFilePDF_sumatra", { res: 'success', filePath, printerName });
        }
        setTimeout(() => {
            try {
                fs.unlinkSync(filePath);
            } catch (err) { }
        }, 20000);

    } catch (error) {
        console.error("print error:", error);
        dataResult.is_error = true;
        dataResult.message = error.message;
    }

    await sleep(3000);

    return dataResult;
}

const printPngBase64 = async (pngInput, printerName, fileSuffix) => {
    
    const printDir = path.join(process.cwd(), 'printfiles');
    if (!fs.existsSync(printDir)) fs.mkdirSync(printDir);
    const filePath = path.join(process.cwd(), 'printfiles', `pf_${fileSuffix}.png`);
    let pngBuffer;

    // check, base64 or URL
    if (typeof pngInput === 'string' && pngInput.startsWith('http')) {
        // download image from URL
        try {
            const response = await axios.get(pngInput, { responseType: 'arraybuffer' });
            pngBuffer = Buffer.from(response.data);
        } catch (error) {
            console.error("Failed to download PNG from URL:", error);
            return { is_error: true, message: `Failed to download PNG: ${error.message}`, printerName };
        }
    } else {
        //base64
        try {
            pngBuffer = Buffer.from(pngInput, 'base64');
        } catch (error) {
            console.error("Invalid base64 input:", error);
            return { is_error: true, message: `Invalid base64 input: ${error.message}`, printerName };
        }
    }

    // save PNG-file
    fs.writeFileSync(filePath, pngBuffer);
    if (config.log) {
        console.log("saved PNG file", filePath);
    }

    let dataResult = { is_error: false, message: '', printerName };

    try {
        // print command for PNG in Windows using rundll32
        const printCommand = [
            'rundll32',
            'shimgvw.dll,ImageView_PrintTo',
            `"${filePath}"`, // file path
            `"${printerName || ''}"` // printer name (empty for default windows printer)
        ];

        const printProcess = spawn('cmd.exe', ['/c', printCommand.join(' ')], { shell: true });

        printProcess.stdout.on('data', (data) => {
            if (config.log) {
                console.log(`STDOUT: ${data}`);
            }
        });

        printProcess.stderr.on('data', (data) => {
            console.error(`STDERR: ${data}`);
            dataResult.is_error = true;
            dataResult.message = data.toString();
        });

        printProcess.on('close', (code) => {
            if (code === 0) {
                console.log(`Printed PNG successfully: ${filePath}`);
            } else {
                console.error(`Print PNG error code: ${code}`);
                dataResult.is_error = true;
                dataResult.message = `Error code: ${code}`;
            }
        });

        // delete PNG-file after 20 seconds
        setTimeout(() => {
            try {
                fs.unlinkSync(filePath);
            } catch (err) {
                console.error("Failed to delete PNG file:", err);
            }
        }, 20000);

    } catch (error) {
        console.error("print PNG error:", error);
        dataResult.is_error = true;
        dataResult.message = error.message;
    }

    // waiting for print process
    await sleep(3000);

    return dataResult;
};


exports.getPrintersList = getPrintersList;
exports.printPdfBuffer = printPdfBuffer;
exports.printPdfBase64 = printPdfBase64;
exports.printPngBase64 = printPngBase64;