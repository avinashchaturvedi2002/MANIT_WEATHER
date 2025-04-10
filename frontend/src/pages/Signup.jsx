import weatherlogo from "../assets/cloudy.png"
import { Link } from "react-router-dom";
import { useState } from "react";
const Signup = () => {
  const [formData,setFormData]=useState({fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  number:""})
    const handleChange = (e) => {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSignup = () => {
      const { fname, lname, email, password, cpassword, number } = formData;
  
      if (password !== cpassword) {
        alert("Passwords do not match");
        return;
      }
      
      console.log(formData);
      const users = JSON.parse(localStorage.getItem("users")) || [];

 
  const existingUser = users.find(user => user.email == email);
  if (existingUser) {
    alert("User already exists with this email");
    return;
  }

  
  const newUser = { fname, lname, email, password, number };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful! You can now login.");
  window.location.href = "/";
    };
  return (
    <div className="max-w-4xl max-sm:max-w-lg mx-auto p-6 mt-6 bg-white dark:bg-gray-900 min-h-screen">
      <div className="text-center mb-12 sm:mb-16">
       <img
                 alt="Your Company"
                 src={weatherlogo}
                 className="mx-auto h-10 w-auto"
               />
         <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
          Create your account
        </h2>
      </div>

      <form onSubmit={(e)=>{e.preventDefault()}}>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <label className="text-slate-800 dark:text-slate-200 text-sm font-medium mb-2 block">
              First Name
            </label>
            <input
              name="fname"
              type="text"
              className="bg-slate-100 dark:bg-gray-800 w-full text-slate-800 dark:text-white text-sm px-4 py-3 rounded focus:bg-transparent dark:focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter name" onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-slate-800 dark:text-slate-200 text-sm font-medium mb-2 block">
              Last Name
            </label>
            <input
              name="lname"
              type="text"
              className="bg-slate-100 dark:bg-gray-800 w-full text-slate-800 dark:text-white text-sm px-4 py-3 rounded focus:bg-transparent dark:focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter last name" onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-slate-800 dark:text-slate-200 text-sm font-medium mb-2 block">
              Email Id
            </label>
            <input
              name="email"
              type="text"
              className="bg-slate-100 dark:bg-gray-800 w-full text-slate-800 dark:text-white text-sm px-4 py-3 rounded focus:bg-transparent dark:focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter email" onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-slate-800 dark:text-slate-200 text-sm font-medium mb-2 block">
              Mobile No.
            </label>
            <input
              name="number"
              type="number"
              className="bg-slate-100 dark:bg-gray-800 w-full text-slate-800 dark:text-white text-sm px-4 py-3 rounded focus:bg-transparent dark:focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter mobile number" onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-slate-800 dark:text-slate-200 text-sm font-medium mb-2 block">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="bg-slate-100 dark:bg-gray-800 w-full text-slate-800 dark:text-white text-sm px-4 py-3 rounded focus:bg-transparent dark:focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter password" onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-slate-800 dark:text-slate-200 text-sm font-medium mb-2 block">
              Confirm Password
            </label>
            <input
              name="cpassword"
              type="password"
              className="bg-slate-100 dark:bg-gray-800 w-full text-slate-800 dark:text-white text-sm px-4 py-3 rounded focus:bg-transparent dark:focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter confirm password" onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-12">
          <button
            type="button"
            className="mx-auto block py-3 px-6 text-sm font-medium tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none" onClick={handleSignup}
          >
            Sign up
          </button>
        </div>
        <p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
          Already a member?{' '}
          <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
