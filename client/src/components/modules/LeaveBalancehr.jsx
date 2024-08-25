import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styleAssets/LeaveBalance.css';

const LeaveBalance = () => {
  const [LeaveBalances, setLeaveBalances] = useState([]);

  useEffect(() => {
    const fetchAllLeaveBalances = async () => {
      try {
        const res = await axios.get("http://localhost:8800/leave_bal");
        setLeaveBalances(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllLeaveBalances();
  }, []);

  return (
    <div>
      <h1 className='company'>Jupiter Apparels</h1>
      <h1>Leave Balance</h1>
      <table className="leave_bal-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Year</th>
            <th>Annual</th>
            <th>Casual</th>
            <th>Maternity</th>
            <th>No_pay</th>
          </tr>
        </thead>
        <tbody>
          {LeaveBalances.map((leave_bal) => (
            <tr key={leave_bal.Employee_ID}>
              <td>{leave_bal.Employee_ID}</td>
              <td>{leave_bal.Year}</td>
              <td>{leave_bal.Annual}</td>
              <td>{leave_bal.Casual}</td>
              <td>{leave_bal.Maternity}</td>
              <td>{leave_bal.No_pay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default LeaveBalance;

