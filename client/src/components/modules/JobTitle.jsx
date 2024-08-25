import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styleAssets/JobTitle.css';
import { Link } from 'react-router-dom';

const JobTitle = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8800/job");
        setJobs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllJobs();
  }, []);

  return (
    <div>
      <h1 className='company'>Jupiter Apparels</h1>
      <h1>Job Titles</h1>
      <table className="branch-table">
        <thead>
          <tr>
            <th>Job Title ID</th>
            <th>Job Title</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.Title_ID}>
              <td>{job.Title_ID}</td>
              <td>{job.Title}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button><Link to="/append">Add New Job Title</Link></button>
    </div>
  );
};

export default JobTitle;
