import { useState } from "react";
import weatherlogo from "../assets/cloudy.png"
import { Link } from "react-router-dom";
export default function Login() {
  
  const [credentials,setCredentials]=useState({email:"",password:""});
  function handleInputChange(e){
    setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function handleSignIn(){
    const usersdata = JSON.parse( localStorage.getItem('users') );
    console.log(usersdata);
    const finduser=usersdata.find((item)=>{return item.email==credentials.email})
    if(!finduser)
    {
      alert("User not found");
      return;
    }
    else{
      if(finduser.password!=credentials.password)
      {
        alert("Wrong Credentials");
        return;
      }
      else
      {
        console.log(finduser);
        const name=finduser.fname+" "+finduser.lname
        sessionStorage.setItem('name',name)
        window.location.href="/weatherInfo"
        alert(`Welcome ${name}`)
      }
    }

  }
  return (
    
    <div className="flex  min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white dark:bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src={weatherlogo}
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form  method="POST" className="space-y-6" onSubmit={(e)=>e.preventDefault()}>
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border dark:border-gray-600"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border dark:border-gray-600"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleSignIn}
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
          Not a member?{' '}
          <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
