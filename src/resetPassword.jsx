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
                 <div className="flex flex-col items-center py-20 md:py-10">
                <h1 className="text-3xl text-blue font-bold py-9 text-slate-500 font-poppins" >Reset Password</h1>
                <div className="w-80 flex flex-col gap-4">
                <form  className="flex flex-col gap-5 font-inter " onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2" >
                        <label htmlFor="old_password"></label>
                        <input
                            className="w-full  py-1.5 border-b-2 focus:outline-none  text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            autoComplete="off"
                            required
                            type="password"
                            name="old_password"
                            id="old_password"
                            placeholder="Old Password"
                            value={data.old_password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="new_password"></label>
                        <input
                            className="w-full  py-1.5 border-b-2 focus:outline-none  text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            required
                            type="password"
                            name="new_password"
                            id="new_password"
                            placeholder="New Password"
                            value={data.new_password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Submit
                    </button>
                    </div>
                </form>
                </div>
                </div>
            </>
        );
    }
}
