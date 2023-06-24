import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
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
            <nav className="flex justify-between px-10 py-3">
                <h1>Donation</h1>
                <ul className="flex gap-3">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {localStorage.getItem("token") ? (
                        <li
                            className="cursor-pointer"
                            onClick={() => {
                                axios
                                    .post("/logout")
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
                    ) : (
                        <li>
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
                </Routes>
            </main>
        </>
    );
}

export default App;
