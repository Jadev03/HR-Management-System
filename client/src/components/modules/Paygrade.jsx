import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styleAssets/Paygrade.css';
import { Link } from 'react-router-dom';

const Paygrade = () => {
  const [Paygrades, setPaygrades] = useState([]);

  useEffect(() => {
    const fetchAllPaygrades = async () => {
      try {
        const res = await axios.get("http://localhost:8800/paygrade");
        setPaygrades(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPaygrades();
  }, []);

  return (
    <div>
      <h1 className='company'>Jupiter Apparels</h1>
      <h1>Paygrades</h1>
      <table className="Paygrade-table">
        <thead>
          <tr>
            <th>Paygrade ID</th>
            <th>Paygrade Level</th>
            <th>Annual Leave Allowance</th>
            <th>Casual Leave Allowance</th>
            <th>Maternity Leave Allowance</th>
            <th>No-pay Leave Allowance</th>
            <th>Description</th>
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          {Paygrades.map((Paygrade) => (
            <tr key={Paygrade.Paygrade_ID}>
              <td>{Paygrade.Paygrade_ID}</td>
              <td>{Paygrade.Pay_Grade_Level}</td>
              <td>{Paygrade.Annual_Leave_Allowance}</td>
              <td>{Paygrade.Casual_Leave_Allowance}</td>
              <td>{Paygrade.Maternity_Leave_Allowance}</td>
              <td>{Paygrade.NO_Pay_Allowance}</td>
              <td>{Paygrade.Description}</td>
              <td>
                <button className="update"><Link to ={`/update_paygrade/${Paygrade.Paygrade_ID}`}>Edit</Link></button>
              </td>
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
    
  );
};

export default Paygrade;

