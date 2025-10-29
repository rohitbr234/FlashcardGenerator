Flashcard Generator
===================

This project is a full-stack web application that generates Anki-compatible flashcards using Google's Gemini API. The backend is built with Node.js and Express, while the frontend is a simple React interface that allows users to specify a language and a topic for flashcard generation. The app then produces a downloadable TSV file containing word pairs and example sentences suitable for direct import into Anki.

Features
--------

*   Generates 50 language-specific flashcards based on a user-provided topic.
    
*   Uses Google Gemini 2.5 Flash for intelligent and contextual content generation.
    
*   Provides downloadable tab-separated (TSV) output for easy import into Anki.
    
*   Clean, responsive React frontend with loading indication and error handling.
    
*   Backend built with Express and integrated with Google’s Generative AI SDK.
    

Project Structure
-----------------

The project is divided into two main parts:

1.  **Backend (Node + Express)**Handles POST requests from the frontend, communicates with the Gemini API, processes AI responses, and returns the generated TSV file for download.
    
2.  **Frontend (React)**Provides a simple interface where users can input a language and topic, trigger flashcard generation, and download the resulting file.
    

Requirements
------------

*   Node.js (version 18 or higher recommended)
    
*   npm (Node Package Manager)
    
*   A Google AI Studio API key with access to Gemini 2.5 models
    

Setup Instructions
------------------

1.  git clone
    
2.  cd FlashcardGenerator
    
3.  npm install
    
4.  API\_KEY=your\_google\_ai\_studio\_key
    
5.  node fcgen.jsThe server will start on port 5000 by default.
    
6.  npm startThe React app runs on port 3000 by default.
    

Usage
-----

1.  Open the React app in your browser (http://localhost:3000).
    
2.  Enter a language (for example, Tamil, Spanish, or French).
    
3.  Enter a topic (for example, Food, Nature, or Technology).
    
4.  Click the "Generate Flashcards" button.
    
5.  Wait while the app communicates with the backend and the AI generates the flashcards.
    
6.  Once ready, a TSV file named anki\_flashcards.tsv will automatically download.
    

How It Works
------------

1.  The React frontend collects user input (language and topic).
    
2.  The data is sent via a POST request to the Express backend.
    
3.  The backend constructs a natural-language prompt and sends it to the Gemini 2.5 Flash model.
    
4.  The Gemini API generates 50 word pairs, each including:
    
    *   A word in the selected language
        
    *   A sentence using that word
        
    *   The English translation of the word and sentence
        
5.  The backend formats the response into TSV format and sends it back to the frontend.
    
6.  The frontend triggers a file download so the user can save and import it into Anki.
    

Common Issues
-------------

*   **\_\_dirname not defined**: Occurs when using ES modules in Node. Ensure fileURLToPath and path.dirname are used to define \_\_dirname.
    
*   **404 from Gemini API**: Make sure you are using an API key from Google AI Studio, not MakerSuite, and that your model name is gemini-2.5-flash or gemini-2.5-pro.
    
*   **CORS errors**: Confirm that the backend includes app.use(cors()) to allow requests from the frontend.
    

License
-------

This project is open source and available under the MIT License.
