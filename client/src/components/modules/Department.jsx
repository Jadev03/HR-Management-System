import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styleAssets/Department.css';
import { Link } from 'react-router-dom';

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

  // const handleDelete = async (id) => {
  //   try {
  //     const res = await axios.delete(`http://localhost:8800/department/${id}`);
  //     console.log(res);
  //     window.location.reload();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <div>
      <h1 className='company'>Jupiter Apparels</h1>
      <h1>Departments</h1>
      <button className="add add-button">
            <Link to="/add_dept">Add new department</Link>
        </button>
      <table className="department-table">
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Department Name</th>
            <th>Building</th>
            <th>Branch ID</th>
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.Dept_ID}>
              <td>{department.Dept_ID}</td>
              <td>{department.Dept_Name}</td>
              <td>{department.Building}</td>
              <td>{department.Branch_ID}</td>
              <td>
                <button className="update"><Link to ={`/configure/${department.Dept_ID}`}>Edit</Link></button>
                {/* <button className="delete" onClick={()=>handleDelete(department.Dept_ID)}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
    
  );
};

export default Department;

