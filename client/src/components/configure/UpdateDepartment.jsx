import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate, useLocation } from 'react-router-dom';

const Configure = () => {
  const [department, setDepartment] = useState({
    Building: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  const handleChange = (e) => {
    setDepartment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/department/"+id, department);
      navigate('/department');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-container">
      <h1>Update the building</h1>
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter new building"
          onChange={handleChange}
          name="Building"
        />
      </div>
      <button className="submit-button" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};

export default Configure;
