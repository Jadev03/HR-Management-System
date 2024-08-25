import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate, useLocation } from 'react-router-dom';

const UpdateEmployee = () => {
  const [employee, setEmployee] = useState({
    Tel_No: '',
    Dept_ID: '',
    Title_ID: '',
    Paygrade_ID: '',
    Status_ID: '',
    Supervisor_ID: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  const handleChange = (e) => {
    setEmployee((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/employee/"+id, employee);
      navigate('/employee');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-container">
      <h1>Update Employee Information</h1>
      <div className="form-input">
        <input
          type="text"
          placeholder="Telephone No."
          onChange={handleChange}
          name="Tel_No"
        />
      </div>

      <div className="form-input">
        <input
          type="text"
          placeholder="New Department ID"
          onChange={handleChange}
          name="Dept_ID"
        />
      </div>

      <div className="form-input">
        <input
          type="text"
          placeholder="New Title ID"
          onChange={handleChange}
          name="Title_ID"
        />
      </div>

      <div className="form-input">
        <input
          type="text"
          placeholder="New Paygrade ID"
          onChange={handleChange}
          name="Paygrade_ID"
        />
      </div>

      <div className="form-input">
        <input
          type="text"
          placeholder="New Status ID"
          onChange={handleChange}
          name="Status_ID"
        />
      </div>

      <div className="form-input">
        <input
          type="text"
          placeholder="New Supervisor ID"
          onChange={handleChange}
          name="Supervisor_ID"
        />
      </div>

      <button className="submit-button" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};

export default UpdateEmployee;
