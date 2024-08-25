import React from 'react';
import '../styleAssets/AdminDashboard.css'; 
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const  employeeId  =  sessionStorage.getItem('user');
  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Manager Dashboard</h2>
        <ul>
          <li>
            <button className="add viewbutton">
              <Link to={`/personal-details/${employeeId}`}>View My Personal Information</Link>
            </button>
          </li>
          <li><button className="add viewbutton"><Link to="/request_leave">Request a Leave</Link></button></li>
          <li><button className="add viewbutton"><Link to="/employee">Edit Personal Information of the Employees </Link></button></li>
          <li><button className="add viewbutton"><Link to="/departmenthr">View Departments</Link></button></li>
          <li><button className="add viewbutton"><Link to="/job">View Job Titles</Link></button></li>
          <li><button className="add viewbutton"><Link to="/branch"> View Branches</Link></button></li>
        </ul>
      </aside>
      <main className="content">
        <header>
          <h1 className="company">Jupiter Apparels</h1>
          <h1>Welcome, Manager!</h1>
        </header>
      </main>
      
    </div>
  );
}

export default AdminDashboard;
