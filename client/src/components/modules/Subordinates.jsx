import React, { useState } from 'react';
import axios from 'axios';
import '../styleAssets/Report.css';

const Subordinates = () => {
  const [employees, setEmployees] = useState([]);

  const fetchSubordinates = async () => {
    try {
      console.log('aa'+sessionStorage.getItem('user'));
      const res = await axios.get("http://localhost:8800/subordinate/"+sessionStorage.getItem('user'));
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
    <h2>Employees Under Your Supervision</h2>
    <button onClick={fetchSubordinates}>Fetch Subordinates</button>

      <table className='Employee-table'>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>NIC</th>
            <th>Tel-No</th>
            <th>Department</th>
            <th>Job Title</th>

            
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.Employee_ID}>
              <td>{employee.Employee_ID}</td>
              <td>{employee.First_Name}</td>
              <td>{employee.Last_Name}</td>
              <td>{employee.NIC}</td>
              <td>{employee.Tel_No}</td>
              <td>{employee.Department}</td>
              <td>{employee.Title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Subordinates;
