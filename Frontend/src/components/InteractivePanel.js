// frontend/src/components/InteractivePanel.js
import React, { useState } from 'react';
import axios from 'axios';

const InteractivePanel = ({ website }) => {
  const [task, setTask] = useState('');
  const [guide, setGuide] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleGenerate = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/openai/generate`, { website, task }, {
        headers: { 'x-auth-token': token }
      });
      setGuide(res.data);
      setCurrentStep(0);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const nextStep = () => {
    if (guide && currentStep < guide.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div style={{ border: '2px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
      <h3>What do you want to do on {website.toUpperCase()}?</h3>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter your task"
      />
      <button onClick={handleGenerate}>Generate Steps</button>
      
      {guide && (
        <div style={{ marginTop: '1rem' }}>
          <h4>Step-by-Step Guide</h4>
          <div style={{ background: '#f7f7f7', padding: '1rem', borderRadius: '4px' }}>
            <p>{guide.steps[currentStep]}</p>
            <p>{guide.instructions}</p>
          </div>
          {currentStep < guide.steps.length - 1 && (
            <button onClick={nextStep}>Next Step</button>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractivePanel;
