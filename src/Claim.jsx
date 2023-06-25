import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import axios from "./api/axios";
const CLAIM_URL = "/donations/claim/";
import { useParams } from "react-router-dom";

export default function App() {
    if (localStorage.getItem("token")) {
        axios.defaults.headers.common["Authorization"] = `Token ${localStorage.getItem("token")}`;
    }
    const { donationID } = useParams();

    const [formData, setFormData] = useState({
        heading: "",
        body: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(CLAIM_URL + donationID, formData)
            .then((res) => {
                console.log(res);
                alert("Claim request sent");
            })
            .catch((err) => console.log(err));
    console.log(formData);
    };

    return (
        <>
            <h1>Claim</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="heading"
                    placeholder="Heading"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="body"
                    placeholder="Body"
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}
