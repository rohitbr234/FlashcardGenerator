import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Assuming you add your CSS in this file

function App() {
  const [language, setLanguage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle form submission and fetch flashcards
  const generateFlashcards = async () => {
    setLoading(true);
    setError(null);

    try {
      // Send language and request flashcards generation to backend
      const response = await axios.post('http://localhost:5000/generate-flashcards', { language });

      // Create a Blob from the response and trigger download
      const blob = new Blob([response.data], { type: 'text/tab-separated-values' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'anki_flashcards.tsv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError('Error generating flashcards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Flashcard Generator</h1>
      <p>Enter the language you want to generate flashcards for:</p>

      <input 
        type="text" 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)} 
        placeholder="Enter language (e.g., Tamil)"
      />

      <button onClick={generateFlashcards} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Flashcards'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
