import React from "react";

export default function Card({ item_name, item_desc, item_picture, Location }) {
    return (
        <>
  <div class="w-72 p-3 shadow-2xl bg-white rounded-lg  lg:w- ">
    <a href="#">
        <img class="rounded-t-lg w-72  " src={item_picture} alt="" />
    </a>
    <div class="p-2">
        <a href="#">
            <h5 class="mb-2 font-poppins text-2xl font-bold tracking-tight text-blue">Noteworthy technology acquisitions 2021</h5>
        </a>
        <p class="font-inter ">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </div>
    
        <div>
        <button className=" w-24 py-2 text-white bg-pink font-inter font-md rounded-md lg:w-32">
                        Claim Now
                    </button>
        </div>
        
    </div>
        </>);
        
    
}



