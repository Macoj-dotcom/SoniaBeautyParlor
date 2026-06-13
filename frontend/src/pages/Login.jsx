import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import api from "../api/axios";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = async(e) => {
        e.preventDefault();
        try {
            const { data } = await api.post("/auth/login", {email, password});
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/dashboard");

        } catch (error) {
            alert(error.response?.data?.message || "Loginfailed. Please try again.");
        }        
    };

    return (
        <div className="container">
            <form className="form" onSubmit={submit}>
                <h2>Login</h2>
               <input 
                   type="email"
                   placeholder="Email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required 
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
               <button type="submit">Login</button>
               <p>
                  No account? <Link to="/register">Register</Link>
                </p>       
            </form>
        </div>
    );
}

export default Login;