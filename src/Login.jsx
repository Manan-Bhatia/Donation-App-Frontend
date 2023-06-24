import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "./api/axios";
const LOGIN_URL = "/login";

export default function Login() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(LOGIN_URL, data)
            .then((res) => {
                console.log(res);
                localStorage.setItem("token", res.data.token);
                navigate("/");
            })
            .catch((err) => console.log(err));
    };
    if (localStorage.getItem("token")) {
        useEffect(() => {
            navigate("/");
        }, []);
    } else {
        return (
            <>
                <h1>Login Page</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            className="border-2"
                            required
                            type="text"
                            id="username"
                            name="username"
                            value={data.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            className="border-2"
                            required
                            type="password"
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-sky-500 rounded-md px-5 text-sm py-1 text-white"
                    >
                        Login
                    </button>
                </form>
                <h2>New User?</h2>
                <Link to="/signup">Signup</Link>
            </>
        );
    }
}
