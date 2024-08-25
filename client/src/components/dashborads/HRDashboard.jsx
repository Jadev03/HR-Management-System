import React from 'react';
import '../styleAssets/AdminDashboard.css'; 
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const  employeeId  =  sessionStorage.getItem('user');
  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>HR Dashboard</h2>
        <ul>
          <li><button className="add viewbutton"><Link to="/employee">Edit Personal Information of the Employees </Link></button></li>
          <li><button className="add viewbutton"><Link to="/emergency_cont">View Emergency Contacts</Link></button></li>
          <li><button className="add viewbutton"><Link to="/dependant_info">View Dependant Info.</Link></button></li>
          <li><button className="add viewbutton"><Link to="/departmenthr">View Departments</Link></button></li>
          <li><button className="add viewbutton"><Link to="/job">View Job Titles</Link></button></li>
          <li><button className="add viewbutton"><Link to="/branch"> View Branches</Link></button></li>
          <li><button className="add viewbutton"><Link to="/leavebalancehr">View Leave Balances</Link></button></li>
          <li><button className="add viewbutton"><Link to="/paygrade">Edit Leave Allowances</Link></button></li>
          <li><button className="add viewbutton"><Link to="/add-custom-field">Add Custom Field</Link></button></li>
          <li><button className="add viewbutton"><Link to="/add-new-user">Create New User Account</Link></button></li>
          <li><button className="add viewbutton"><Link to="/request_leave">Request a Leave</Link></button></li>
          <li>
            <button className="add viewbutton">
              <Link to={`/personal-details/${employeeId}`}>View My Personal Information</Link>
            </button>
          </li>
        </ul>
      </aside>

      <main className="content">
        <header>
          <h1 className="company">Jupiter Apparels</h1>
          <h1>Welcome, HR Manager!</h1>
        </header>

        <div className="widget generate-reports">
            <h3><Link to="/report" className="generate-reports-link">Department Reports</Link></h3>
            <p>Generate Employee Reports by Department</p>
        </div>

        <div className="widget generate-reports">
            <h3><Link to="/report1" className="generate-reports-link">Leave Reports</Link></h3>
            <p>Generate Leave Reports by Department</p>
        </div>

        <div className="widget generate-reports">
            <h3><Link to="/report2" className="generate-reports-link">Paygrade Reports</Link></h3>
            <p>Generate Employee Reports by Paygrade</p>
        </div>

        <div className="widget generate-reports">
            <h3><Link to="/report3" className="generate-reports-link">Job Title Reports</Link></h3>
            <p>Generate Employee Reports by Job Title</p>
        </div>

        <div className="widget generate-reports">
            <h3><Link to="/report4" className="generate-reports-link">Custom Field Reports</Link></h3>
            <p>Generate Employee Reports for the Custom Field which have been added later</p>
        </div>

      </main>
      
    </div>
  );
}

export default AdminDashboard;
