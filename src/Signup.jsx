import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "./api/axios";
const REGISTER_URL = "/register";

export default function Signup() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        username: "",
        email: "",
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
            .post(REGISTER_URL, data)
            .then(() => {
                navigate("/login");
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
                <h1>Signup Page</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            className="border-2"
                            autoComplete="off"
                            required
                            type="text"
                            name="username"
                            id="username"
                            value={data.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            className="border-2"
                            required
                            type="email"
                            name="email"
                            id="email"
                            value={data.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            className="border-2"
                            required
                            type="password"
                            name="password"
                            id="password"
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-sky-500 rounded-md px-5 text-sm py-1 text-white"
                    >
                        Signup
                    </button>
                </form>
                <p>
                    Already registered?
                    <br />
                    <Link to="/login">Sign in</Link>
                </p>
            </>
        );
    }
}
