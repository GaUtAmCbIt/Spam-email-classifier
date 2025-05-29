import { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    setResult(data.prediction);
  };

  return (
    <div className="App">
      <h1>Email Spam Classifier</h1>
      <textarea
        rows="6"
        cols="50"
        placeholder="Enter email content here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Check</button>
      <h2>Result: {result}</h2>
    </div>
  );
}

export default App;
