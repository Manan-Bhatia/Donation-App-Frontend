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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(AddDonationURL, donationData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
      <h1 className="py-10 px-10 font-poppins font-semibold text-3xl text-pink">
        Add New Donation
      </h1>
      <div className="px-8 w-100 flex flex-col gap-4">
        <form
          className="flex flex-col gap-5 font-inter "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <input
              className=" py-1.5  w-64 border-b-2  focus:outline-none  text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
              type="text"
              name="item_name"
              placeholder="Item Name"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <input
              className="w-50%  py-1.5 border-b-2 focus:outline-none  text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
              type="text"
              name="item_desc"
              placeholder="Item Description"
              onChange={handleChange}
            />
          </div>
          <input
            className=" py-1.5  w-64 border-b-2  focus:outline-none  text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
            type="text"
            name="Location"
            placeholder="Location"
            onChange={handleChange}
          />
          <label class="block mb-2 text-sm font-medium text-blue">
            Upload file
          </label>
          <input
            class="block w-60  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
            type="file"
            name="item_picture"
            placeholder="Item Picture"
            onChange={onFileUpload}
          />
          <button
            type="submit"
            className="flex w-56 justify-center rounded-md bg-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
