// frontend/src/components/WebsiteSelection.js
import React from 'react';

const WebsiteSelection = ({ onSelect }) => {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>Select a Website or Service</h3>
      <button onClick={() => onSelect('aws')}>AWS</button>
      <button onClick={() => onSelect('github')}>GitHub</button>
      <button onClick={() => onSelect('custom')}>Other</button>
    </div>
  );
};

export default WebsiteSelection;
