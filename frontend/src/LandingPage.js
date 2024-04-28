  import React, { useState } from 'react';
  import './LandingPage.css';

  function LandingPage() {
    const [tweet, setTweet] = useState('');
    const [result, setResult] = useState({ sentiment: '', topic: '', response: '' });

    const handleAnalyze = async (endpoint) => {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tweet })
      });
      const data = await response.json();
      setResult({ ...result, ...data });
    };

    return (
      <div>
        <h1>Tweet Analysis Tool</h1>
        <input
          type="text"
          value={tweet}
          onChange={e => setTweet(e.target.value)}
          placeholder="Enter your tweet..."
        />
        <div>
          <button onClick={() => handleAnalyze('http://127.0.0.1:5000/api/analyze')}>Analyze Tweet</button>
        </div>
        <div>
        <p>Sentiment: {result.sentiment}</p>
        </div>
        <div>
        <p>Topic: {result.topic}</p>
        </div>
      </div>
    );
  }

  export default LandingPage;
