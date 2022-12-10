import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Cart from '../pages/cart'

const Navbar = (props) => {

    const { cart, addToCart, removeFromCart, clearCart, subTotal } = props;

    const toggleCart = () => {
        if (ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-full')
            ref.current.classList.add('translate-x-0')
        }
        else {
            ref.current.classList.remove('translate-x-0')
            ref.current.classList.add('translate-x-full')
        }
    }
    const ref = useRef()
    console.log(Object.keys(cart).length)

    return (
        <header className=" body-font border shadow-lg">
            <div className="mx-auto flex flex-wrap py-2 md:flex-row items-center justify-start">
                <Link href={"/"} className="flex title-font mx-2 font-medium items-center text-gray-900 md:mb-0 cursor-pointer">
                    <Image alt='logo' src="/image/logo.png" className='m-0 p-0 rounded-full' width={35} height={35} />
                    <span className="text-pink-500 text-2xl font-bold ">Shopwears.com</span>
                </Link>
                <nav className="md:ml-6 flex flex-wrap items-center text-start text-base justify-center space-x-3 mt-2 ">
                    <Link href="/" className="hover:text-pink-500 text-sm font-bold  hover:shadow-sm">Home</Link>
                    <Link href="/tshirts" className="hover:text-pink-500 text-sm font-bold  hover:shadow-sm">Tshirts</Link>
                    <Link href="/hoodies" className="hover:text-pink-500 text-sm font-bold  hover:shadow-sm">Hoodies</Link>
                    <Link href="/mugs" className="hover:text-pink-500 text-sm font-bold  hover:shadow-sm">Mugs</Link>
                    <Link href="/stickers" className="hover:text-pink-500 text-sm font-bold  hover:shadow-sm">Stickers</Link>
                </nav>
                <div className='icons absolute right-5 flex '>
                    <Image alt='cart icon' src="/image/cart.png" onClick={toggleCart} className='mx-2 p-0 cursor-pointer hover:shadow-lg' width={25} height={0} />
                    <Link href="/login">
                        <Image alt='cart icon' src="/image/profile.png" className='mx-2 p-0 cursor-pointer rounded-full bg-black hover:border-pink-400 hover:border active:shadow-lg' width={28} height={10} />
                    </Link>
                </div>
            </div>
            <div className={`cart transform transition-transform ${Object.keys(cart).length != 0 ? "translate-x-0" : "translate-x-full"}   absolute right-0 mt-2  bg-pink-300 text-white px-2 py-4 h-auto w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/4  z-10 rounded-md`} ref={ref}>
                <Cart props={props} />
            </div>
        </header>
    )
}

export default Navbar