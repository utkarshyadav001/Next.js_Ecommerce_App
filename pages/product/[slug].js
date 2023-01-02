import React, { useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// For Server Side props

import mongoose from "mongoose"
import Product from '../../models/product';

const Slug = (props) => {
  
  const { variants, product } = props;

  const { cart, addToCart, removeFromCart, clearCart, subTotal, buyNow } = props;

  // toast("Hey who are you");

  const router = useRouter();
  const slugs = router.query.slug;

  const [pincode, setPincode] = useState();
  const [serviceable, setServiceable] = useState();


  const checkServiceability = async () => {
    const fetchServiceablePin = await fetch("http://localhost:3000/api/pincode");
    const serviceablePin = await fetchServiceablePin.json();

    if (serviceablePin.includes(parseInt(pincode))) {
      setServiceable(true);
      toast.success("Yay! This pincode is serviceable", {
        position: "top-right",
        autoclose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setServiceable(false);
      toast.error("Sorry! We do not deliver to this pincode yet", {
        position: "top-right",
        autoclose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }

  const onChangePin = (e) => {
    setPincode(e.target.value)
  }


  const [color, setColor] = useState(props.product.color)
  const [size, setSize] = useState(props.product.size)

  const refreshVariant = (newSize, newColor) => {
    let url = `http://localhost:3000/product/${variants[newColor][newSize]['slug']}`;
    window.location = url;
    // router.push(`/product/${variants[newColor][newSize]['slug']}`)
  }


  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <ToastContainer
          position='bottom-left'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="container px-5 py-8 lg:py-12 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Image alt="ecommerce" className="rounded  w-full h-1/2 md:h-1/3 md:w-1/2 lg:h-2/5 lg:w-[33%]" src={`${product.img}`} width={355} height={455} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 md:w-1/2 md:pl-5">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">Shopwear {product.category}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title + " " + `(${size}/${color})`}</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).includes("White") && Object.keys(variants["White"]).includes(size) && <button className={` border-2 rounded-full w-6 h-6 focus:outline-none ${color === "White" ? 'border-black' : 'border-gray-300'}  `} onClick={() => { refreshVariant(size, 'White') }} ></button>}
                  {Object.keys(variants).includes("Green") && Object.keys(variants["Green"]).includes(size) && <button className={` border-2 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none ${color === "Green" ? 'border-black' : 'border-gray-300'}  `} onClick={() => { refreshVariant(size, 'Green') }} ></button>}
                  {Object.keys(variants).includes("Blue") && Object.keys(variants["Blue"]).includes(size) && <button className={` border-2 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${color === "Blue" ? 'border-black' : 'border-gray-300'} `} onClick={() => { refreshVariant(size, 'Blue') }} ></button>}
                  {Object.keys(variants).includes("Yellow") && Object.keys(variants["Yellow"]).includes(size) && <button className={` border-2 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${color === "Yellow" ? 'border-black' : 'border-gray-300'}  `} onClick={() => { refreshVariant(size, 'Yellow') }} ></button>}
                  {Object.keys(variants).includes("Red") && Object.keys(variants["Red"]).includes(size) && <button className={` border-2 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none ${color === "Red" ? 'border-black' : 'border-gray-300'}  `} onClick={() => { refreshVariant(size, 'Red') }} ></button>}
                  {Object.keys(variants).includes("Black") && Object.keys(variants["Black"]).includes(size) && <button className={` border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${color === "Black" ? 'border-black' : 'border-gray-300'}  `} onClick={() => { refreshVariant(size, 'Black') }} ></button>}
                  {console.log(Object.keys(variants))}
                  {console.log(Object.keys(variants["Black"]).includes(size))}

                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select value={size} onChange={(e) => { refreshVariant(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
                      {Object.keys(variants[color]).includes('S') && <option value={'S'}>S</option>}
                      {Object.keys(variants[color]).includes('M') && <option value={'M'}>M</option>}
                      {Object.keys(variants[color]).includes('L') && <option value={'L'}>L</option>}
                      {Object.keys(variants[color]).includes('XL') && <option value={'XL'}>XL</option>}
                      {Object.keys(variants[color]).includes('XXL') && <option value={'XXL'}>XXL</option>}
                      {console.log(variants)}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>
                <button onClick={() => { addToCart(slugs, 1, `${product.price}`, `${product.title} (${size}/${color})`, `${size}`, `${color}`) }} className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded text-sm">Add To Cart</button>
                <button onClick={() => { buyNow(slugs, 1, `${product.price}`, `${product.title} (${size}/${color})`, `${size}`, `${color}`) }} className="flex  ml-2 text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded text-sm">Buy Now</button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div className="flex mt-8 items-center justify-between ">
                <input onChange={onChangePin} placeholder="Enter here pincode" type="number" name="pincode" id="pincode" className='border border-gray-400 px-4 py-2 rounded-md outline-none' />
                <button onClick={checkServiceability} className=" h-10  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded ">Check service</button>
              </div>
              <div className="available mt-2">
                {(!serviceable && serviceable != null) && <p className='text-red-500'>Sorry! We do not deliver to this pincode yet</p>}
                {(serviceable && serviceable != null) && <p className='text-green-500'>Yay! This pincode is serviceable</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URL);
  }

  let product = await Product.findOne({ slug: context.query.slug });
  let variants = await Product.find({ title: product.title, category: product.category });
  let colorSizeSlug = {} // {red: {xl: {'slug': "wear-the-code-xl"}}}

  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
    else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
  }

  return {
    props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) }
  }
}

export default Slug