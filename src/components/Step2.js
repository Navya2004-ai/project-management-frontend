import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Step.css';

function Step2() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    size: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('userData')) || {};
    setFormData(prev => ({
      ...prev,
      companyName: savedData.companyName || '',
      industry: savedData.industry || '',
      size: savedData.size || ''
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required.";
    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const existingData = JSON.parse(localStorage.getItem('userData')) || {};
      const updatedData = { ...existingData, ...formData };
      localStorage.setItem('userData', JSON.stringify(updatedData));
      navigate('/step3');
    } else {
      setErrors(validationErrors);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="step-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: '66%' }}></div>
      </div>

      <h2>Step 2: Business Info</h2>

      <div className="form-group">
        <label>Company Name<span>*</span></label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Enter company name"
        />
        {errors.companyName && <p className="error">{errors.companyName}</p>}
      </div>

      <div className="form-group">
        <label>Industry</label>
        <select name="industry" value={formData.industry} onChange={handleChange}>
          <option value="">-- Select Industry --</option>
          <option value="Tech">Tech</option>
          <option value="Finance">Finance</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>Company Size</label>
        <select name="size" value={formData.size} onChange={handleChange}>
          <option value="">-- Select Size --</option>
          <option value="1-10">1-10</option>
          <option value="11-50">11-50</option>
          <option value="51-200">51-200</option>
          <option value="201-1000">201-1000</option>
          <option value="1000+">1000+</option>
        </select>
      </div>

      <div className="button-group">
        <button className="btn-back" onClick={handleBack}>Back</button>
        <button className="btn-next" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default Step2;
