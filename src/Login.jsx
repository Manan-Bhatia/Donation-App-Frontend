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
                <div className="flex flex-col items-center py-20 md:py-10">
                <h1 className="text-3xl text-blue font-bold py-9 text-slate-500 font-poppins" >Login</h1>
                <div className="w-80 flex flex-col gap-4">
                
                <form  className="flex flex-col gap-5 font-inter "onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        {/* <label className="text-lg font-sm leading-6" htmlFor="username">Username</label> */}
                        <input
                            className="w-full  py-1.5 border-b-2 focus:outline-none  text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            required
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your user Name"
                            value={data.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        {/* <label className="text-lg font-sm leading-6" htmlFor="password">Password</label> */}
                        <input
                            className="w-full  py-1.5 border-b-2  text-blue focus:outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"                            required
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Login
                    </button>
                    </div>
                </form>
                <Link className=" font-semibold leading-6 text-pink hover:text-indigo-500" to="/signup">New User? Signup</Link>
                </div>
                </div>
            </>

        );
    }
}
