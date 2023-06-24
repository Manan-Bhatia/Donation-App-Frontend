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
                <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold py-9 text-slate-500 font-poppins" >Login</h1>
                <div className="w-80 flex flex-col gap-4">
                
                <form  className="flex flex-col gap-5"onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label className="text-lg font-sm leading-6" htmlFor="username">Username</label>
                        <input
                            className="w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6"
                            required
                            type="text"
                            id="username"
                            name="username"
                            value={data.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-sm leading-6" htmlFor="password">Password</label>
                        <input
                            className="w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6"
                            required
                            type="password"
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Login
                    </button>
                    </div>
                </form>
                <h2 className="font-semibold leading-6 text-blue-400 hover:text-indigo-500">New User?</h2>
                <Link className=" font-semibold leading-6 text-blue-400 hover:text-indigo-500" to="/signup">Signup</Link>
                </div>
                </div>
            </>

        );
    }
}
