import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

const Append = () => {
  const [job, setJob] = useState({
    Title_ID: '',
    Title: '',
  });

  const handleChange = (e) => {
    setJob((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8800/job', job);
      console.log(res);
      navigate('/job');
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="form-container">
      <h1>Add New Job Title</h1>
      <div className="form-input">
        <input
          type="text"
          placeholder="Title ID"
          onChange={handleChange}
          name="Title_ID"
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          placeholder="Title"
          onChange={handleChange}
          name="Title"
        />
      </div>
      <button className="submit-button" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};

export default Append;
