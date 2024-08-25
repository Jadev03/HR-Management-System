import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import '../styleAssets/Add_dept.css'

const Add_dept = () => {
  const [department, setDepartment] = useState({
    Dept_ID: '',
    Dept_Name: '',
    Building: '',
    Branch_ID: '',
  });

  const handleChange = (e) => {
    setDepartment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8800/department', department);
      console.log(res);
      navigate('/department');
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="form-container">
      <h1 className='heading'>Add new department</h1>
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter Department ID"
          onChange={handleChange}
          name="Dept_ID"
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter Department Name"
          onChange={handleChange}
          name="Dept_Name"
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter Department Building"
          onChange={handleChange}
          name="Building"
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter Branch ID"
          onChange={handleChange}
          name="Branch_ID"
        />
      </div>
      <button className="submit-button" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};

export default Add_dept;
