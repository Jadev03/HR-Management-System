import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styleAssets/Report.css';

const CustomField = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [fields, setFields] = useState([]);

  const fetchCustomFields = async () => {
    try {
      const res = await axios.get("http://localhost:8800/custom_report/"+employeeId);
      setFields(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCustomFields();
  }, [employeeId]);

  return (
    <div>
      <h2>Information on Custom Fields</h2>
      <label>Employee ID: </label>
      <input
        type="text"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      />

      <table className='Employee-table'>
        <thead>
          <tr>
            <th>Field Name</th>
            <th>Field Value</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={index}>
              <td>{field.field_name}</td>
              <td>{field.field_val}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomField;
