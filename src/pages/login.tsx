import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dots } from "react-activity";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setLoading(true)
            const res = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
            });

            if (!res.ok) {
                throw new Error("Login failed");
            }

            const data = await res.json();
            localStorage.setItem('access_token', data.access_token
            );
            navigate("/");
        } catch (err) {
            alert("Login failed");
        } finally {
            setLoading(false)
        }
    };


    return (
        <div className="loginPage">
            <h1 className="title">AP Physics</h1>
            <div className="loginCard">
                <span style={{color: 'black', fontSize: '30px', paddingTop: '6vh'}}>Login</span>
                <input className="loginField" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="loginField" placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="submitButton" onClick={handleLogin}>{loading? <Dots/> : "Login"}</button>
                <span style={{color:'#00000066', paddingBottom:'5vh'}}>New user? <Link to={'/register'}>Sign up</Link></span>

            </div>
        </div>
    );
};
export default Login;
