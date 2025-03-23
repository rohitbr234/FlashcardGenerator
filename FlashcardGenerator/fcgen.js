const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

require('dotenv').config();

// Replace with your actual API key
const API_KEY = process.env.API_KEY;

// Initialize the Gemini AI Model
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// The prompt for generating flashcards
const prompt = `
Generate a TSV list where each line contains:
1. A pure Tamil word
2. A grammatically correct Tamil sentence using that word
3. The English translation of the word
4. The English translation of the sentence
Format: <Tamil word>\\t<Tamil sentence>\\t<English word>\\t<English sentence>
Return 50 unique words.
`;

async function fetchFlashcards() {
    try {
        // Generate content using Gemini
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();

        // Process response into a clean TSV format
        const tsvData = responseText.trim().split("\n").slice(1, -1).map(line => line.trim()).join("\n");

        // Save to a TSV file
        fs.writeFileSync("anki_flashcards.tsv", tsvData);
        console.log("✅ Anki flashcards saved as anki_flashcards.tsv!");
    } catch (error) {
        console.error("❌ Error fetching data:", error);
    }
}

// Run the function
fetchFlashcards();
