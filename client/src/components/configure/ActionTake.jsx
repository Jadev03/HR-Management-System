import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const UpdateLeaveRequest = () => {
  const [leave, setLeaves] = useState({
    Status: 'Pending',
    Comments: ''
  });
  const [message, setMessage] = useState(null);

  const location = useLocation();
  const id = location.pathname.split('/')[2];

  const handleChange = (e) => {
    setLeaves((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/leave_request_takeaction/" + id, leave);
      setMessage({ text: 'Successfully updated!', type: 'success' });
    } catch (err) {
      setMessage({ text: 'An error occured while updating :(', type: 'error' });
      console.log(err);
    }
  };

  return (
    <div className="form-container">
      <h1>Take Action on Leave Requests</h1>
      <div className="form-input">
        <label htmlFor="Status">Choose Action:</label>
        <select
          value={leave.Status}
          onChange={handleChange}
          name="Status"
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="form-input">
        <input
          type="text"
          placeholder="Add comments"
          onChange={handleChange}
          name="Comments"
        />
      </div>
      <button className="submit-button" onClick={handleClick}>
        Submit
      </button>
      {message && (
        <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default UpdateLeaveRequest;
