import React, { useEffect, useState } from "react";
import axiosClient from "./axiosClient";
import { useStateContext } from "./context/ContextProvider";
import { Link } from "react-router-dom";

const Orders = () => {
  const { restaurant } = useStateContext();
  const [order, setOrder] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (restaurant.restaurant) {
      axiosClient
        .get(`/ordersOfres/${restaurant.restaurant.id}`)
        .then((res) => {
          console.log(res.data);
          setOrder(res.data);
        });
    }
  }, [restaurant]);

  const filteredOrders = order
    ? order.filter((el) =>
        el.full_name.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  const getStatusColor = (state) => {
    if (state === "done") {
      return "text-green-900 bg-green-200";
    } else {
      return "text-red-900 bg-red-200";
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="antialiased font-sans bg-gray-200 ml-[100px] mt-10">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Users</h2>
          </div>
          <div className="my-2 flex sm:flex-row flex-col">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={filter}
                onChange={handleFilterChange}
                className="appearance-none rounded-r rounded-l sm:rounded-l-none sm:border-l-0 border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current text-gray-500"
                >
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created at
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((el, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                    >
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src="https://randomuser.me/api/portraits/men/1.jpg"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {el.full_name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          <Link
                            className="text-blue-600"
                            to={`/main/restaurantPage/singleOrder/${el.id}`}
                          >
                            Check
                          </Link>
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {el.created_at}
                        </p>
                      </td>
                      <td
                        className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${getStatusColor(
                          el.state
                        )}`}
                      >
                        <span className="relative inline-block px-3 py-1 font-semibold leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-opacity-50 rounded-full"
                          ></span>
                          <span className="relative">{el.state}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;

/*    <div className="ml-[100px]">
      {order && (
        <div className="w-100">
          <section className="container mx-auto p-6 font-mono ">
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
              <div className="w-full overflow-x-auto">
                <table className="w-[90%]">
                  <thead>
                    <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">details</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Date (created at)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {order &&
                      order.map((el) => {
                        return (
                          <tr key={el.id} className="text-gray-700">
                            <td className="px-4 py-3 border">
                              <div className="flex items-center text-sm">
                                <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                  <img
                                    className="object-cover w-full h-full rounded-full"
                                    src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                                    alt=""
                                    loading="lazy"
                                  />
                                </div>
                                <div>
                                  <p className="font-semibold text-black">
                                    {el.full_name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-ms font-semibold border underline text-blue-600 cursor-pointer">
                              <Link
                                to={`/main/restaurantPage/singleOrder/${el.id}`}
                              >
                                check
                              </Link>
                            </td>
                            <td className="px-4 py-3 text-xs border">
                              <span
                                className={`px-2 py-1 font-semibold leading-tight rounded-sm ${
                                  el.state === "done"
                                    ? "text-green-700 bg-green-100"
                                    : "text-red-700 bg-red-100"
                                }`}
                              >
                                {el.state ? el.state : "Not set"}
                              </span>
                            </td>

                            <td className="px-4 py-3 text-sm border">
                              {el.created_at}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>*/
