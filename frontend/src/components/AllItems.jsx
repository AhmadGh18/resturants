import React, { useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import TopSlider from "./TopSlider";
import UserNav from "./UserNav";
import SingleItemCard from "./SingleItemCard";

const AllItems = () => {
  const [items, setItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState(null);
  const [showPriceFilter, setShowPriceFilter] = useState(false);

  useEffect(() => {
    axiosClient.get("/items/getAll").then((response) => {
      setItems(response.data);
    });
  }, []);

  // Filtered items by name
  const filteredItemsByName = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter items by price
  const filteredItemsByPrice = priceFilter
    ? filteredItemsByName.filter((item) => {
        switch (priceFilter) {
          case "1-5":
            return item.price >= 1 && item.price <= 5;
          case "5-10":
            return item.price > 5 && item.price <= 10;
          case "10":
            return item.price > 10;
          default:
            return true;
        }
      })
    : filteredItemsByName;

  return (
    <>
      <UserNav />
      {/* <TopSlider /> */}

      <form className="max-w-lg mx-auto flex items-center justify-center allsearc mt-10 mb-9">
        <select
          className="border border-black rounded-l-lg py-2 px-4"
          style={{ width: "150px" }}
          onChange={(e) => setPriceFilter(e.target.value)}
          value={priceFilter || "All"}
        >
          <option value="All">All</option>
          <option value="1-5">$1-$5</option>
          <option value="5-10">$5-$10</option>
          <option value="10">$10+</option>
        </select>

        <input
          type="text"
          className="border border-black rounded-r-lg py-2 px-4"
          style={{ width: "400px", height: "40px" }}
          placeholder="Search for restaurant"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <div className="allItemshold">
        {filteredItemsByPrice.map((el) => (
          <SingleItemCard
            restaurant_name={el.restaurant_name}
            key={el.id}
            thumbnail={el.thumbnail}
            profile_picture={el.profile_picture}
            title={el.title}
            description={el.description}
            price={el.price}
            restaurant_id={el.restaurant_id}
            id={el.id}
          />
        ))}
      </div>
    </>
  );
};

export default AllItems;
