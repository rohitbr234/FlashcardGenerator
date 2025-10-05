Flashcard Generator
===================

A web application that generates Anki-compatible flashcards for learning vocabulary in various languages using the Google Generative AI (Gemini) model. The app allows users to specify a language and generates a downloadable TSV file containing 50 unique words, each accompanied by a sentence in the target language, along with their English translations.

Features
--------

*   **Language Selection**: Users can input any language to generate flashcards (e.g., Tamil, Spanish, French).
    
*   **TSV Output**: Generates a tab-separated values (TSV) file compatible with Anki for easy import.
    
*   **AI-Powered**: Utilizes Google’s Gemini AI to create accurate and contextually relevant vocabulary and sentences.
    
*   **Simple UI**: A clean React-based frontend for user input and flashcard generation.
    
*   **Error Handling**: Displays clear error messages if the generation process fails.
    

Tech Stack
----------

*   **Backend**: Node.js, Express.js, Google Generative AI (Gemini)
    
*   **Frontend**: React, Axios
    
*   **Dependencies**:
    
    *   Backend: express, cors, axios, dotenv, @google/generative-ai, fs, path
        
    *   Frontend: react, axios
        
*   **File Format**: Generates TSV files for Anki compatibility
    

Prerequisites
-------------

*   Node.js (v16 or higher)
    
*   npm or yarn
    
*   Google Generative AI API key (set up in a .env file)
    

Installation
------------

1.  git clone https://github.com/your-username/flashcard-generator.gitcd flashcard-generator
    
2.  npm install
    
3.  cd clientnpm install
    
4.  API\_KEY=your\_google\_generative\_ai\_api\_keyPORT=5000
    
5.  npm startThe backend server will run on http://localhost:5000 (or the port specified in .env).
    
6.  npm startThe React app will run on http://localhost:3000 by default.
    

Usage
-----

1.  Open the app in your browser (e.g., http://localhost:3000).
    
2.  Enter the desired language (e.g., "Tamil", "Spanish") in the input field.
    
3.  Click the "Generate Flashcards" button.
    
4.  A TSV file (anki\_flashcards.tsv) will be downloaded containing 50 flashcards.
    
5.  Import the TSV file into Anki to start learning!
    

File Format
-----------

The generated TSV file has the following format:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML   

Example (for Tamil):

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   நூல்   நான் ஒரு நூல் வாங்கினேன்   book   I bought a book  வீடு   இது என் வீடு   house   This is my house  ...   `

Notes
-----

*   Ensure the Google Generative AI API key is valid and has sufficient quota.
    
*   The backend removes the first and last lines of the AI response to clean up any extraneous content.
    
*   The generated TSV file is temporarily stored on the server and deleted after download.
    
*   The app assumes the backend is running on http://localhost:5000. Update the frontend Axios URL if using a different host or port.
    

Troubleshooting
---------------

*   **Error: "Language is required"**: Ensure you entered a language in the input field.
    
*   **Error: "Error generating flashcards"**: Check your API key, internet connection, or server logs for details.
    
*   **CORS Issues**: Ensure the backend is running and CORS is properly configured.
    

Future Improvements
-------------------

*   Add support for selecting the number of flashcards.
    
*   Include options for customizing sentence complexity.
    
*   Add a preview of generated flashcards before download.
    
*   Support multiple AI models for flashcard generation.
    

License
-------

This project is licensed under the MIT License. See the LICENSE file for details.
