import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate, useLocation } from 'react-router-dom';

const UpdatePaygrade = () => {
  const [paygrade, setPaygrade] = useState({
    Annual_Leave_Allowance: '',
    Casual_Leave_Allowance: '',
    Maternity_Leave_allowance: '',
    NO_pay_Allowance: '',
    Description: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  const handleChange = (e) => {
    setPaygrade((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/paygrade/"+id, paygrade);
      navigate('/paygrade');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-container">
      <h1>Update the paygrade</h1>
      <div className="form-input">
        <input
          type="number"
          placeholder="Annual leave allowance"
          onChange={handleChange}
          name="Annual_Leave_Allowance"
        />
      </div>

      <div className="form-input">
        <input
          type="number"
          placeholder="Casual leave allowance"
          onChange={handleChange}
          name="Casual_Leave_Allowance"
        />
      </div>

      <div className="form-input">
        <input
          type="number"
          placeholder="Maternity leave allowance"
          onChange={handleChange}
          name="Maternity_Leave_Allowance"
        />
      </div>

      <div className="form-input">
        <input
          type="number"
          placeholder="No-pay leave allowance"
          onChange={handleChange}
          name="NO_pay_Allowance"
        />
      </div>

      <div className="form-input">
        <input
          type="text"
          placeholder="Add description"
          onChange={handleChange}
          name="Description"
        />
      </div>

      <button className="submit-button" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};

export default UpdatePaygrade;
