import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./api/axios";
const RESET_PASSWORD_URL = "accounts/change-password";

export default function resetPassword() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        old_password: "",
        new_password: "",
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
            .put(RESET_PASSWORD_URL, data)
            .then(() => {
                alert("Password Changed Successfully");
                navigate("/");
            })
            .catch((err) => console.log(err));
    };

    if (!localStorage.getItem("token")) {
        useEffect(() => {
            navigate("/");
        }, []);
    } else {
        axios.defaults.headers.common[
            "Authorization"
        ] = `Token ${localStorage.getItem("token")}`;
        return (
            <>
                <h1>Password Reset</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="old_password">Old Password</label>
                        <input
                            className="border-2"
                            autoComplete="off"
                            required
                            type="password"
                            name="old_password"
                            id="old_password"
                            value={data.old_password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="new_password">New Password</label>
                        <input
                            className="border-2"
                            required
                            type="password"
                            name="new_password"
                            id="new_password"
                            value={data.new_password}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-sky-500 rounded-md px-5 text-sm py-1 text-white"
                    >
                        Submit
                    </button>
                </form>
            </>
        );
    }
}
