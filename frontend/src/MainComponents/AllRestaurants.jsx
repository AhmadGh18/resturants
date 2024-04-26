// import React, { useEffect, useState } from "react";
// import axiosClient from "../axiosClient";
// import { FaStar } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import ReactPaginate from "react-paginate";
// import SearchBar from "../components/SearchBar";

// const AllRestaurants = () => {
//   const [allRestaurants, setAllRestaurants] = useState([]);
//   const [pageNumber, setPageNumber] = useState(0); // Current page number
//   const [sortBy, setSortBy] = useState("rating"); // Default sort by rating
//   const restaurantsPerPage = 12; // Number of restaurants per page

//   useEffect(() => {
//     axiosClient.get("/restaurant/getAll").then((response) => {
//       setAllRestaurants(response.data.restaurants);
//     });
//   }, []);

//   // Function to handle page change
//   const handlePageChange = ({ selected }) => {
//     setPageNumber(selected);
//   };

//   // Function to handle sorting change
//   const handleSortChange = (e) => {
//     setSortBy(e.target.value);
//   };

//   // Function to sort restaurants based on selected option
//   const sortedRestaurants = () => {
//     if (sortBy === "rating") {
//       return [...allRestaurants].sort(
//         (a, b) => b.average_rating - a.average_rating
//       );
//     } else if (sortBy === "name") {
//       return [...allRestaurants].sort((a, b) => a.name.localeCompare(b.name));
//     }
//     // Default return
//     return allRestaurants;
//   };

//   return (
//     <div className="section">
//       <div className="optionsselect">
//         <div>
//           <p>sorted by</p>
//           <select className="select" value={sortBy} onChange={handleSortChange}>
//             <option value="rating">Rating</option>
//             <option value="name">Name (A-Z)</option>
//           </select>
//         </div>
//         <Link to="/nearby">
//           <button className="nearbybtn">Show nearby places</button>
//         </Link>
//       </div>
//       <center>
//         <SearchBar />
//       </center>
//       <div className="restaurantContiners">
//         {sortedRestaurants()
//           .slice(
//             pageNumber * restaurantsPerPage,
//             (pageNumber + 1) * restaurantsPerPage
//           )
//           .map((el) => {
//             return (
//               <div key={el.id} className="singleRestaurants">
//                 <Link to={`/singleRestaurant/${el.id}`} className="resttter">
//                   <img
//                     src={`http://localhost:8000/storage/${el.profile_picture}`}
//                   />
//                   <p>Restaurant Name : {el.name}</p>
//                   <p>Located in : {el.city}</p>
//                   <div className="flex items-center mb-2">
//                     {[...Array(5)].map((_, index) => (
//                       <FaStar
//                         key={index}
//                         color={index < el.average_rating ? "yellow" : "gray"}
//                         className="w-4 h-4 mr-1"
//                       />
//                     ))}
//                     <span>({el.rating_count} reviews)</span>
//                   </div>
//                 </Link>
//               </div>
//             );
//           })}
//       </div>
//       <div style={{ textAlign: "center" }}>
//         <ReactPaginate
//           previousLabel={"Prev"}
//           nextLabel={"Next"}
//           pageCount={Math.ceil(allRestaurants.length / restaurantsPerPage)}
//           onPageChange={handlePageChange}
//           previousClassName={"pagination"}
//           nextClassName={"pagination"}
//           pageClassName={"page-item"}
//           activeClassName={"active"}
//         />
//       </div>
//     </div>
//   );
// };

// export default AllRestaurants;
// AllRestaurants.jsx
// AllRestaurants.jsx

import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import SearchBar from "../components/SearchBar";
import ItemCard from "./ItemCard";

const AllRestaurants = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); // Current page number
  const [sortBy, setSortBy] = useState("rating"); // Default sort by rating
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [selectedType, setSelectedType] = useState("All"); // Selected restaurant type
  const restaurantsPerPage = 12; // Number of restaurants per page

  useEffect(() => {
    axiosClient.get("/restaurant/getAll").then((response) => {
      setAllRestaurants(response.data.restaurants);
    });
  }, []);

  // Function to handle page change
  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  // Function to handle sorting change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Function to handle search change
  // Function to handle search change
  const handleSearchChange = (value) => {
    const newValue = typeof value === "string" ? value : "";
    setSearchTerm(newValue);
  };

  // Function to handle type change
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  // Function to filter restaurants based on selected type and search term
  const filteredRestaurants = () => {
    let filtered = allRestaurants.filter((restaurant) => {
      if (selectedType === "All" || restaurant.type === selectedType) {
        return true;
      }
      return false;
    });

    if (searchTerm) {
      filtered = filtered.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  // Function to sort restaurants based on selected option
  const sortedRestaurants = () => {
    if (sortBy === "rating") {
      return [...filteredRestaurants()].sort(
        (a, b) => b.average_rating - a.average_rating
      );
    } else if (sortBy === "name") {
      return [...filteredRestaurants()].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    // Default return
    return filteredRestaurants();
  };

  return (
    <div className="section">
      <div className="optionsselect">
        <div>
          <p>sorted by</p>
          <select className="select" value={sortBy} onChange={handleSortChange}>
            <option value="rating">Rating</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>
      <form className="max-w-lg mx-auto flex items-center justify-center allsearc">
        <select
          onChange={handleTypeChange}
          className="border border-black rounded-l-lg py-2 px-4"
          style={{ width: "150px" }}
        >
          <option value="All">All</option>
          <option value="Regular Restaurant">Regular</option>
          <option value="caffe">Cafe</option>
          <option value="Dessert">Desert</option>
          <option value="food truck">Food Truck</option>
          <option value="bakery">Bakery</option>
          <option>Resort</option>
        </select>

        <input
          type="text"
          className="border border-black rounded-r-lg py-2 px-4"
          style={{ width: "400px", height: "40px" }}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder=" Search for restaurant"
        />
      </form>
      <div className="restaurantContiners">
        {sortedRestaurants().length == 0 && (
          <center>
            <h1>No Restaurants Found🫥</h1>
          </center>
        )}
        {sortedRestaurants()
          .slice(
            pageNumber * restaurantsPerPage,
            (pageNumber + 1) * restaurantsPerPage
          )
          .map((el) => {
            return (
              <ItemCard
                key={el.id}
                name={el.name}
                type={el.type}
                img={el.profile_picture}
                average_rating={el.average_rating}
                rating_count={el.rating_count}
                city={el.city}
                id={el.id}
              />
            );
          })}
      </div>
      <div style={{ textAlign: "center" }}>
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={Math.ceil(sortedRestaurants().length / restaurantsPerPage)}
          onPageChange={handlePageChange}
          previousClassName={"pagination"}
          nextClassName={"pagination"}
          pageClassName={"page-item"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default AllRestaurants;
/** <div key={el.id} className="singleRestaurants">
                <Link to={`/singleRestaurant/${el.id}`} className="resttter">
                  <img
                    src={`http://localhost:8000/storage/${el.profile_picture}`}
                  />
                  <p>Restaurant Name : {el.name}</p>
                  <p>Located in : {el.city}</p>
                  <p>Type: {el.type}</p>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        color={index < el.average_rating ? "yellow" : "gray"}
                        className="w-4 h-4 mr-1"
                      />
                    ))}
                    <span>({el.rating_count} reviews)</span>
                  </div>
                </Link>
              </div> */
