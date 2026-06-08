require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { GoogleGenAI } = require("@google/genai");
const readPDF = require("./readPdf");

const {
loadKnowledge,
searchRelevant
} = require("./rag");

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
apiKey: process.env.GEMINI_API_KEY
});

async function loadPDF() {
await readPDF();
console.log("PDF Loaded");
}

loadPDF();
loadKnowledge();

app.get("/", (req, res) => {
res.send("PIM AI Assistant API Running");
});

app.post("/ask", async (req, res) => {

try {

    const question = req.body.question;

    // ค้นหา Chunk ที่เกี่ยวข้อง
    const context = searchRelevant(question);

    const prompt = `

You are an AI assistant.

Answer ONLY using the information below.

Context:
${context}

Question:
${question}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    res.json({
        answer: response.text
    });

} catch (error) {

    console.error(error);

    res.status(500).json({
        error: error.message
    });

}

});

app.listen(3000, () => {
console.log("Server running on port 3000");
});
