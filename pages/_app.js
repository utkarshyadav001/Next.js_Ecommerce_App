import { useEffect, useState } from 'react'
import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar';

function MyApp({ Component, pageProps }) {

  const [progress, setProgress] = useState(0)

  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();
  const [user, setUser] = useState({value: null})  
  const [key, setKey] = useState(0)

  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      subt += (myCart[keys[i]].price * myCart[keys[i]].qty);
    }
    setSubTotal(subt)
  }

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty
    }
    else {
      newCart[itemCode] = { qty: 1, price, name, size, variant }
    }
    setCart(newCart)
    saveCart(newCart)
  }

  const clearCart = () => {
    setCart({})
    saveCart({})
  }

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode]
    }
    setCart(newCart)
    saveCart(newCart)
  }

  const buyNow = (itemCode, qty, price, name, size, variant) =>{
    let newCart = {itemCode:  { qty: 1, price, name, size, variant }};
    setCart(newCart)
    saveCart(newCart)
    router.push("/checkout")
  }

  const logout = ()=>{
    localStorage.removeItem("token");
    setKey(Math.random());
    setUser({value: null})
    router.push("/")
  }

  useEffect(() => {
    router.events.on('routeChangeStart', ()=>{setProgress(35)})
    router.events.on('routeChangeComplete', ()=>{setProgress(100)})
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.log(error)
      localStorage.clear();
    }
    let token = localStorage.getItem("token");
    if(token){
      setUser({value: token});
      setKey(Math.random())
    }
  }, [router.query])



  return <>
    <LoadingBar
        color='#f11946'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
    <Navbar key={key} user={user} logout={logout} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
    <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} buyNow={buyNow} />
    <Footer />
  </>
}

export default MyApp
