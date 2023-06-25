import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "./api/axios";
const REGISTER_URL = "accounts/register";

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
                alert("Signup Successful");
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
                <div className="flex flex-col items-center py-20 md:py-10">
                    <h1 className="text-3xl text-blue font-bold py-9 text-slate-500 font-poppins">
                        Signup Page
                    </h1>
                    <div className="w-80 flex flex-col gap-4">
                        <form
                            className="flex flex-col gap-5 font-inter "
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-col gap-2">
                                {/* <label htmlFor="username">Username</label> */}
                                <input
                                    className="w-full  py-1.5 border-b-2 focus:outline-none  text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    autoComplete="off"
                                    required
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Enter your username"
                                    value={data.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                {/* <label htmlFor="email">Email</label> */}
                                <input
                                    className="w-full  py-1.5 border-b-2 focus:outline-none  text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="Enter your Email"
                                    id="email"
                                    value={data.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                {/* <label htmlFor="password">Password</label> */}
                                <input
                                    className="w-full  py-1.5 border-b-2 focus:outline-none  text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    required
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter your Password"
                                    value={data.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="bg-sky-500 rounded-md py-2 text-sm py-1 text-white bg-blue w-full"
                                >
                                    Signup
                                </button>
                            </div>
                        </form>
                    </div>
                    <Link
                        className="mt-2 font-semibold leading-6 text-pink hover:text-indigo-500"
                        to="/login"
                    >
                        Already registered? Sign in
                    </Link>
                </div>
            </>
        );
    }
}
