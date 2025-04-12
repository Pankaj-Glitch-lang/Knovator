import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseUrl=import.meta.env.VITE_HOST_URL;
const AddJob = () => {
    const [form, setForm] = useState({
        title: "",
        company: "",
        type: "Full-time",
        location: "",
        description: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${baseUrl}/api/jobs`, form);
        navigate("/");
    };

    return (
        <div className="container">
            <div className="navbar">
                <h2>Post a Job</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Job Title</label>
                    <input name="title" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Company Name</label>
                    <input name="company" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Job Type</label>
                    <select name="type" onChange={handleChange}>
                        <option>Full-time</option>
                        <option>Part-time</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input name="location" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" rows="4" onChange={handleChange} required></textarea>
                </div>
                <button className="btn" type="submit">Submit Job</button>
            </form>
        </div>
    );
};

export default AddJob;
