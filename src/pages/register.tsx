import { useState } from "react";
import { Dots } from "react-activity";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!res.ok) {
                throw new Error("Registration failed");
            }

            navigate("/login");
        } catch (err) {
            alert("Login failed");
        } finally{
            setLoading(false)
        }
    };


    return (
        <div className="loginPage">
            <h1 className="title">AP Physics</h1>
            <div className="loginCard">
                <text style={{ color: 'black', fontSize: '30px', paddingTop: '6vh' }}>Register</text>
                <input className="loginField" placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="loginField" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="loginField" placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="submitButton" onClick={handleLogin}>{loading? <Dots/> : "Register"}</button>
                <text style={{ color: '#00000066', paddingBottom: '5vh' }}>Existing user? <Link to={'/login'}>Sign in</Link></text>

            </div>
        </div>
    );
};
export default Register;
