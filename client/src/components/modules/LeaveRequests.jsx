import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styleAssets/LeaveRequest.css';

const LeaveRequest = () => {
  const [LeaveRequest, setLeaveRequest] = useState([]);

  useEffect(() => {
    const fetchAllLeaveRequest = async () => {
      try {
        const res = await axios.get("http://localhost:8800/leave_request");
        setLeaveRequest(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllLeaveRequest();
  }, []);

  return (
    <div>
      <h1 className='company'>Jupiter Apparels</h1>
      <h1>LeaveRequestes</h1>
      <table className="LeaveRequest-table">
        <thead>
          <tr>
            <th>Leave Request ID</th>
            <th>Employee ID</th>
            <th>Leave Type</th>
            <th>Supervisor ID</th> 
            <th>Reason</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {LeaveRequest.map((LeaveRequest) => (
            <tr key={LeaveRequest.Leave_Request_ID}>
              <td>{LeaveRequest.Leave_Request_ID}</td>
              <td>{LeaveRequest.Employee_ID}</td>
              <td>{LeaveRequest.Leave_Type}</td>
              <td>{LeaveRequest.Supervisor_ID}</td>
              <td>{LeaveRequest.Reason}</td>
              <td>{LeaveRequest.Start_date}</td>
              <td>{LeaveRequest.End_Date}</td>
              <td>{LeaveRequest.Duration}</td>
              <td>{LeaveRequest.Status}</td>
              <td>{LeaveRequest.Comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default LeaveRequest;

