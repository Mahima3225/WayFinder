// frontend/src/components/SearchBox.js
import React, { useState } from 'react';
import axios from 'axios';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/openai/generate`, 
        { website: 'general', task: query }, 
        { headers: { 'x-auth-token': token } }
      );
      setResponseData(res.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Not visiting a website? Ask your question:</h3>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g., How to deploy a Node.js app?"
      />
      <button onClick={handleSearch}>Search</button>
      {responseData && (
        <div style={{ marginTop: '1rem', background: '#eee', padding: '1rem', borderRadius: '4px' }}>
          <h4>Generated Steps</h4>
          {responseData.steps.map((step, index) => <p key={index}>{step}</p>)}
          <p>{responseData.instructions}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
