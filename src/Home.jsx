import React from "react";
import { useEffect, useState} from "react";
import axios from "./api/axios";
// import data from "./dummydata";
import Card from "./Card";


export default function Home() {
    if (localStorage.getItem("token")) {
        axios.defaults.headers.common[
            "Authorization"
        ] = `Token ${localStorage.getItem("token")}`;
    }

    const [visibleCards, setVisibleCards] = useState(4);

    const handleSeeMoreClick = () => {
        setVisibleCards((prevVisibleCards) => prevVisibleCards + 4);
    };

    let [data,setData] = useState([]);
    useEffect(() => {
        axios
            .get("/donations/")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <>
            <div className="px-5 py-32 lg:px-8 lg:py-32 h-auto relative">
                <h1 className="text-5xl text-blue leading-[3.5rem] font-poppins font-medium lg:text-7xl lg:leading-[6rem]">
                    Uniting for{" "}
                    <span className="text-pink font-bold">Sustainability</span>,
                    <br></br>One{" "}
                    <span className="text-pink font-bold">Donation</span> at a
                    Time !
                </h1>
                <div className="flex gap-3 j">
                    <button className="mt-10 w-full py-2 text-white bg-pink font-inter font-semibold rounded-md lg:w-48">
                        Donate NOW!
                    </button>
                    <button className="mt-10 w-full py-2 text-blue font-inter font-semibold rounded-md lg:w-48">
                        View availble Items
                    </button>
                </div>
                <div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                </div>
            </div>
            <div className="card-grid">
                {data.slice(0,visibleCards).map((item) => {
                    return <Card key={item.d_id} {...item} />;
                })}
            </div>
            {visibleCards < data.length && (
                <button
                    className="bg-sky-500 rounded-md px-4 py-1 text-sm text-white mb-4"
                    onClick={handleSeeMoreClick}
                >
                    See More
                </button>
            )}
        </>
    );
}
