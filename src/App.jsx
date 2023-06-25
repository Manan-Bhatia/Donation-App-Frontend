import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import ChangePassword from "./resetPassword";
import axios from "./api/axios";

function App() {
    const navigate = useNavigate();
    // Set the token in the request header
    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Token ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    };

    setAuthToken(localStorage.getItem("token"));

    return (
        <>
            <nav className="flex justify-between px-5 py-5 items-center lg:px-20">
                <h1 className="font-bold font-poppins text-pink text-2xl lg:text-4xl">
                    Donation
                </h1>
                <ul className="flex gap-2 lg:gap-8">
                    <li className="font-semibold p-2 text-blue font-inter tetx-md lg:text-lg ">
                        <Link to="/">Home</Link>
                    </li>
                    {localStorage.getItem("token") ? (
                        <>
                            <li
                                className="bg-blue-600 px-5 py-2 text-blue font-inter font-semibold rounded-md text-md cursor-pointer lg:text-lg "
                                >

                                <Link to="/change-password">
                                    Reset Password
                                </Link>
                            </li>
                            <li
                                className="bg-blue-600 px-5 py-2 text-white bg-pink font-inter font-semibold rounded-md text-md cursor-pointer lg:text-lg "
                                onClick={() => {
                                    axios
                                        .post("accounts/logout")
                                        .then((res) => {
                                            console.log(res);
                                            setAuthToken(null);
                                            localStorage.removeItem("token");
                                            navigate("/login");
                                        })
                                        .catch((err) => console.log(err));
                                }}
                            >
                                Logout
                            </li>
                           
                        </>
                    ) : (
                        <li className="bg-blue-600 px-5 py-2 text-white bg-pink font-inter font-semibold rounded-md text-md lg:text-lg">
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                </ul>
            </nav>
            <main className="container mx-auto">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/change-password"
                        element={<ChangePassword />}
                    />
                </Routes>
            </main>
        </>
    );
}

export default App;
