import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "./axiosClient";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SingleOrder = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [OrderInfo, setOrderInfo] = useState(null);
  const [orderedItems, setOrderedItems] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  var total = 0;

  useEffect(() => {
    axiosClient.get(`/orders/${id}`).then((res) => {
      setUser(res.data.user_info);
      setOrderInfo(res.data.order_info);
      setOrderedItems(res.data.order_items);
      setOrderStatus(res.data.order_info.state);
    });
  }, [id]);

  const updateOrderStatus = (status) => {
    axiosClient
      .post("/orders/update", { order_id: id, state: status })
      .then((res) => {
        setOrderStatus(status);
      });
  };

  return (
    <div className="mx-auto max-w-4xl bg-white p-8 rounded-lg shadow-lg">
      <Link to="/main/restaurantPage/Orders" className="">
        <FaArrowAltCircleLeft className="text-4xl mt-6 mb-5 nohover" />
      </Link>

      {user && OrderInfo && (
        <>
          <div className="flex">
            <h1 className="font-bold">Customer Name:</h1>
            <h1 className="ml-2">{user.name}</h1>
          </div>
          <div className="flex mt-3">
            <h1 className="font-bold">Customer Phone:</h1>
            <h1 className="ml-2">{OrderInfo.phone}</h1>
          </div>
          <div className="flex mt-3">
            <h1 className="font-bold">Customer Email:</h1>
            <h1 className="ml-2">{user.email}</h1>
          </div>
          <div className="flex mt-3">
            <h1 className="font-bold">Customer Address:</h1>
            <h1 className="ml-2">{OrderInfo.city}</h1>
          </div>
          <div className="mt-5">
            <h1 className="font-bold">User Exact Location</h1>
            <iframe
              src={`https://www.google.com/maps?q=${OrderInfo.latitude},${OrderInfo.longitude}&h1=es;z=14&output=embed`}
              title="Restaurant Location"
              height={400}
              className="w-full"
            ></iframe>
          </div>
          <div className="font-bold mt-8">Ordered Items:</div>
          <table className="mt-4 w-full table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-1/4 px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                  Name
                </th>
                <th className="w-1/6 px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                  Price
                </th>
                <th className="w-1/6 px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                  Quantity
                </th>
                <th className="w-1/6 px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                  Subtotal
                </th>
                <th className="w-1/3 px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orderedItems &&
                orderedItems.map((el) => {
                  const subtotal = el.price * el.quantity;
                  total += subtotal;

                  return (
                    <tr key={el.id} className="text-sm">
                      <td className="px-6 py-4">{el.name}</td>
                      <td className="px-6 py-4">{el.price}</td>
                      <td className="px-6 py-4">{el.quantity}</td>
                      <td className="px-6 py-4">{subtotal}</td>
                      <td className="px-6 py-4">{el.description}</td>
                    </tr>
                  );
                })}
              <tr className="bg-gray-50">
                <td
                  colSpan="3"
                  className="px-6 py-4 text-right uppercase font-semibold"
                >
                  Total:
                </td>
                <td colSpan="2" className="px-6 py-4 font-semibold">
                  {total}
                </td>
              </tr>
            </tbody>
          </table>
          {orderedItems && (
            <div className="mt-4 font-semibold">Final Total: {total}</div>
          )}
          {!orderedItems && <div className="mt-4 font-semibold">No items</div>}
          {orderStatus && (
            <div className="mt-8">
              <h1 className="font-bold">
                Order Status:{" "}
                {orderStatus === "done" ? (
                  <span className="text-green-500">Done</span>
                ) : (
                  <span className="text-red-500">Not Done</span>
                )}
              </h1>
            </div>
          )}
          {orderStatus === "No Set" && (
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => updateOrderStatus("done")}
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
              >
                Mark as Done
              </button>
              <button
                onClick={() => updateOrderStatus("not done")}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
              >
                Not Done
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SingleOrder;
