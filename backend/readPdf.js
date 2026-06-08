const fs = require("fs");
const pdf = require("pdf-parse");

async function readPDF() {
    const dataBuffer = fs.readFileSync("./pdf/handbook.pdf");

    const data = await pdf(dataBuffer);

    return data.text;
}

module.exports = readPDF;