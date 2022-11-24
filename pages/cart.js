import React from 'react'

const Cart = () => {
  return (
    <div className=''>
      <h1 className='text-2xl  font-serif text-center underline'>Shopwear Cart</h1>
      <div className="item flex flex-wrap flex-col">
        <div className="mt-4">
          <h3 className="text-gray-600 text-xs tracking-widest title-font mb-1">Tshirts</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
          <p className="mt-1">$16.00</p>
        </div>
        <hr />
        <div className="mt-4">
          <h3 className="text-gray-600 text-xs tracking-widest title-font mb-1">Hoodies</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
          <p className="mt-1">$16.00</p>
        </div>
        <hr />
        <div className="mt-4">
          <h3 className="text-gray-600 text-xs tracking-widest title-font mb-1">Hoodies</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
          <p className="mt-1">$16.00</p>
        </div>
        <hr />
        <div className="mt-4">
          <h3 className="text-gray-600 text-xs tracking-widest title-font mb-1">Hoodies</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
          <p className="mt-1">$16.00</p>
        </div>
        <hr />
        <div className="mt-4">
          <h3 className="text-gray-600 text-xs tracking-widest title-font mb-1">Mugs</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
          <p className="mt-1">$16.00</p>
        </div>
        <hr />
      </div>
    </div>
  )
}

export default Cart