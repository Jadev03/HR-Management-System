import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styleAssets/Employee.css';
import { Link } from 'react-router-dom';

const Employee = () => {
  const [Employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:8800/employee");
        setEmployees(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllEmployees();
  }, []);

  return (
    <div>
      <h1 className='company'>Jupiter Apparels</h1>
      <h1>Employees</h1>
      <button className="add add-button">
            <Link to="/add_employee">
                <div className='buttonText'>Add new Employee</div>    
            </Link>
        </button>
      <table className="Employee-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>NIC</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Tel-No</th>
            <th>Email</th>
            <th>Department</th>
            <th>Maritial Status</th>
            <th>Job Title</th>
            <th>PayGrade</th>
            <th>Status ID</th>
            <th>Supervisor ID</th>
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          {Employees.map((Employee) => (
            <tr key={Employee.Employee_ID}>
              <td>{Employee.Employee_ID}</td>
              <td>{Employee.First_Name}</td>
              <td>{Employee.Last_Name}</td>
              <td>{Employee.NIC}</td>
              <td>{Employee.Date_Of_Birth}</td>
              <td>{Employee.Gender}</td>
              <td>{Employee.Tel_No}</td>
              <td>{Employee.Email}</td>
              <td>{Employee.Department}</td>
              <td>{Employee.Maritial_Status}</td>
              <td>{Employee.Title}</td>
              <td>{Employee.Paygrade_ID}</td>
              <td>{Employee.Status_ID}</td>
              <td>{Employee.Supervisor_ID}</td>
              <td>
                <button className="update"><Link to ={`/update_employee/${Employee.Employee_ID}`}>Edit</Link></button>
                {/* <button className="delete" onClick={()=>handleDelete(Employee.Dept_ID)}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
    
  );
};

export default Employee;