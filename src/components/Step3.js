
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Step.css';

function Step3() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    theme: 'light',
    layout: 'comfortable'
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('userData')) || {};
    setFormData(prev => ({
      ...prev,
      theme: savedData.theme || 'light',
      layout: savedData.layout || 'comfortable'
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const existingData = JSON.parse(localStorage.getItem('userData')) || {};
    const updatedData = { ...existingData, ...formData };
    localStorage.setItem('userData', JSON.stringify(updatedData));
    navigate('/dashboard');
  };

  const handleBack = () => {
    navigate('/step2');
  };

  return (
    <div className="step-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: '100%' }}></div>
      </div>

      <h2>Step 3: Preferences</h2>

      <div className="form-group">
        <label>Theme</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="theme"
              value="light"
              checked={formData.theme === 'light'}
              onChange={handleChange}
            />
            Light
          </label>
          <label>
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={formData.theme === 'dark'}
              onChange={handleChange}
            />
            Dark
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Default Dashboard Layout</label>
        <select name="layout" value={formData.layout} onChange={handleChange}>
          <option value="compact">Compact</option>
          <option value="comfortable">Comfortable</option>
        </select>
      </div>

      <div className="button-group">
        <button className="btn-back" onClick={handleBack}>Back</button>
        <button className="btn-next" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Step3;
