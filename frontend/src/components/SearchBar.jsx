import React from "react";

const SearchBar = ({ handleSearchChange }) => {
  return (
    <form className="max-w-lg mx-auto flex items-center justify-center">
      <select
        className="border border-black rounded-l-lg py-2 px-4"
        style={{ width: "150px" }}
      >
        <option>All</option>

        <option value="regular restaurant">Regular</option>
        <option value="caffe">Cafe</option>
        <option value="dessert">Desert</option>
        <option value="food truck">Food Truck</option>
        <option>Resort</option>
      </select>
      <input
        type="text"
        className="border border-black rounded-r-lg py-2 px-4"
        style={{ width: "400px", height: "40px" }}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder=" Seach for restaurant"
      />
    </form>
  );
};

export default SearchBar;
