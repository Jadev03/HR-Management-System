import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styleAssets/Department.css';

const Department = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchAllDepartments = async () => {
      try {
        const res = await axios.get("http://localhost:8800/department");
        setDepartments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllDepartments();
  }, []);

  return (
    <div>
      <h1 className='company'>Jupiter Apparels</h1>
      <h1>Departments</h1>
      <table className="department-table">
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Department Name</th>
            <th>Building</th>
            <th>Branch ID</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.Dept_ID}>
              <td>{department.Dept_ID}</td>
              <td>{department.Dept_Name}</td>
              <td>{department.Building}</td>
              <td>{department.Branch_ID}</td>
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
    
  );
};

export default Department;

