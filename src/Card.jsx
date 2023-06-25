import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "./api/axios";
const UserProfileURL = "/accounts/user/";

export default function Card({
    item_name,
    item_desc,
    item_picture,
    Location,
    createdby,
}) {
    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Token ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    };

    setAuthToken(localStorage.getItem("token"));

    const [createdbyUser, setcreatedbyUser] = useState("");

    axios
        .get(UserProfileURL + createdby)
        .then((res) => {
            setcreatedbyUser(res.data.user.username);
        })
        .catch((err) => console.log(err));

    return (
        <>
            <div className="w-72 p-3 shadow-2xl bg-white rounded-lg  lg:w- ">
                <a href="#">
                    <img
                        className="rounded-t-lg w-72"
                        src={`https://shareaid.pythonanywhere.com${item_picture}`}
                        alt=""
                    />
                </a>
                <div className="p-2">
                    <a href="#">
                        <h5 className="mb-2 font-poppins text-2xl font-bold tracking-tight text-blue">
                            {item_name}
                        </h5>
                    </a>
                    <p className="font-inter ">{item_desc}</p>
                    <p className="font-poppins font-medium ">By: <Link to={`/userProfile/${createdby}`}>
                            @{createdbyUser}
                        </Link></p>
                    <p className="text-xs font-light"> {Location}</p>
                </div>

                <div>
                        
                    
                    <button className=" w-24 py-2 text-white bg-pink font-inter font-md rounded-md lg:w-32">
                        Claim Now
                    </button>
                    
                </div>
            </div>
        </>
    );
}
