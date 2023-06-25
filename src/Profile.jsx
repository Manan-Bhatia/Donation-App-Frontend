import React from "react";
import axios from "./api/axios";
import { useState, useEffect} from "react";
import data from "./dummydata.json";
const ProfileURL = "/api/accounts/profile";
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
    // axios
    //     .get(ProfileURL)
    //     .then((res) => {
    //         // setUserData(res.data.user);
    //         setUserData(data[1].user);
    //     })
    //     .catch((err) => console.log(err));

    useEffect(() => {
        setUserData(data[1].user);
    }, []);
    const [visibleCards, setVisibleCards] = useState(4);

    const handleSeeMoreClick = () => {
        setVisibleCards((prevVisibleCards) => prevVisibleCards + 4);
    };

    const [userDonationItems, setUserDonationItems] = useState([]);
    useEffect(() => {
        setUserDonationItems(data[0]);
    }, []);
    // axios
    //     .get(UserDontaionsURL + userID)
    //     .then((res) =>{
    //         // access the data from the response
    //         console.log(res)
    //     })
    //     .catch((err) => console.log(err));

    console.log(userDonationItems);

    return (
        <div>
            <h1>My Profile </h1>
            {userData.profile_picture == null ? (
                <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt="Avatar"
                />
            ) : (
                <img src={userData.profile_picture} alt="Avatar" />
            )}
            <h2>Rating: {userData.rating}</h2>
            <h2>Username: {userData.username}</h2>
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
