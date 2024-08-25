import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styleAssets/PersonalDetails.css';


const PersonalDetails = () => {
    
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                console.log('aa'+sessionStorage.getItem('user'));
                // Replace the URL with the correct endpoint for fetching employee personal details
                const res = await axios.get("http://localhost:8800/personal-details/"+sessionStorage.getItem('user'));
                console.log(res.data);
                setEmployee(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchEmployeeDetails();
    }, []);

    return (
        <div>
            <h1 className='company'>Jupiter Apparels</h1>
            <h1>Personal Details</h1>
            <ul className="personal-details-list">
                <li><strong>Employee ID</strong> {employee.Employee_ID}</li>
                <li><strong>First Name</strong> {employee.First_Name}</li>
                <li><strong>Last Name</strong> {employee.Last_Name}</li>
                <li><strong>NIC:</strong> {employee.NIC}</li>
                <li><strong>Date Of Birth</strong> {employee.Date_Of_Birth}</li>
                <li><strong>Telephone No</strong> {employee.Tel_No}</li>
                <li><strong>Email:</strong> {employee.Email}</li>
                <li><strong>Department</strong> {employee.Department}</li>
                <li><strong>Maritial Status</strong> {employee.Maritial_Status}</li>
                <li><strong>Job Title</strong> {employee.Title}</li>
                <li><strong>Supervisor ID</strong> {employee.Supervisor_ID}</li>

            </ul>
        </div>
    );
};

export default PersonalDetails;