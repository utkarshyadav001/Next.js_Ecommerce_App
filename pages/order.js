import React from 'react'
import Image from 'next/image'

const Order = () => {
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-14 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-pink-500 tracking-widest">Shopwears.com</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-2">Order Id: #5255378</h1>
              <p className="leading-relaxed text-sm mb-4">Your order has been sucessfully placed.</p>
              <div className="flex mb-4 justify-between border-b-2 border-gray-300">
                <a className="py-2 text-lg ">Item Description</a>
                <a className="py-2 text-lg ">Quantity</a>
                <a className="py-2 text-lg ">Item Total</a>
              </div>
              <div className="flex border-t justify-between border-gray-200 py-2">
                <span className="text-gray-500">wear the code(xl, black)</span>
                <span className="text-gray-500">2</span>
                <span className="text-gray-900">899</span>
              </div>
              <div className="flex border-t  justify-between border-gray-200 py-2">
                <span className="text-gray-500">wear the code(xl, black)</span>
                <span className="text-gray-500">1</span>
                <span className=" text-gray-900">499</span>
              </div>
              <div className="flex border-t  justify-between border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">wear the code(xl, black)</span>
                <span className="text-gray-500">1</span>
                <span className="text-gray-900">220</span>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">Subtotal:  ₹1618</span>
                <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <Image alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="/mugs.jpg" width={255} height={500} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Order