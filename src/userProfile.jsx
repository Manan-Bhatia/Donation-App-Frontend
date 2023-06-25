import React from "react";
import { useParams } from "react-router-dom";
import axios from "./api/axios";
const UserProfileURL = "/accounts/user/";



export default function UserProfile() {
    const { userID } = useParams();
    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Token ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    };

    setAuthToken(localStorage.getItem("token"));

    axios
        .get(UserProfileURL + userID)
        .then((res) => {
            console.log(res.data.user);
        })
        .catch((err) => console.log(err));

    return (
        <div>
            <h1>User Profile </h1>
        </div>
    );
}
