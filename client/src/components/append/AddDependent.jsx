import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

const Append = () => {
  const [dependent, setDependent] = useState({
    Name: '',
    Employee_ID: '',
    Date_of_birth: '',
    Relationship: '',
  });

  const handleChange = (e) => {
    setDependent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8800/dependant_info', dependent);
      console.log(res);
      navigate('/dependant_info');
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="form-container">
      <h1>Add new dependents</h1>
      <div className="form-input">
        <input
          type="text"
          placeholder="Name"
          onChange={handleChange}
          name="Name"
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          placeholder="Employee ID"
          onChange={handleChange}
          name="Employee_ID"
        />
      </div>
      <div className="form-input">
        <input
          type="date"
          placeholder="Date of birth"
          onChange={handleChange}
          name="Date_of_Birth"
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          placeholder="Relationship"
          onChange={handleChange}
          name="Relationship"
        />
      </div>
      <button className="submit-button" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};

export default Append;
