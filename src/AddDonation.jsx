import React from "react";
import { useState } from "react";
import axios from "./api/axios";
const AddDonationURL = "/donations/create/";

export default function AddDonation() {
    const [donationData, setDonationData] = useState({
        item_name: "",
        item_desc: "",
        Location: "",
        item_picture: "",
    });

    const handleChange = (e) => {
        setDonationData({ ...donationData, [e.target.name]: e.target.value });
    };

    const onFileUpload = (e) => {
        setDonationData({ ...donationData, item_picture: e.target.files[0] });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(AddDonationURL, donationData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => {
                console.log(res);
                alert("Donation added");
            })
            .catch((err) => console.log(err));
    };
    console.log(donationData);


    return (
        <>
            <h1>Add Donation</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="item_name"
                    placeholder="Item Name"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="item_desc"
                    placeholder="Item Description"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="Location"
                    placeholder="Location"
                    onChange={handleChange}
                />
                <input
                    type="file"
                    name="item_picture"
                    placeholder="Item Picture"
                    onChange={onFileUpload}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}
