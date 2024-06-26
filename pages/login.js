import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let router = useRouter()

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const data = {
      "email": email,
      "password": password
    }

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
      },
      body : JSON.stringify(data)
    });
    
    let response = await res.json();
    if (response.success) {
      localStorage.setItem("token", response.token)
      toast.success(response.msg, {
        position: "top-right",
        autoclose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push("/")
      }, 4000);
    }
    else{
      toast.error(response.error, {
        position: "top-right",
        autoclose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setEmail("")
    setPassword("")
  }

  const handleChange = (e)=>{
    if(e.target.name == "email"){
      setEmail(e.target.value)
    }
    else if(e.target.name == "password"){
      setPassword(e.target.value)
    }
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push("/")
    }
  }, [])
  


  return (
    <div>
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
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="flex w-full justify-center items-center space-x-2">
              <Image className=" h-12 w-auto" src="/image/logo.png" alt="Your Company" width={555} height={555} />
              <span className="text-pink-500 text-2xl font-bold ">Shopwears.com</span>
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Login to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link href="/signup" className="ml-2 font-medium text-pink-600 hover:text-pink-500">Create a new account</Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input value={email} onChange={handleChange} id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm" placeholder="Email address" />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm" placeholder="Password" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>

              <div className="text-sm">
                <Link href="/forgot" className="font-medium text-pink-600 hover:text-pink-500">Forgot your password?</Link>
              </div>
            </div>

            <div>
              <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">

                  <svg className="h-5 w-5 text-pink-500 group-hover:text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                </span>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login