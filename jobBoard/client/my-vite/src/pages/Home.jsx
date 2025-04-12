import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const baseUrl = import.meta.env.VITE_HOST_URL;

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    axios.get(`${baseUrl}/api/jobs`)
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="navbar">
        <h2>Mini Job Board</h2>
        <Link to="/add-job">Post a Job</Link>
      </div>
      <h1>Available Jobs</h1>
      {jobs.map((job) => (
        <div className="card" key={job._id}>
          <h3>{job.title}</h3>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Type:</strong> {job.type}</p>
          <Link to={`/job/${job._id}`} className="btn">View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
