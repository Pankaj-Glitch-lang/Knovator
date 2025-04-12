import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const baseUrl = import.meta.env.VITE_HOST_URL;

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        axios.get(`${baseUrl}/api/jobs/${id}`).then(res => setJob(res.data));
    }, [id]);

    if (!job) return <div className="container">Loading...</div>;

    return (
        <div className="container">
            <div className="navbar">
                <h2>Job Details</h2>
            </div>
            <div className="job-details">
                <h1>{job.title}</h1>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Type:</strong> {job.type}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Description:</strong></p>
                <p>{job.description}</p>
                <p><em>Posted on: {new Date(job.createdAt).toLocaleDateString()}</em></p>
            </div>
        </div>
    );
};

export default JobDetails;
