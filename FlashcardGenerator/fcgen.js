import express from "express";
import cors from "cors";
import axios from "axios";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;

app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

app.post('/generate-flashcards', async (req, res) => {
  const { language, topic } = req.body;

  if (!language || !topic) {
    return res.status(400).json({ error: 'Language and topic are required' });
  }

  const prompt = `
    Generate a TSV list of 50 unique ${language} words related to the topic "${topic}".
    Each line should contain:
    1. A pure ${language} word related to "${topic}"
    2. A grammatically correct ${language} sentence using that word
    3. The English translation of the word
    4. The English translation of the sentence

    Format each line as:
    <${language} word>\\t<${language} sentence>\\t<English word>\\t<English sentence>
  `;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const tsvData = responseText
      .trim()
      .split('\n')
      .filter(line => line.trim().length > 0)
      .join('\n');

    const filePath = path.join(__dirname, 'anki_flashcards.tsv');
    fs.writeFileSync(filePath, tsvData, 'utf8');

    res.download(filePath, 'anki_flashcards.tsv', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Error generating flashcards' });
        }
      }
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error('Error generating flashcards:', error);
    res.status(500).json({ error: 'Error generating flashcards', details: error.message });
  }
});

app.listen(port, () => console.log(`Backend server running on port ${port}`));
