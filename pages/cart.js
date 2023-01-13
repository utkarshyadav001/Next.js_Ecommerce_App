import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const Cart = (props) => {

  const { cart, addToCart, removeFromCart, clearCart, subTotal } = props.props;
  // console.log(Object.keys(cart).length)
  // console.log({ cart, addToCart, removeFromCart, clearCart, subTotal })

  // const [product, setProduct] = useState()
  // const [productID, setProductID] = useState()

  // useEffect(() => {

  //   setProduct(JSON.parse(localStorage.getItem("product")))
  //   setProductID(JSON.parse(localStorage.getItem("productID")));
  //   // console.log(product, productId)
  // }, [])


  return (

    <div>
    <div className="item flex flex-wrap flex-col">
        {/* Itemes here */}
        {/* {
          product && product.map((item) => {
            return <div key={item.productId}>
              <div className="mt-4">
                <h3 className="text-gray-600 text-xs tracking-widest title-font mb-1">{item.category}</h3>
                <div className="flex  items-center justify-between">
                  <h2 className="text-gray-900 title-font text-lg font-medium">{item.name}</h2>
                  <div className="flex space-x-0">
                    <button className='bg-pink-400 rounded-2xl w-6 active:bg-pink-400 hover:bg-pink-600'>-</button>
                    <span className='text-md text-center text-black rounded-2xl w-6'>{item.qty}</span>
                    <button className='bg-pink-400 rounded-2xl w-6 active:bg-pink-400 hover:bg-pink-600'>+</button>
                  </div>
                </div>
                <p className="mt-1">{item.price}</p>
              </div>
              <hr />
            </div>
          })
        } */}
        {Object.keys(cart).length == 0 && <div className='text-sm text-black text-center font-bold py-2'> Your cart is empty! Please add few product</div>}
        {cart && Object.keys(cart).map((item) => {
          return <div key={item} className=" overflow-y-auto">
            <div className="mt-4">
              <h3 className="text-gray-600 text-xs tracking-widest title-font mb-1">Tshirts</h3>
              <div className="flex  items-center justify-between">
                <h2 className="text-gray-900 title-font text-lg font-medium"> {cart[item].name} </h2>
                <div className="flex space-x-0">
                  <button onClick={() => { removeFromCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].variant) }} className='bg-pink-400 rounded-2xl w-6 active:bg-pink-400 hover:bg-pink-600'>-</button>
                  <span className='text-md text-center text-black rounded-2xl w-6'> {cart[item].qty} </span>
                  <button onClick={() => { addToCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].variant) }} className='bg-pink-400 rounded-2xl w-6 active:bg-pink-400 hover:bg-pink-600'>+</button>
                </div>
              </div>
              <p className="mt-1 pl-2"> ₹ {cart[item].price}</p>
            </div>
            <hr />
          </div>
        })}
      </div>
      <div className='my-4 mx-2'>
        <span className='text-black font-bold'>Total Price : ₹ {subTotal}</span>
      </div>
      <div className="flex space-x-2">
          <button disabled={Object.keys(cart).length==0 ? true : false} className=' w-1/2 h-10 text-sm text-white bg-pink-500 border-0 py-1 px-1 focus:outline-none hover:bg-pink-600 rounded disabled:bg-pink-400 active:bg-pink-500 cursor-pointer '>
          {Object.keys(cart).length==0 ? <span>Checkout </span> : <Link href="/checkout">Checkout</Link>}
          </button>
        <button disabled={Object.keys(cart).length==0 ? true : false}  onClick={clearCart} className=' w-1/2 h-10 text-sm text-white bg-pink-500 border-0 py-1 px-1 focus:outline-none hover:bg-pink-600 rounded active:bg-pink-500 disabled:bg-pink-400 cursor-pointer'>Clear Cart</button>
      </div>
      </div>
  )
}

export default Cart