import React from 'react';
import '../styleAssets/AdminDashboard.css'; 
import { Link } from 'react-router-dom';

const SupervisorDashboard = () => {
  const  employeeId  =  sessionStorage.getItem('user');
  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Supervisor Dashboard</h2>
        <ul>
          <li><button className="add viewbutton"><Link to="/subordinate">View Subordinate Info.</Link></button></li>
          <li>
            <button className="add viewbutton">
              <Link to={`/request-leave/${employeeId}`}>Accept/ Reject Leaves</Link>
            </button>
          </li>
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
          <h1>Welcome, Supervisor!</h1>
        </header>

      </main>
      
    </div>
  );
}

export default SupervisorDashboard;
