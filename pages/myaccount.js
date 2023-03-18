import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyAccount = () => {
  const router = useRouter();

  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [pincode, setPincode] = useState('')
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');

    const handleChange = async (e)=>{
        if(e.target.name == "name"){
            setName(e.target.value)
        }
        else if(e.target.name == "address"){
            setAddress(e.target.value)
        }
        else if(e.target.name == "phone"){
            setPhone(e.target.value)
        }
        else if(e.target.name == "pincode"){
            setPincode(e.target.value);
        }
        else if(e.target.name == "password"){
          setPassword(e.target.value);
        }
        else if(e.target.name == "cpassword"){
          setCpassword(e.target.value);
        }
    }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
    fetchUser(token)
  }, []);

  const fetchUser = async (token)=>{
    
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
        },
        body : JSON.stringify({ "token": token })
    });

    let response = await res.json()
    console.log(response)
    
    if (response.success) {
      setName(response.data.name)
      setEmail(response.data.email)
      setPhone(response.data.phone)
      setPincode(response.data.pincode)
      setAddress(response.data.address)
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
    }
}
  const updateUserDetail = async (token)=>{

    let updatedata = {name, phone, pincode, address}
    console.log(" i am here")
    console.log(updatedata, token, typeof token , typeof updatedata, )
    console.log(JSON.stringify({"token": token, "updatedata": updatedata}))
    
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuserdata`, {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
        },
        body : JSON.stringify({ "token": token, "updatedata": updatedata})
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
    }
}

  const updatePassword = async (token)=>{

    let newPassword = {password, cpassword}
    if(password == cpassword){
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
        },
        body : JSON.stringify({ token, newPassword })
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
        
    }
    }
    else{
      toast.error("Please Enter Same Password", {
        position: "top-left",
        autoclose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    }
}

  return (
    <div className="container block mx-auto  px-5 md:w-[90%]">
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
      <div className="MYACCOUNT mt-10">
        <h1 className="text-pink-500 text-center font-bold text-2xl underline">My Account</h1>

        <div className="flex flex-col mx-auto">                
                <h2 className='my-2 text-xl pb-4'>1. Address Details</h2>
                <div className="flex flex-row space-x-2 pb-6">
                    <input onChange={handleChange} value={name} placeholder="Name" type="text" name="name" id="name" className='w-1/2 border border-gray-400 px-2 py-2 rounded outline-none' />
                    <input value={email} placeholder="Email" type="email" name="email" id="email" className='w-1/2 border text-gray-600 border-gray-400 px-2 py-2 rounded outline-none' readOnly />
                </div>
                <div className="flex flex-row pb-6">
                    <textarea onChange={handleChange} value={address} placeholder="Address" name="address" id="address" cols="30" rows="5" className='w-full border border-gray-400 px-2 py-2 rounded outline-none'></textarea>
                </div>
                <div className="flex flex-row space-x-2 pb-6">
                    {/* <label htmlFor="name">Name</label> */}
                    <input onChange={handleChange} value={phone} placeholder="Phone" type="number" id="phone" name="phone" className='w-1/2 border border-gray-400 px-2 py-2 rounded outline-none' />
                    <input onChange={handleChange} value={pincode} placeholder="Pincode" type="number" name="pincode" id="pincode" className='w-1/2 border border-gray-400 px-2 py-2 rounded outline-none' />
                </div>
            </div>
            <button className='mx-1 h-10 text-sm px-3 text-white bg-green-600 border-0 py-1 focus:outline-none hover:bg-green-600 rounded active:bg-pink-500 disabled:bg-pink-300' onClick={()=>{updateUserDetail(localStorage.getItem("token"))}}>Update Details</button>


            <div className="flex flex-col mx-auto mt-2">                
              <h2 className='my-2 text-xl pb-4'>2. Update your Password</h2>
                <div className="flex flex-row space-x-2 pb-6">
                    {/* <label htmlFor="name">Name</label> */}
                    <input onChange={handleChange} value={password} placeholder="Password" type="password" id="password" name="password" className='w-1/2 border border-gray-400 px-2 py-2 rounded outline-none' />
                    <input onChange={handleChange} value={cpassword} placeholder="Confirm password" type="password" name="cpassword" id="cpassword" className='w-1/2 border border-gray-400 px-2 py-2 rounded outline-none' />
                </div>
          </div>
            <button className='mx-1 h-10 text-sm px-3 text-white bg-green-600 border-0 py-1 focus:outline-none hover:bg-green-600 rounded active:bg-pink-500 disabled:bg-pink-300' onClick={()=>{updatePassword(localStorage.getItem("token"))}}>Update Password</button>
        </div>
    </div>
  );
};

export default MyAccount;
