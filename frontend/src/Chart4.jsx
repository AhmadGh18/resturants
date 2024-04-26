import React from "react";

const Chart4 = () => {
  return (
    <div className="bg-white p-4 mt-10">
      <div className="flex items-center mt-2">
        <a
          href="#"
          className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          5 star
        </a>
        <div className="w-2/4 h-3 mx-4 bg-gray-200 rounded dark:bg-gray-700">
          <div
            className="h-3 bg-yellow-300 rounded"
            style={{ width: "70%" }}
          ></div>
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          70%
        </span>
      </div>
      <div className="flex items-center mt-2">
        <a
          href="#"
          className="text-sm font-small text-blue-600 dark:text-blue-500 hover:underline"
        >
          4 star
        </a>
        <div className="w-2/4 h-3 mx-4 bg-gray-200 rounded dark:bg-gray-700">
          <div
            className="h-3 bg-yellow-300 rounded"
            style={{ width: "17%" }}
          ></div>
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          17%
        </span>
      </div>
      <div className="flex items-center mt-2">
        <a
          href="#"
          className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          3 star
        </a>
        <div className="w-2/4 h-3 mx-4 bg-gray-200 rounded dark:bg-gray-700">
          <div
            className="h-3 bg-yellow-300 rounded"
            style={{ width: "8%" }}
          ></div>
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          8%
        </span>
      </div>
      <div className="flex items-center mt-2">
        <a
          href="#"
          className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          2 star
        </a>
        <div className="w-2/4 h-3 mx-4 bg-gray-200 rounded dark:bg-gray-700">
          <div
            className="h-3 bg-yellow-300 rounded"
            style={{ width: "4%" }}
          ></div>
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          4%
        </span>
      </div>
      <div className="flex items-center mt-2">
        <a
          href="#"
          className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          1 star
        </a>
        <div className="w-2/4 h-3 mx-4 bg-gray-200 rounded dark:bg-gray-700">
          <div
            className="h-3 bg-yellow-300 rounded"
            style={{ width: "1%" }}
          ></div>
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          1%
        </span>
      </div>
    </div>
  );
};

export default Chart4;
