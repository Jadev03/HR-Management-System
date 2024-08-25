import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styleAssets/EmergencyCont.css';
import { Link } from 'react-router-dom';

const EmergencyCont = () => {
  const [EmergencyConts, setEmergencyConts] = useState([]);

  useEffect(() => {
    const fetchAllEmergencyConts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/emergency_cont");
        setEmergencyConts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllEmergencyConts();
  }, []);

  return (
    <div>
      <h1 className='company'>Jupiter Apparels</h1>
      <h1>Emergency Contacts of the Employees</h1>
      <table className="Emergency_cont-table">
        <thead>
          <tr>
            <th>Emergency Contact ID</th>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Tel. No</th>
            <th>Relationship</th>
            <th>Address</th>
            <th>Email</th>
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          {EmergencyConts.map((Emergency_cont) => (
            <tr key={Emergency_cont.Emerg_Contact_ID}>
              <td>{Emergency_cont.Emerg_Contact_ID}</td>
              <td>{Emergency_cont.Employee_ID}</td>
              <td>{Emergency_cont.First_Name}</td>
              <td>{Emergency_cont.Last_Name}</td>
              <td>{Emergency_cont.Tel_No}</td>
              <td>{Emergency_cont.Relationship}</td>
              <td>{Emergency_cont.Address}</td>
              <td>{Emergency_cont.Email}</td>
                <button className="update"><Link to ={`/update_emergency_cont/${Emergency_cont.Emerg_Contact_ID}`}>Edit</Link></button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default EmergencyCont;

