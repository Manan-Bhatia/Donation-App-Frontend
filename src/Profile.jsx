import React from "react";
import axios from "./api/axios";
import { useState, useEffect} from "react";
const ProfileURL = "/accounts/profile";
const UserDontaionsURL = "/donations/userdonations/";
import Card from "./Card";

export default function Profile({}) {
    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Token ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    };

    setAuthToken(localStorage.getItem("token"));

    const [userData, setUserData] = useState({});


    axios
        .get(ProfileURL)
        .then((res) => {
            console.log(res)
            // setUserData({...res.data});
        })
        .catch((err) => console.log(err));

    console.log(userData)

    const [visibleCards, setVisibleCards] = useState(4);

    const handleSeeMoreClick = () => {
        setVisibleCards((prevVisibleCards) => prevVisibleCards + 4);
    };

    const userID = userData.id; 
    const [userDonationItems, setUserDonationItems] = useState([]);
    axios
        .get(UserDontaionsURL + userID)
        .then((res) =>{
            console.log(res.data)
            setUserDonationItems(res.data)
        })
        .catch((err) => console.log(err));

    return (
        <div>
            <h1>My Profile </h1>
            {userData.user_detail.profile_picture == null ? (
                <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt="Avatar"
                />
            ) : (
                <img src={userData.user_detail.profile_picture} alt="Avatar" />
            )}
            <h2>Rating: {userData.user_detail.rating}</h2>
            <h2>Username: {userData.user_detail.bio}</h2>
            <h2>Bio: {userData.bio}</h2>
            <h2>Email: {userData.email}</h2>

            <h1>My Items</h1>

            <div
                id="name"
                className="p-2 flex flex-wrap gap-5 justify-center lg:px-8"
            >
                {userDonationItems.slice(0, visibleCards).map((item) => (
                    <Card key={item.d_id} {...item} showingOnProfile={true} myProfile={true} />
                ))}
                {visibleCards < userDonationItems.length && (
                    <button
                        className="bg-blue-600 px-5 py-2 text-white bg-blue font-inter font-semibold rounded-md text-md cursor-pointer lg:text-lg "
                        onClick={handleSeeMoreClick}
                    >
                        See More
                    </button>
                )}
            </div>
        </div>
    );
}
