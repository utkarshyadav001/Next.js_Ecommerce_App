import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link"

// For Server Side props
import order from "../models/order";
import mongoose from "mongoose";

const Orders = () => {
  const router = useRouter();
  const [order, setOrder] = useState()

  useEffect(() => {
    
    const fetchOrder = async ()=>{
      let req = await fetch(process.env.NEXT_PUBLIC_HOST + "/api/fetchorders", {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
        },
        body : JSON.stringify({token: localStorage.getItem('token')})
      });

      let or = await req.json()
      setOrder(or.products)
    }

    if (!localStorage.getItem("token")) {
      router.push("/");
    }
    else{
      fetchOrder()
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
              Quantity
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-500">
                Status
              </th>
              <th scope="col" className="py-3 px-6">
                Price 
              </th>
            </tr>
          </thead>
          <tbody>
            {
              order && order.map((item)=>{
                let pro = item.products
                let status  = item.status
                let orderId = item._id
                return Object.keys(pro).map((item)=>{
                  return <tr key={pro[item].name} className="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-500">
                    <Link className="text-blue-500 hover:text-blue-700" href={process.env.NEXT_PUBLIC_HOST + `/order?id=${orderId}`}>{pro[item].name} </Link>
                    </th>
                    <td className="py-4 px-6">{pro[item].qty}</td>
                    <td className="py-4 px-6 bg-gray-50 dark:bg-gray-500">{status}</td>
                    <td className="py-4 px-6">₹{pro[item].price}</td>
                  </tr>
              })
              })
            }
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
