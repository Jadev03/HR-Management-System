import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../styleAssets/Add_employee.css'

const Add_leave_request = () => {
  const [leave, setLeaves] = useState({
    Employee_ID: '',
    Leave_Type: '',
    Supervisor_ID: '',
    Reason: '',
    Start_Date: '',
    End_Date: '',
    Duration: '',
    Status: 'Pending',
    Comments: '',
  });


  const handleChange = (e) => {
    setLeaves((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8800/request_leave', leave);
      console.log(res);

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="form-container">
      <h1 className='heading'>Request a Leave</h1>
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter employee ID"
          onChange={handleChange}
          name="Employee_ID"
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter leave type"
          onChange={handleChange}
          name="Leave_Type"
        />
      </div>
      
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter reason" 
          onChange={handleChange}
          name="Reason"
        />
      </div>
      <div className="form-input">
        <input
          type="date"
          placeholder="Enter start date"
          onChange={handleChange}
          name="Start_Date"
        />
      </div>

      <div className="form-input">
        <input
          type="date"
          placeholder="Enter end date"
          onChange={handleChange}
          name="End_Date"
        />
      </div>
      <button className="submit-button" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};

export default Add_leave_request;
