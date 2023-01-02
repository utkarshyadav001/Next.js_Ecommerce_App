import React, { useEffect } from "react";
import { useRouter } from "next/router";

// For Server Side props
import order from "../models/order";
import mongoose from "mongoose";

const Orders = () => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  return (
    <div className="container  mx-auto my-8">
      <h2 className="font-semibold text-2xl mx-8 my-4 block">Orders</h2>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-500">
                Product name
              </th>
              <th scope="col" className="py-3 px-6">
                Color
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-500">
                Category
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-500"
              >
                Apple MacBook Pro 17
              </th>
              <td className="py-4 px-6">Sliver</td>
              <td className="py-4 px-6 bg-gray-50 dark:bg-gray-500">Laptop</td>
              <td className="py-4 px-6">$2999</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-500"
              >
                Microsoft Surface Pro
              </th>
              <td className="py-4 px-6">White</td>
              <td className="py-4 px-6 bg-gray-50 dark:bg-gray-500">
                Laptop PC
              </td>
              <td className="py-4 px-6">$1999</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-500"
              >
                Magic Mouse 2
              </th>
              <td className="py-4 px-6">Black</td>
              <td className="py-4 px-6 bg-gray-50 dark:bg-gray-500">
                Accessories
              </td>
              <td className="py-4 px-6">$99</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-500"
              >
                Google Pixel Phone
              </th>
              <td className="py-4 px-6">Gray</td>
              <td className="py-4 px-6 bg-gray-50 dark:bg-gray-500">Phone</td>
              <td className="py-4 px-6">$799</td>
            </tr>
            <tr>
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-500"
              >
                Apple Watch 5
              </th>
              <td className="py-4 px-6">Red</td>
              <td className="py-4 px-6 bg-gray-50 dark:bg-gray-500">
                Wearables
              </td>
              <td className="py-4 px-6">$999</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URL);
  }

  let products = await order.find({ });

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}

export default Orders;
