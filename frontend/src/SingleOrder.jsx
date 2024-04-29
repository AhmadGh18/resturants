import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "./axiosClient";

const SingleOrder = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [OrderInfo, setOrderInfo] = useState(null);
  const [orderedItems, setOrderedItems] = useState(null);
  useEffect(() => {
    axiosClient.get(`/orders/${id}`).then((res) => {
      console.log(res);
      setUser(res.data.user_info);
      setOrderInfo(res.data.order_info);
      setOrderedItems(res.data.ordered_items);
    });
  }, [id]);
  return (
    <div className="m-20 bg-white w-100 p-12">
      {user && OrderInfo && (
        <>
          <div className="flex">
            <h1 className="p-1 font-bold">Customer Name: </h1>
            <h1 className="p-1"> {user.name}</h1>
          </div>
          <div className="flex mt-3">
            <h1 className="p-1 font-bold">Customer phone: </h1>
            <h1 className="p-1"> {OrderInfo.phone}</h1>
          </div>
          <div className="flex mt-3">
            <h1 className="p-1 font-bold">Customer email: </h1>
            <h1 className="p-1"> {user.email}</h1>
          </div>
          <div className="flex mt-3">
            <h1 className="p-1 font-bold">Customer want his order in: </h1>
            <h1 className="p-1"> {OrderInfo.city}</h1>
          </div>
          <div>
            <h1 className="p-1 font-bold mt-5">User excat location</h1>
            <iframe
              src={`https://www.google.com/maps?q=${OrderInfo.latitude},${OrderInfo.longitude}&h1=es;z=14&output=embed`}
              title="Restaurant Location"
              height={400}
              width="100%"
            ></iframe>
          </div>
          <div className="font-bold mt-4">Ordered Items :</div>
          {orderedItems &&
            orderedItems.map((el) => {
              return <p key={el.id}>{el.name}</p>;
            })}
        </>
      )}
    </div>
  );
};

export default SingleOrder;
