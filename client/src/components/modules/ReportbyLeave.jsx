import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styleAssets/Report.css';

const DepartmentLeaves = () => {
  const [departmentId, setDepartmentId] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [Leaves, setLeaves] = useState([]);

  const fetchDepartmentLeaves = async () => {
    try {
      const res = await axios.get('http://localhost:8800/leavebal/', {
        params: {  departmentId,startDate, endDate } // pass start and end dates  as parameters
      });
      setLeaves(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div>
      <h2>Department Leaves</h2>
      <label>Department ID: </label>
      <input
        type="text"
        value={departmentId}
        onChange={(e) => setDepartmentId(e.target.value)}
      />

      <div>
        <label>Start Date: </label>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      </div>

      <div>
        <label>End Date: </label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>

      <button onClick={fetchDepartmentLeaves}>Fetch Leaves</button>

      <table className='Employee-table'>
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Reason</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Duration</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Leaves.map((Leave) => (
            <tr key={Leave.Dept_ID}>
              <td>{Leave.Dept_ID}</td>
              <td>{Leave.Employee_ID}</td>
              <td>{Leave.First_Name}</td>
              <td>{Leave.Last_Name}</td>
              <td>{Leave.Reason}</td>
              <td>{Leave.Start_Date}</td>
              <td>{Leave.End_Date}</td>
              <td>{Leave.Duration}</td>
              <td>{Leave.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentLeaves;