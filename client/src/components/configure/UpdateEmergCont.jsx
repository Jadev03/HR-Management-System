import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate, useLocation } from 'react-router-dom';

const UpdateEmergCont = () => {
  const [EmergCont, setEmergCont] = useState({
    First_Name: '',
    Last_Name: '',
    Tel_No: '',
    Relationship: '',
    Address: '',
    Email: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  const handleChange = (e) => {
    setEmergCont((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/emergency_cont/"+id, EmergCont);
      navigate('/emergency_cont');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-container">
      <h1>Update Emergency Contact of the Employeet</h1>
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter First Name"
          onChange={handleChange}
          name="First_Name"
        />
      </div>

      <div className="form-input">
        <input
          type="text"
          placeholder="Enter Last Name"
          onChange={handleChange}
          name="Last_Name"
        />
      </div>

      <div className="form-input">
        <input
          type="text"
          placeholder="Enter Tel. No"
          onChange={handleChange}
          name="Tel_No"
        />
      </div>

      <div className="form-input">
        <input
          type="text"
          placeholder="Enter Relationship"
          onChange={handleChange}
          name="Relationship"
        />
      </div>

      <div className="form-input">
        <input
          type="text"
          placeholder="Enter address"
          onChange={handleChange}
          name="Address"
        />
      </div>

      <div className="form-input">
        <input
          type="text"
          placeholder="Enter email"
          onChange={handleChange}
          name="Email"
        />
      </div>

      <button className="submit-button" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};

export default UpdateEmergCont;
