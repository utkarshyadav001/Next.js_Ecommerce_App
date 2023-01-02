import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';

// For Server Side props
import product from "../models/product";
import mongoose from "mongoose"


const Stickers = ({ products }) => {

  const [product, setProduct] = useState(products)


  return (
    <div>
      <Head>
        <title>Shopwears || Stickers</title>
        <meta name="description" content="Buy amazing Stickers for men, women, kinds" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-4 mx-auto">

            {Object.keys(products).length ==0 && <p className=' block my-4 text-center text-md text-red-500'>Sorry, all the Stickers is currently out of stock. New stock coming soon. Stay Tuned!</p>}

            <div className="flex flex-wrap mt-1">
              {
                products && Object.keys(products).map((item) => {
                  return <Link href={`product/${products[item].slug}`} key={item.slug} className="lg:w-1/4 md:w-1/2 p-4 w-full  shadow-lg" >
                    <div className="block relative  max-h-96  rounded overflow-hidden shadow-lg cursor-pointer">
                      <Image alt="ecommerce" className="object-cover  w-full h-full block" src={product[item].img}  width={355} height={455} />
                    </div>
                    <div className="mt-2 ">
                      {/* <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category}</h3> */}
                      <h2 className="text-black title-font text-md font-medium">{products[item].title}</h2>
                      <h3 className="title-font text-sm text-gray-500">{products[item].desc}</h3>
                      <div className="sizes space-x-1 mt-1 ml-1">
                        {products[item].size.includes("S") && <span className="title-font text-sm text-gray-500 border border-gray-400 px-1">S</span>}
                        {products[item].size.includes("M") && <span className="title-font text-sm text-gray-500 border border-gray-400 px-1">M</span>}
                        {products[item].size.includes("L") && <span className="title-font text-sm text-gray-500 border border-gray-400 px-1">L</span>}
                        {products[item].size.includes("XL") && <span className="title-font text-sm text-gray-500 border border-gray-400 px-1">XL</span>}
                        {products[item].size.includes("XXL") && <span className="title-font text-sm text-gray-500 border border-gray-400 px-1">XXL</span>}
                      </div>
                      <div className="color space-x-1 mt-1">
                        {products[item].color.includes("Red") && <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes("Blue") && <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes("Yellow") && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes("Green") && <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes("Black") && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                      </div>
                      <p className="mt-1">₹{products[item].price}</p>
                    </div>
                  </Link>
                })
              }
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full  shadow-lg">
                <a className="block relative  max-h-96  rounded overflow-hidden shadow-lg cursor-pointer">
                  <Image alt="ecommerce" className="object-cover  w-full h-full block" src="/pic.jpg" width={355} height={455} />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                  <h2 className="text-black title-font text-lg font-medium">The Catalyzer</h2>
                  <p className="mt-1">₹516.00</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  )
}



export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URL);
  }

  let products = await product.find({category: "stickers"});
  let Stickers = {};
    for (let item of products){
        if(item.title in Stickers){
            if(!Stickers[item.title].color.includes(item.color) && item.availableQty > 0 ){
                Stickers[item.title].color.push(item.color)
            }
            if(!Stickers[item.title].size.includes(item.size) && item.availableQty > 0 ){
                Stickers[item.title].size.push(item.size)
            }
        }
        else{
            Stickers[item.title] = JSON.parse(JSON.stringify(item))
            if(item.availableQty > 0 ){
                Stickers[item.title].color = [item.color]
                Stickers[item.title].size = [item.size]
            }
        }
    }

  return {
    props: { products: JSON.parse(JSON.stringify(Stickers)) }
  }
}

export default Stickers