import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_HOST_URL;

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // <-- New loading state

  useEffect(() => {
    axios.get(`${baseUrl}/api/jobs`)
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="spinner"></div>; // <-- Spinner shown while loading
  }

  return (
    <div className="container">
      <h1>Job Listings</h1>
      {jobs.map((job) => (
        <div className="card" key={job._id}>
          <h3>{job.title}</h3>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Type:</strong> {job.type}</p>
          <Link className="btn" to={`/job/${job._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
