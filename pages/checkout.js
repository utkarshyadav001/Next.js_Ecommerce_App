import  { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = (props) => {

    let router = useRouter()

    const { cart, addToCart, removeFromCart, clearCart, subTotal } = props;
    const [payBtnDisabled, setPayBtnDisabled] = useState(true)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [pincode, setPincode] = useState('')
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const handleChange = async (e)=>{
        if(e.target.name == "name"){
            setName(e.target.value)
        }
        else if(e.target.name == "email"){
            setEmail(e.target.value)
        }
        else if(e.target.name == "address"){
            setAddress(e.target.value)
        }
        else if(e.target.name == "phone"){
            setPhone(e.target.value)
        }
        else if(e.target.name == "pincode"){
            setPincode(e.target.value);
            const fetchServiceablePin = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
            const serviceablePins = await fetchServiceablePin.json();
            if(Object.keys(serviceablePins).includes(e.target.value)){
                setCity(serviceablePins[e.target.value][0])
                setState(serviceablePins[e.target.value][1])
            }
            else{
                setCity("")
                setState("")
            }
        }
    }

    const pay = async ()=>{
        let data = {subTotal, cart, name, email, address, phone, pincode};

        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order`, {
            method: 'POST',
            headers: {
              'Content-Type':  'application/json',
            },
            body : JSON.stringify(data)
        });

        let response = await res.json()
        
        if (response.success) {
            toast.success(response.msg, {
              position: "top-left",
              autoclose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
                router.push("/order?id=" + response.oid)
            }, 2000);
          }
          else{
            toast.error(response.error, {
              position: "top-left",
              autoclose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            if(response.clearCart){
                clearCart()
            }

        }

    }

    useEffect(() => {
        if(Object.keys(cart).length==0){
            router.push("/")
        }
    }, [])

    useEffect(() => {
        if( name.length>3 && email.length>3 && address.length>3 && phone.length>3 && pincode.length>3 ){
            setPayBtnDisabled(false)
        }
        else{
            setPayBtnDisabled(true)
        }
    }, [ name, email, pincode, address, phone])
    
    

    return (
        <div className='container mx-auto w-4/5'>
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

            <h1 className='text-2xl mt-6 my-2  font-serif text-center underline mb-2'>Checkout</h1>
            <div className="flex flex-col mx-auto">                
                <h2 className='my-2 text-xl pb-4'>1. Address Details</h2>
                <div className="flex flex-row space-x-2 pb-6">
                    {/* <label htmlFor="name">Name</label> */}
                    <input onChange={handleChange} value={name} placeholder="Name" type="text" name="name" id="name" className='w-1/2 border border-gray-400 px-2 py-2 rounded outline-none' />
                    <input onChange={handleChange} value={email} placeholder="Email" type="email" name="email" id="email" className='w-1/2 border border-gray-400 px-2 py-2 rounded outline-none' />
                </div>
                <div className="flex flex-row pb-6">
                    <textarea onChange={handleChange} value={address} placeholder="Address" name="address" id="address" cols="30" rows="5" className='w-full border border-gray-400 px-2 py-2 rounded outline-none'></textarea>
                </div>
                <div className="flex flex-row space-x-2 pb-6">
                    {/* <label htmlFor="name">Name</label> */}
                    <input onChange={handleChange} value={phone} placeholder="Phone" type="number" id="phone" name="phone" className='w-1/2 border border-gray-400 px-2 py-2 rounded outline-none' />
                    <input onChange={handleChange} value={pincode} placeholder="Pincode" type="number" name="pincode" id="pincode" className='w-1/2 border border-gray-400 px-2 py-2 rounded outline-none' />
                </div>
                <div className="flex flex-row space-x-2 pb-6">
                    {/* <label htmlFor="name">Name</label> */}
                    <input onChange value={city} placeholder="City" type="text" name="city" id="city" className='w-1/2 border border-gray-400 px-2 py-2 rounded outline-none' />
                    <input onChange value={state} placeholder="State" type="text" name="state" id="state" className='w-1/2 border border-gray-400 px-2 py-2 rounded outline-none' />
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
                    </div>
                    <div className='my-2 mx-2'>
                        <span className='text-black font-bold'>Total Price : ₹ {subTotal}</span>
                    </div>
                    <div className="mt-2 ml-4">
                        <button className='h-10 text-sm px-6 text-white bg-pink-500 border-0 py-1 focus:outline-none hover:bg-pink-600 rounded active:bg-pink-500 disabled:bg-pink-300' disabled={payBtnDisabled} onClick={pay}>Pay</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout