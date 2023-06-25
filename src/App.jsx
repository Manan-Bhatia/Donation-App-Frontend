import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import ChangePassword from "./resetPassword";
import Profile from "./Profile";
import axios from "./api/axios";
import UserProfile from "./userProfile";

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
                    <Link to="/">ShareAid</Link>
                </h1>
                <ul id="mob" className=" relative lg:hidden">
                    <button
                        id="dropdownInformationButton"
                        data-dropdown-toggle="dropdownInformation"
                        class="text-white bg-pink 300 font-medium rounded-lg text-sm px-4 py-2.5 text-center flex items-center"
                        type="button"
                    >
                        Menu
                        <svg
                            class="w-4 h-4 ml-2"
                            aria-hidden="true"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                            ></path>
                        </svg>
                    </button>
                    <div
                        id="dropdownInformation"
                        class=" absolute hidden z-10  bg-white divide-y divide-gray-100 rounded-lg shadow-md w-24"
                    >
                        <ul
                            class="py-2 text-sm  dark:text-gray-200"
                            aria-labelledby="dropdownInformationButton"
                        >
                            <li className="bg-blue-600 px-5 py-2 text-blue font-inter font-semibold rounded-md text-sm cursor-pointer lg:block lg:text-lg ">
                                <Link to="/">Home</Link>
                            </li>
                            {localStorage.getItem("token") ? (
                                <>
                                    <li className="bg-blue-600 px-5 py-2 text-blue font-inter font-semibold rounded-md text-sm cursor-pointer lg:block lg:text-lg ">
                                        <Link to="/profile">Profile</Link>
                                    </li>
                                    <li className="bg-blue-600 px-5 py-2 text-blue font-inter font-semibold rounded-md text-sm cursor-pointer lg:block lg:text-lg  ">
                                        <Link to="/change-password">
                                            Reset Password
                                        </Link>
                                    </li>
                                    <li
                                        className="bg-blue-600 px-5 py-2 text-pink font-inter font-semibold rounded-md text-md cursor-pointer lg:text-lg "
                                        onClick={() => {
                                            axios
                                                .post("accounts/logout")
                                                .then((res) => {
                                                    console.log(res);
                                                    setAuthToken(null);
                                                    localStorage.removeItem(
                                                        "token"
                                                    );
                                                    navigate("/login");
                                                })
                                                .catch((err) =>
                                                    console.log(err)
                                                );
                                        }}
                                    >
                                        Logout
                                    </li>
                                </>
                            ) : (
                                <li className="font-semibold p-2 pl-5 text-blue font-inter tetx-md lg:text-lg ">
                                    <Link to="/login">Login</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </ul>
                <ul className="hidden lg:flex gap-8">
                    <li className="font-semibold p-2 text-blue font-inter tetx-md lg:text-lg ">
                        <Link to="/">Home</Link>
                    </li>
                    {localStorage.getItem("token") ? (
                        <>
                            <li className="bg-blue-600 px-5 py-2 text-blue font-inter font-semibold rounded-md text-sm cursor-pointer lg:block lg:text-lg  ">
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
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                        </>
                    ) : (
                        <li className="bg-blue-600 text-white px-5 py-2 bg-pink font-inter font-semibold rounded-md text-md lg:text-lg  ">
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
                    <Route path="/profile" element={<Profile />} />
                    <Route
                        path="/userProfile/:userID"
                        element={<UserProfile />}
                    />
                </Routes>
            </main>
        </>
    );
}

export default App;
