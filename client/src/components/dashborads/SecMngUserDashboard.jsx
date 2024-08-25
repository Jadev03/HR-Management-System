import React from 'react';
import '../styleAssets/AdminDashboard.css'; 
import { Link } from 'react-router-dom';

const SecMngDashboard = () => {
  const  employeeId  =  sessionStorage.getItem('user');
  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Second Management User Dashboard</h2>
        <ul>
          <li><button className="add viewbutton"><Link to="/employee">Employees</Link></button></li>
          <li><button className="add viewbutton"><Link to="/request_leave">Request a Leave</Link></button></li>
          <li><button className="add viewbutton"><Link to="/emergency_cont">Emergency Contacts</Link></button></li>
          <li><button className="add viewbutton"><Link to="/dependant_info">Dependant Info.</Link></button></li>
          <li><button className="add viewbutton"><Link to="/departmenthr">Departments</Link></button></li>
          <li><button className="add viewbutton"><Link to="/job">Job Titles</Link></button></li>
          <li><button className="add viewbutton"><Link to="/branch">Branches</Link></button></li>
          <li><button className="add viewbutton"><Link to="/leave_bal">Leave Balances</Link></button></li>
          <li><button className="add viewbutton"><Link to="/leave_request">Leave Requests</Link></button></li>
          <li><button className="add viewbutton"><Link to="/paygrade">Paygrades</Link></button></li>
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
          <h1>Welcome! Senond Management User!</h1>
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

export default SecMngDashboard;
