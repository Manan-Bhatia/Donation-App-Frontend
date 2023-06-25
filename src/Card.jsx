import React from "react";

export default function Card({ item_name, item_desc, item_picture, Location }) {
    return (
        <div className="card">
            <img src={item_picture} alt={item_name} className="card-image" />
            <div className="card-stats">
                <span className="text-lg font-semibold">{item_name}</span>
                <p className="text-xs font-light">{item_desc}</p>
                <span className="text-xs font-light">Location</span>
                <p className="text-xs font-light"> {Location}</p>
            </div>
        </div>
    );
}
