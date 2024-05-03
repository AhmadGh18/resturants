import React, { useEffect, useState } from "react";
import axiosClient from "./axiosClient";
import { Link } from "react-router-dom";

const AllCartItems = (props) => {
  const [info, setInfo] = useState(null);
  const [cartItemsUpdated, setCartItemsUpdated] = useState(false); // Add state for tracking local storage updates

  useEffect(() => {
    const fetchElements = async () => {
      try {
        // Extract item IDs from props
        const ids = props.cartitems.map((item) => item.item_id);

        const response = await axiosClient.get("/CheckoutItems", {
          params: { ids: ids },
        });
        setInfo(response.data);
        console.log("Fetched items:", response.data); // Log fetched items
      } catch (error) {
        console.error("Error fetching elements:", error);
      }
    };

    // Call fetchElements function here
    fetchElements();
  }, [props.cartitems]); // Trigger effect when cart items change

  console.log("Cart items:", props.cartitems); // Log cart items received as props

  const handleIncrement = (itemId) => {
    const updatedItems = props.cartitems.map((item) =>
      item.item_id === itemId && item.qnty > 0
        ? { ...item, qnty: item.qnty + 1 }
        : item
    );

    // Update Cart_items in local storage
    localStorage.setItem("Cart_items", JSON.stringify(updatedItems));
    setCartItemsUpdated(true);
  };

  const handleDecrement = (itemId) => {
    const updatedItems = props.cartitems.map((item) =>
      item.item_id === itemId && item.qnty > 0
        ? { ...item, qnty: item.qnty - 1 }
        : item
    );

    // Update Cart_items in local storage
    localStorage.setItem("Cart_items", JSON.stringify(updatedItems));
    setCartItemsUpdated(true); // Set state to trigger re-render
  };

  useEffect(() => {
    if (cartItemsUpdated) {
      // Fetch elements again to reflect the changes
      const fetchElements = async () => {
        try {
          // Extract item IDs from props
          const ids = props.cartitems.map((item) => item.item_id);

          const response = await axiosClient.get("/CheckoutItems", {
            params: { ids: ids },
          });
          setInfo(response.data);
          console.log("Fetched items:", response.data); // Log fetched items
        } catch (error) {
          console.error("Error fetching elements:", error);
        }
      };

      fetchElements();
      setCartItemsUpdated(false); // Reset state after re-render
    }
  }, [cartItemsUpdated, props.cartitems]); // Trigger effect when cartItemsUpdated or cart items change

  return (
    <div
      className="relative z-10"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
      style={{ display: props.display }}
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2
                      className="text-lg font-medium text-gray-900"
                      id="slide-over-title"
                    >
                      Shopping cart
                    </h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span
                          className="absolute -inset-0.5"
                          onClick={props.handleclickclose}
                        ></span>
                        <span className="sr-only">Close panel</span>
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {info &&
                          info.items.map((el) => {
                            const cartItem = props.cartitems.find(
                              (item) => item.item_id === el.id
                            );
                            return (
                              <li className="flex py-6" key={el.id}>
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={`http://localhost:8000/storage/${el.thumbnail}`}
                                    alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href="#">{el.title}</a>
                                      </h3>
                                      <p className="ml-4">${el.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {/* Add color, size, etc. if available */}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <button
                                      onClick={() => handleDecrement(el.id)}
                                      style={{ fontSize: "23px" }}
                                    >
                                      -
                                    </button>
                                    <p className="text-gray-500">
                                      Qty {cartItem ? cartItem.qnty : 0}
                                    </p>
                                    <button
                                      onClick={() => handleIncrement(el.id)}
                                      style={{ fontSize: "23px" }}
                                    >
                                      +
                                    </button>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-blue-400 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>$262.00</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <Link
                      to={`/checkout`}
                      className="flex items-center justify-center rounded-md border border-transparent bg-blue-400 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-200"
                    >
                      Checkout
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCartItems;
