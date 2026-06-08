const readPDF = require("./readPdf");

let chunks = [];

async function loadKnowledge() {


const text = await readPDF();

const chunkSize = 1000;

chunks = [];

for (let i = 0; i < text.length; i += chunkSize) {

    chunks.push(
        text.substring(i, i + chunkSize)
    );

}

console.log("Knowledge Loaded");
console.log("Chunks:", chunks.length);


}

function searchRelevant(question) {


const words = question.toLowerCase().split(" ");

let bestChunk = "";
let bestScore = 0;

chunks.forEach(chunk => {

    let score = 0;

    words.forEach(word => {

        if (chunk.toLowerCase().includes(word)) {
            score++;
        }

    });

    if (score > bestScore) {
        bestScore = score;
        bestChunk = chunk;
    }

});

return bestChunk || chunks[0];


}

module.exports = {
loadKnowledge,
searchRelevant
};
