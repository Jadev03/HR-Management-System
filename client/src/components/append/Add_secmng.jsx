import React, { useState } from 'react';
import axios from 'axios';
import '../styleAssets/Add_dept.css';

const Add_secmng = () => {
  const [SecMng, setSecMng] = useState({
    User_ID: '',
    Employee_ID: '',
    Access_level: 'Sec. Management User',
    Password: '',
  });

  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');

  const handleChange = (e) => {
    setSecMng((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8800/userCreate', SecMng);
      console.log(res);

      if (res.data === 'Success') {
        setMessageColor('green');
        setMessage('User created successfully.');
      } else {
        setMessageColor('red');
        setMessage('User creation failed.');
      }
    } catch (err) {
      console.log(err);
      setMessageColor('red');
      setMessage('An error occurred while creating the user.');
    }
  };

  

  return (
    <div className="form-container">
      <h1 className="heading">Add New Second Management User</h1>
      {message && (
        <p style={{ color: messageColor }}>{message}</p>
      )}
      <div className="form-input">
        <input
          type="text"
          placeholder="Create New User ID"
          onChange={handleChange}
          name="User_ID"
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter Employee ID"
          onChange={handleChange}
          name="Employee_ID"
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter Password"
          onChange={handleChange}
          name="Password"
        />
      </div>

      <button className="submit-button" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};

export default Add_secmng;
