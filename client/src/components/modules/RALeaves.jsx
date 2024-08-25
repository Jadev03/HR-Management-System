import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styleAssets/Report.css';

const LeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      console.log('aa' + sessionStorage.getItem('user'));
      const employeeId = sessionStorage.getItem('user');
      const res = await axios.get(`http://localhost:8800/ra_leaves/${employeeId}`);
      if (Array.isArray(res.data)) {
        setLeaves(res.data);
      } else {
        console.error('Data received is not an array:', res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
    <h2>Leave Requests</h2>
    <button onClick={fetchLeaves}>Fetch Leave Requests</button>

      <table className='Employee-table'>
        <thead>
          <tr>
            <th>Leave Request ID</th>
            <th>Employee ID</th>
            <th>Leave Type</th>
            <th>Reason</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Comments</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.Leave_Request_ID}>
              <td>{leave.Leave_Request_ID}</td>
              <td>{leave.Employee_ID}</td>
              <td>{leave.Leave_Type}</td>
              <td>{leave.Reason}</td>
              <td>{leave.Start_Date}</td>
              <td>{leave.End_Date}</td>
              <td>{leave.Duration}</td>
              <td>{leave.Status}</td>
              <td>{leave.Comments}</td>
              <td><button className="update"><Link to ={`/action-take/${leave.Employee_ID}`}>Take Action</Link></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequests;
