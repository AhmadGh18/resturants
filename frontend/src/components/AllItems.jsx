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

  const filterItemsByCategory = (category) => {
    setCategoryFilter(category);
    setSearchTerm("");
  };

  const filteredItemsByCategory = categoryFilter
    ? items.filter((el) => el.category === categoryFilter)
    : items;

  const filteredItemsByPrice = priceFilter
    ? items.filter((el) => {
        if (priceFilter === "1-5") {
          return el.price >= 1 && el.price <= 5;
        } else if (priceFilter === "5-10") {
          return el.price > 5 && el.price <= 10;
        } else {
          return el.price > 10;
        }
      })
    : filteredItemsByCategory;

  const filteredItemsByName = searchTerm
    ? items.filter((el) =>
        el.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredItemsByPrice;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCategoryFilter(null);
    setPriceFilter(null);
  };

  const handlePriceFilterChange = (priceRange) => {
    setPriceFilter(priceRange);
    setShowPriceFilter(false);
  };

  return (
    <>
      <UserNav />
      {/* <TopSlider /> */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",

          alignItems: "center",
        }}
      >
        <center>
          <input
            className="searchitem"
            type="text"
            style={{
              margin: "auto",
              border: "0px black solid",
              height: "40px",
              width: "400px",
            }}
            placeholder="   Search by item name,category"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </center>
        <select style={{ padding: "5px", margin: "5px" }}>
          <option className="">Price</option>
          <option className="">1-5$</option>
          <option className="">6-10</option>
          <option className="">10+</option>
        </select>
      </div>

      <div className="allItemshold">
        {filteredItemsByName.map((el) => (
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
