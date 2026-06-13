import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = 
    useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/auth/register", formData);
            alert("Registration successful!");
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed.");
        }
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input 
                 type="text"
                 name="name"
                 placeholder="Full Name"
                 value={formData.name}
                 onChange={handleChange}
                 required
                />
                <input 
                 type="email"
                 name="email"
                 placeholder="Email"
                 value={formData.email}
                 onChange={handleChange} 
                 required
                />
                <input 
                 type="tel"
                 name="phone"
                 placeholder="Phone Number"
                 value={formData.phone}
                 onChange={handleChange}
                 required
                />
                <input 
                 type="password"
                 name="password"
                 placeholder="Password"
                 value={formData.password}
                 onChange={handleChange}
                 required

                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
export default Register;