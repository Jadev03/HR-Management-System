import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styleAssets/Branch.css';

const Branch = () => {
  const [branch, setBranch] = useState([]);

  useEffect(() => {
    const fetchAllBranch = async () => {
      try {
        const res = await axios.get("http://localhost:8800/branch");
        setBranch(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBranch();
  }, []);

  return (
    <div>
      <h1 className='company'>Jupiter Apparels</h1>
      <h1>Branches</h1>
      <table className="branch-table">
        <thead>
          <tr>
            <th>Branch ID</th>
            <th>Branch Name</th>
            <th>Address</th>
            <th>Country</th> 
          </tr>
        </thead>
        <tbody>
          {branch.map((branch) => (
            <tr key={branch.Branch_ID}>
              <td>{branch.Branch_ID}</td>
              <td>{branch.Name}</td>
              <td>{branch.Address}</td>
              <td>{branch.Country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default Branch;

