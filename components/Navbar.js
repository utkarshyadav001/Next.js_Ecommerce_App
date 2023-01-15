import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Cart from '../pages/cart'
import { useRouter } from 'next/router'



const Navbar = (props) => {

    const { user, cart, addToCart, removeFromCart, clearCart, subTotal, logout } = props;
    const router = useRouter()

    const [dorpDown, setDorpDown] = useState(false)
    const [sideCart, setSideCart] = useState(false)

    const toggleCart = () => {
        setSideCart(!sideCart)
    }

    useEffect(() => {
        let dontShowCart = ["/order", "/myaccount", "/signup", "/login", "/forgot", "/checkout", "/product/[slug]"]
        if(dontShowCart.includes(router.pathname)){
            setSideCart(false)
        }
        else{
            setSideCart(true)
        }
    }, [router.pathname])
    

    const ref = useRef()

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
                    <a onMouseOver={() => { setDorpDown(true) }} onMouseLeave={() => { setDorpDown(false) }}>
                        {dorpDown && <div className="w-40 text-md absolute top-6 right-5 bg-pink-200 pl-6 py-3 rounded-lg z-50 ">
                            <ul>
                                <Link href="/myaccount" legacyBehavior><a className='block text-white font-bold pb-1 hover:text-pink-400' >My Account</a></Link>
                                <Link href="/orders" legacyBehavior><a className='block text-white font-bold pb-1 hover:text-pink-400' >Orders</a></Link>
                                <button onClick={logout}><li className='block text-white font-bold hover:text-pink-400'>Logout</li></button>
                            </ul>
                        </div>}
                        {user.value && <div onMouseOver={() => { setDorpDown(true) }} onMouseLeave={() => { setDorpDown(false) }}>
                            <Image alt='cart icon' src="/image/profile.png" className='mx-2 p-0 cursor-pointer rounded-full bg-black hover:border-pink-400 hover:border active:shadow-lg' width={28} height={10} />
                        </div>}
                    </a>
                    {!user.value && <Link href="/login">
                        <button className="rounded-md border border-transparent bg-pink-600 py-1 px-3 text-sm font-medium text-white hover:bg-pink-700 ">
                            <Link href="/login" >Login</Link></button>
                    </Link>}
                </div>
            </div>
            <div className={`cart transform transition-transform ${sideCart && sideCart ? "translate-x-0" : "translate-x-full"}  overflow-y-scroll absolute right-0 mt-2  bg-pink-300 text-white px-2 py-4 max:h-[89vh] w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/4 z-10 rounded-md`} ref={ref}>
                <div className='mx-1'>
                    <h1 className='text-2xl  font-serif text-center underline mb-2'>Shopwear Cart</h1>
                    <Cart props={props} />
                </div>
            </div>
        </header>
    )
}

export default Navbar