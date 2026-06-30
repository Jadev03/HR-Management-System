import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate, useLocation } from 'react-router-dom';

const UpdateLeaveBal = () => {
  const [leave_bal, setLeaveBal] = useState({
    Annual: '',
    Casual: '',
    Maternity: '',
    No_pay: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  const handleChange = (e) => {
    setLeaveBal((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/leave_bal/"+id, leave_bal);
      navigate('/leave_bal');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-container">
      <h1>Update the leave balance of the employee</h1>
      <div className="form-input">
        <input
          type="number"
          placeholder="Annual leave balance"
          onChange={handleChange}
          name="Annual"
        />
      </div>

      <div className="form-input">
        <input
          type="number"
          placeholder="Casual leave balance"
          onChange={handleChange}
          name="Casual"
        />
      </div>

      <div className="form-input">
        <input
          type="number"
          placeholder="Maternity leave balance"
          onChange={handleChange}
          name="Maternity"
        />
      </div>

      <div className="form-input">
        <input
          type="number"
          placeholder="No-pay leave balance"
          onChange={handleChange}
          name="No_pay"
        />
      </div>

      <button className="submit-button" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};

export default UpdateLeaveBal;
