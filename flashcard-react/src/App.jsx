import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [language, setLanguage] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateFlashcards = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:5000/generate-flashcards',
        { language, topic },
        { responseType: 'blob' }   // ✅ treat response as file
      );

      const blob = new Blob([response.data], { type: 'text/tab-separated-values' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'anki_flashcards.tsv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      setError('Error generating flashcards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Flashcard Generator</h1>
      <p>Generate Anki flashcards for a specific topic and language.</p>

      <div className="input-section">
        <input
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          placeholder="Enter language (e.g., Tamil)"
          disabled={loading}
        />

        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic (e.g., Nature, Food, Technology)"
          disabled={loading}
        />

        <button onClick={generateFlashcards} disabled={loading || !language || !topic}>
          {loading ? '⏳ Generating Flashcards...' : 'Generate Flashcards'}
        </button>
      </div>

      {loading && (
        <div className="loading-indicator">
          <p>✨ Please wait — creating your flashcards with Gemini...</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
