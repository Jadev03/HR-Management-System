import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styleAssets/DependentInfo.css';

const DependantInfo = () => {
  const [dependantInfoData, setDependantInfoData] = useState([]); // Rename the state variable

  useEffect(() => {
    const fetchAllDependantInfo = async () => {
      try {
        const res = await axios.get("http://localhost:8800/dependant_info");
        setDependantInfoData(res.data); // Update the state variable here
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllDependantInfo();
  }, []);

  return (
    <div>
      <h1 className='company'>Jupiter Apparels</h1>
      <h1>Dependent Information of the Employees</h1>
        <button className="add">
            <Link to="/add_dependent">Add</Link>
        </button>
      <table className="DependantInfo-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Date of Birth</th>
            <th>Relationship</th>

          </tr>
        </thead>
        <tbody>
          {dependantInfoData.map((dependantInfo) => (
            <tr key={`${dependantInfo.Employee_ID}-${dependantInfo.Name}`}>
              <td>{dependantInfo.Name}</td>
              <td>{dependantInfo.Employee_ID}</td>
              <td>{dependantInfo.Date_of_birth}</td>
              <td>{dependantInfo.Relationship}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DependantInfo;
