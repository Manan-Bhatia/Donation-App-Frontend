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

    const [createdbyUser, setcreatedbyUser] = useState("")

    axios.get(UserProfileURL + createdby)
    .then(res => {
        setcreatedbyUser(res.data.user.username)
    })
    .catch(err => console.log(err))


    return (
        <div className="card">
            <img
                src={`https://shareaid.pythonanywhere.com${item_picture}`}
                alt={item_name}
                className="card-image"
            />
            <div className="card-stats">
                <span className="text-lg font-semibold">{item_name}</span>
                <p className="text-xs font-light">{item_desc}</p>
                <span className="text-xs font-light">Location</span>
                <p className="text-xs font-light"> {Location}</p>
                {<Link to ={`/userProfile/${createdby}`}>{createdbyUser}</Link>}
            </div>
        </div>
    );
}
