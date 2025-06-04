import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Step.css';

function Step1() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const [errors, setErrors] = useState({});

  // Load saved data from localStorage (if any)
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('userData')) || {};
    setFormData(prev => ({
      ...prev,
      ...savedData
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
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem('userData', JSON.stringify(formData));
      navigate('/step2');
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="step-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: '33%' }}></div>
      </div>

      <h2>Step 1: Personal Info</h2>
      <div className="form-group">
        <label>Name<span>*</span></label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label>Email<span>*</span></label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="button-group">
        <button className="btn-back" disabled>Back</button>
        <button className="btn-next" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default Step1;
