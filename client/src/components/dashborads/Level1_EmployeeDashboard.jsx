import React from 'react'
import '../styleAssets/AdminDashboard.css';
import { Link } from 'react-router-dom';


const Level1_EmployeeDashboard = () => {
  
  const  employeeId  =  sessionStorage.getItem('user');
  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Employee Dashboard</h2>
        <ul>
          <li>
            <button className="add viewbutton">
              <Link to={`/personal-details/${employeeId}`}>Personal Information</Link>
            </button>
          </li>
          
        </ul>
      </aside>

      <main className="content">
        <header>
          <h1 className="company">Jupiter Apparels</h1>
          <h1>Welcome, Employee!</h1>
        </header>
      </main>
      
    </div>
  );
};


export default Level1_EmployeeDashboard
