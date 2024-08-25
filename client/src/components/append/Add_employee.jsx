import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import '../styleAssets/Add_employee.css'

const Add_employee = () => {
  const [employee, setEmployee] = useState({
    Employee_ID: '',
    First_Name: '',
    Last_Name: '',
    NIC: '',
    Date_of_Birth: '',
    Gender: '',
    Tel_No: '',
    Email: '',
    Dept_ID: '',
    Maritial_Status: '',
    Title_ID: '',
    Paygrade: '',
    Status_ID: '',
    Supervisor_ID: '',
  });

  const [customFieldValue, setcustomFieldValue] = useState({});
  const [CustomFields, setCustomFields] = useState([]);

  useEffect(() => {
    const fetchAllCustomField = async () => {
      try {
        const res = await axios.get("http://localhost:8800/add-custom-field");
        setCustomFields(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCustomField();
  }, []);

  const handleChange = (e) => {
    setEmployee((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCustomChange = (e) => {
    setcustomFieldValue((prev) => ({ ...prev, [e.target.name]:e.target.value} ));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8800/employee', {employee, customFieldValue});
      console.log(customFieldValue);
      //navigate('/employee');
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="form-container">
      <h1 className='heading'>Add New Employee</h1>
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter employee ID"
          onChange={handleChange}
          name="Employee_ID"
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter first name"
          onChange={handleChange}
          name="First_Name"
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter last name"
          onChange={handleChange}
          name="Last_Name"
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter NIC No."
          onChange={handleChange}
          name="NIC"
        />
      </div>

      <div className="form-input">
        <input
          type="date"
          placeholder="Enter date of birth"
          onChange={handleChange}
          name="Date_of_Birth"
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          placeholder="Gender"
          onChange={handleChange}
          name="Gender"
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter Telephone No."
          onChange={handleChange}
          name="Tel_No"
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter email address"
          onChange={handleChange}
          name="Email"
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter Department ID"
          onChange={handleChange}
          name="Dept_ID"
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter maritial status"
          onChange={handleChange}
          name="Maritial_Status"
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter Title ID"
          onChange={handleChange}
          name="Title_ID"
        />
      </div>

      <div className="form-input">
        <input
          type="text"
          placeholder="Enter paygrade level"
          onChange={handleChange}
          name="Paygrade_ID"
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter status ID"
          onChange={handleChange}
          name="Status_ID"
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter Supervisor ID"
          onChange={handleChange}
          name="Supervisor_ID"
        />
      </div>

      {CustomFields.map((CustomField) => (
             <div className="form-input">
             <input
               type="text"
               placeholder={CustomField.Field_name}
               onChange={handleCustomChange}
               name={CustomField.Field_ID}
             />
           </div>
          ))}
      <button className="submit-button" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};

export default Add_employee;
