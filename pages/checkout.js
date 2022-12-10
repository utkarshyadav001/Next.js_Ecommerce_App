import React from 'react'

const Checkout = (props) => {

    const { cart, addToCart, removeFromCart, clearCart, subTotal } = props;

    return (
        <div className='container mx-auto w-4/5'>

            <h1 className='text-2xl mt-6 my-2  font-serif text-center underline mb-2'>Checkout</h1>
            <div className="flex flex-col mx-auto">                
                <h2 className='my-2 text-xl pb-4'>1. Address Details</h2>
                <div className="flex flex-row space-x-2 pb-6">
                    {/* <label htmlFor="name">Name</label> */}
                    <input placeholder="Enter your Name" type="text" name="name" id="name" className='w-1/2 border border-gray-400 px-2 py-2 rounded outline-none' />
                    <input placeholder="Enter your Email" type="email" name="email" id="email" className='w-1/2 border border-gray-400 px-2 py-2 rounded outline-none' />
                </div>
                <div className="flex flex-row pb-6">
                    <textarea placeholder="Address" name="address" id="" cols="30" rows="5" className='w-full border border-gray-400 px-2 py-2 rounded outline-none'></textarea>
                </div>
                <div className="flex flex-row space-x-2 pb-6">
                    {/* <label htmlFor="name">Name</label> */}
                    <input placeholder="Phone Number" type="number" name="phone" id="phone" className='w-1/2 border border-gray-400 px-2 py-2 rounded outline-none' />
                    <input placeholder="City" type="text" name="city" id="city" className='w-1/2 border border-gray-400 px-2 py-2 rounded outline-none' />
                </div>
                <div className="flex flex-row space-x-2 pb-6">
                    {/* <label htmlFor="name">Name</label> */}
                    <input placeholder="State" type="text" name="state" id="state" className='w-1/2 border border-gray-400 px-2 py-2 rounded outline-none' />
                    <input placeholder="Pincode" type="number" name="pincode" id="pincode" className='w-1/2 border border-gray-400 px-2 py-2 rounded outline-none' />
                </div>
            </div>

            <div className="flex flex-col mx-auto mt-4">
                <h2 className='mb-2 text-xl pb-4'>2. Check Order Product</h2>
                <div className='mx-1'>
                    {/* Itemes here */}
                    <div className="item flex flex-wrap flex-col">
                        {Object.keys(cart).length == 0 && <div className='text-sm text-black text-center font-bold py-2'> Your cart is empty! Please add few product</div>}
                        {cart && Object.keys(cart).map((item) => {
                            return <div key={item}>
                                <div className="my-4 px-6">
                                    <h3 className="text-gray-600 text-xs tracking-widest title-font mb-1">Tshirts</h3>
                                    <div className="flex  items-center justify-between">
                                        <h2 className="text-gray-900 title-font text-lg font-medium"> {cart[item].name} </h2>
                                        <div className="flex space-x-0">
                                            <button onClick={() => { removeFromCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].variant) }} className='bg-pink-400 rounded-2xl w-6 active:bg-pink-400 hover:bg-pink-600'>-</button>
                                            <span className='text-md text-center text-black rounded-2xl w-6'> {cart[item].qty} </span>
                                            <button onClick={() => { addToCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].variant) }} className='bg-pink-400 rounded-2xl w-6 active:bg-pink-400 hover:bg-pink-600'>+</button>
                                        </div>
                                    </div>
                                    <p className="my-1 font-bold"> ₹ {cart[item].price}</p>
                                    <hr />
                                </div>
                            </div>
                        })}
                        <div className="my-4 px-6">
                            <h3 className="text-gray-600 text-xs tracking-widest title-font mb-1">Tshirts</h3>
                            <div className="flex  items-center justify-between">
                                <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                                <div className="flex space-x-0">
                                    <button className='bg-pink-400 rounded-2xl w-6 active:bg-pink-400 hover:bg-pink-600'>-</button>
                                    <span className='text-md text-center text-black rounded-2xl w-6'>5</span>
                                    <button className='bg-pink-400 rounded-2xl w-6 active:bg-pink-400 hover:bg-pink-600'>+</button>
                                </div>
                            </div>
                            <p className="my-1 font-bold"> $16.00</p>
                            <hr />
                        </div>
                    </div>
                    <div className='my-4 mx-2'>
                        <span className='text-black font-bold'>Total Price : ₹ {subTotal}</span>
                    </div>
                    <div className="mt-8">
                        <button className='w-full h-10 text-sm text-white bg-pink-500 border-0 py-1 px-1 focus:outline-none hover:bg-pink-600 rounded active:bg-pink-500'>Buy All Product</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout