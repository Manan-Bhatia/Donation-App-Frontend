import React, { useEffect, useState } from "react";
import axios from "./api/axios";

export default function Noti() {
    if(localStorage.getItem("token")){
        axios.defaults.headers.common["Authorization"]=`Token ${localStorage.getItem("token")}`
        }
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    let url = `https://shareaid.pythonanywhere.com/notifications`


    axios.get(url)
    .then(res=>{
        console.log(res)
    }).catch(error=>{
        console.log(error)
    })
    
    // Clean up the socket connection
  });

  return (
    <>
      <div className="px-8 py-10 flex flex-col gap-4">
        <h2 className="text-pink font-poppins text-4xl">Your Notifications</h2>
        <div className="bg-white p-5 text-inter rounded-md shadow-xl">
          <h3 className="font-poppins text-2xl text-bold font-blue">
            This is the heading
          </h3>
          <p className="text-md text-blue font-inter pt-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
            eos, dicta unde provident hic sed ipsa accusamus, consectetur fugiat
            nulla nobis quam veniam quibusdam exercitationem aliquam odio?
            Placeat, aperiam ab?
          </p>
          <div>
            <button className="bg-pink font-inter p-2 text-md rounded-md text-white mt-3">
              Accept
            </button>
          </div>
        </div>
        <div className="bg-white p-5 text-inter rounded-md shadow-xl">
          <h3 className="font-poppins text-2xl text-bold font-blue">
            This is the heading
          </h3>
          <div>
            <button className="bg-pink font-inter p-2 text-md rounded-md text-white mt-3">
              Accept
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
