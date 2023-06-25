import React from "react";
import { useEffect } from "react";
import axios from "./api/axios";
import data from "./dummydata";
import Card from "./Card";
import {Link} from "react-router-dom";

export default function Home() {
    if (localStorage.getItem("token")) {
        axios.defaults.headers.common[
            "Authorization"
        ] = `Token ${localStorage.getItem("token")}`;
    }

    const [visibleCards, setVisibleCards] = React.useState(4);

    const handleSeeMoreClick = () => {
        setVisibleCards(prevVisibleCards => prevVisibleCards + 4);
    };

    // let data = []
    // useEffect(() => {
    //     axios
    //         .get("/donations")
    //         .then((res) => {
    //             data = res.data;
    //         })
    //         .catch((err) => console.log(err));
    // }, []);

    return (
        <div className="container flex flex-col items-center">
            <h1>Share Aid</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                quidem at vel sequi, blanditiis assumenda maxime hic doloremque,
                cum tempore eius ea distinctio dignissimos reiciendis, a ipsam
                fugit ut praesentium.
            </p>
            <button className="bg-sky-500 rounded-md px-4 py-1 text-sm text-white">
                <Link to ="/signup">Sign Up Now</Link>
            </button>

            <div className="card-grid">
                {data.slice(0, visibleCards).map((item) => (
                    <Card key={item.id} {...item} />
                ))}
            </div>
            {visibleCards < data.length && (
                <button
                    className="bg-sky-500 rounded-md px-4 py-1 text-sm text-white mb-4"
                    onClick={handleSeeMoreClick}
                >
                    See More
                </button>
            )}
        </div>
    );
}
