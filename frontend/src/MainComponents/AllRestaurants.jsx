// import React, { useEffect, useState } from "react";
// import axiosClient from "../axiosClient";
// import { FaStar } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import ReactPaginate from "react-paginate";
// import SearchBar from "../components/SearchBar";
// import ItemCard from "./ItemCard";

// const AllRestaurants = () => {
//   const [allRestaurants, setAllRestaurants] = useState([]);
//   const [pageNumber, setPageNumber] = useState(0); // Current page number
//   const [sortBy, setSortBy] = useState("rating"); // Default sort by rating
//   const [searchTerm, setSearchTerm] = useState(""); // Search term
//   const [selectedType, setSelectedType] = useState("All"); // Selected restaurant type
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

//   // Function to handle search change
//   // Function to handle search change
//   const handleSearchChange = (value) => {
//     const newValue = typeof value === "string" ? value : "";
//     setSearchTerm(newValue);
//   };

//   // Function to handle type change
//   const handleTypeChange = (e) => {
//     setSelectedType(e.target.value);
//   };

//   // Function to filter restaurants based on selected type and search term
//   const filteredRestaurants = () => {
//     let filtered = allRestaurants.filter((restaurant) => {
//       if (selectedType === "All" || restaurant.type === selectedType) {
//         return true;
//       }
//       return false;
//     });

//     if (searchTerm) {
//       filtered = filtered.filter((restaurant) =>
//         restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     return filtered;
//   };

//   // Function to sort restaurants based on selected option
//   const sortedRestaurants = () => {
//     if (sortBy === "rating") {
//       return [...filteredRestaurants()].sort(
//         (a, b) => b.average_rating - a.average_rating
//       );
//     } else if (sortBy === "name") {
//       return [...filteredRestaurants()].sort((a, b) =>
//         a.name.localeCompare(b.name)
//       );
//     }
//     // Default return
//     return filteredRestaurants();
//   };

//   return (
//     <div className="section">
//       <div className="optionsselect">
//         <div className="">
//           <p>sorted by</p>
//           <select
//             className="select p-4 pt-1 pb-1"
//             value={sortBy}
//             onChange={handleSortChange}
//           >
//             <option value="rating">Rating</option>
//             <option value="name">Name (A-Z)</option>
//           </select>
//         </div>
//       </div>
//       <form className="max-w-lg mx-auto flex items-center justify-center allsearc">
//         <select
//           onChange={handleTypeChange}
//           className="border border-black rounded-l-lg py-2 px-4"
//           style={{ width: "150px" }}
//         >
//           <option value="All">All</option>
//           <option value="Regular Restaurant">Regular</option>
//           <option value="caffe">Cafe</option>
//           <option value="Dessert">Desert</option>
//           <option value="food truck">Food Truck</option>
//           <option value="bakery">Bakery</option>
//           <option>Resort</option>
//         </select>

//         <input
//           type="text"
//           className="border border-black rounded-r-lg py-2 px-4"
//           style={{ width: "400px", height: "40px" }}
//           onChange={(e) => handleSearchChange(e.target.value)}
//           placeholder=" Search for restaurant"
//         />
//       </form>
//       <div className="restaurantContiners">
//         {sortedRestaurants && sortedRestaurants().length == 0 && (
//           <center>
//             <h1 className="">No Restaurants were Found🫥</h1>
//           </center>
//         )}
//         {sortedRestaurants()
//           .slice(
//             pageNumber * restaurantsPerPage,
//             (pageNumber + 1) * restaurantsPerPage
//           )
//           .map((el) => {
//             return (
//               <ItemCard
//                 key={el.id}
//                 name={el.name}
//                 type={el.type}
//                 img={el.profile_picture}
//                 average_rating={el.average_rating}
//                 rating_count={el.rating_count}
//                 city={el.city}
//                 id={el.id}
//               />
//             );
//           })}
//       </div>
//       <div style={{ textAlign: "center" }}>
//         <ReactPaginate
//           previousLabel={"Prev"}
//           nextLabel={"Next"}
//           pageCount={Math.ceil(sortedRestaurants().length / restaurantsPerPage)}
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
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const restaurantsPerPage = 12; // Number of restaurants per page

  useEffect(() => {
    axiosClient.get("/restaurant/getAll").then((response) => {
      setAllRestaurants(response.data.restaurants);
      setIsLoading(false); // Set loading to false after fetching data
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
        <div className="">
          <p>sorted by</p>
          <select
            className="select p-4 pt-1 pb-1"
            value={sortBy}
            onChange={handleSortChange}
          >
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
        {isLoading ? ( // Show loading if data is still loading
          <div className="flex justify-center items-center h-40">
            <p>Loading...</p>
          </div>
        ) : sortedRestaurants().length === 0 ? ( // Show message if no restaurants found
          <center>
            <h1 className="">No Restaurants were Found🫥</h1>
          </center>
        ) : (
          // Render restaurants
          sortedRestaurants()
            .slice(
              pageNumber * restaurantsPerPage,
              (pageNumber + 1) * restaurantsPerPage
            )
            .map((el) => (
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
            ))
        )}
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
