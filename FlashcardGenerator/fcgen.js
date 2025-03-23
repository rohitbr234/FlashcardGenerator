const cors = require('cors');
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini AI Model
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Endpoint to generate flashcards
app.post('/generate-flashcards', async (req, res) => {
  const { language } = req.body;

  if (!language) {
    return res.status(400).send('Language is required');
  }

  const prompt = `
    Generate a TSV list where each line contains:
    1. A pure ${language} word
    2. A grammatically correct ${language} sentence using that word
    3. The English translation of the word
    4. The English translation of the sentence
    Format: <${language} word>\\t<${language} sentence>\\t<English word>\\t<English sentence>
    Return 50 unique words.
  `;

  try {
    // Generate content using Gemini AI
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    // Process response: remove the first and last line
    const tsvData = responseText
      .trim()
      .split("\n") // Split into lines
      .slice(1, -1) // Remove first and last lines
      .map(line => line.trim()) // Trim each line
      .join("\n"); // Join back into a single string

    // Create a Blob from the processed TSV data
    const filePath = path.join(__dirname, 'anki_flashcards.tsv');
    fs.writeFileSync(filePath, tsvData);

    // Send the file as a response for downloading
    res.download(filePath, 'anki_flashcards.tsv', (err) => {
      if (err) {
        console.log('Error downloading file:', err);
        res.status(500).send('Error generating flashcards');
      }

      // Clean up by deleting the file after download
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.log('Error generating flashcards:', error);
    res.status(500).send('Error generating flashcards');
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
