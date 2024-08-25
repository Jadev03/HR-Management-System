import React, { useState } from 'react';
import axios from 'axios';
import '../styleAssets/Report.css';

const JobtitleEmployees = () => {
  const [jobTitleId, setJobTitleId] = useState('');
  const [employees, setEmployees] = useState([]);

  const fetchJobTitleEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8800/jobreport/"+jobTitleId);
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Job of Employees</h2>
      <label>Job ID: </label>
      <input
        type="text"
        value={jobTitleId}
        onChange={(e) => setJobTitleId(e.target.value)}
      />
      <button onClick={fetchJobTitleEmployees}>Fetch Employees</button>

      <table className='Employee-table'>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>NIC</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Tel-No</th>
            <th>Department</th>
            <th>Maritial Status</th>
            <th>PayGrade</th>
            <th>Status ID</th>
            <th>Supervisor ID</th>
            
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.Employee_ID}>
              <td>{employee.Employee_ID}</td>
              <td>{employee.First_Name}</td>
              <td>{employee.Last_Name}</td>
              <td>{employee.NIC}</td>
              <td>{employee.Date_Of_Birth}</td>
              <td>{employee.Gender}</td>
              <td>{employee.Tel_No}</td>
              <td>{employee.Department}</td>
              <td>{employee.Maritial_Status}</td>
              <td>{employee.Paygrade_ID}</td>
              <td>{employee.Status_ID}</td>
              <td>{employee.Supervisor_ID}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobtitleEmployees;
