import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../config';
import { useEffect, useState } from 'react';
import Arrow from "../assets/arrow.svg"
const Navbar = () => {

  
  const [menu , setMenu] = useState(true)
const [isOpen, setIsOpen] = useState(false);
  const [hamburger , setHamburger] = useState(true)
  const [sign , setSign] = useState(null)
  const [email , setEmail] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("logged in h");
        setSign(false)
          setEmail(user.email);
        // console.log(email);
        
      } else {
        setSign(true)        
        // navigate("/login")
      }
    });
  } , [])
 
  const logout = () => {
    signOut(auth).then(() => {
      navigate("/login")
      // console.log("logout hogya");
      setEmail(null)
      
    }).catch((error) => {
      alert("err" , error);
    });
  }

  return (
    <>
    <div>
    <nav className="bg-slate-100 text-black shadow-lg">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16">
      <div className="flex items-center">
        <a href="#" className="flex-shrink-0 flex items-center">
          <img
            className="h-8 w-auto"
            src="https://tailwindflex.com/images/logo.svg"
            alt="Logo"
          />
          <span className="ml-2 text-xl font-bold">Navbar</span>
        </a>
        <div className=" hidden md:ml-6 md:flex md:space-x-8">
          <a
            href="#"
            className="text-black border-b-2 border-indigo-500 px-1 pt-1 inline-flex items-center text-sm font-medium"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-black hover:text-white border-b-2 border-transparent hover:border-gray-300 px-1 pt-1 inline-flex items-center text-sm font-medium"
          >
            Team
          </a>
          <a
            href="#"
            className="text-black hover:text-white border-b-2 border-transparent hover:border-gray-300 px-1 pt-1 inline-flex items-center text-sm font-medium"
          >
            Projects
          </a>
          <a
            href="#"
            className="text-black hover:text-white border-b-2 border-transparent hover:border-gray-300 px-1 pt-1 inline-flex items-center text-sm font-medium"
          >
            Calendar
          </a>
        </div>
      </div>
      <div className="flex items-center">
        {/* Search */}
        <div className="hidden md:flex md:ml-4">
          <div className="relative">
            <input
              type="text"
              className="bg-gray-800 text-white rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
              placeholder="Search..."
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* Profile dropdown */}
        <div className="ml-3 relative hidden md:block">
          <div>
            <button
              type="button"
              className=" flex items-center gap-1 text-sm rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
              onClick={() => setMenu(!menu)}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="h-3 w-3"
              src={Arrow} alt="drop" />
            </button>
          </div>
          {/* Dropdown menu, show/hide based on menu state */}
          <div
            className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${menu && "hidden"}`}
            id="user-menu"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabIndex={-1}
          >
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              tabIndex={-1}
            >
              Your Profile
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              tabIndex={-1}
            >
              Settings
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              tabIndex={-1}
              onClick={logout}
            >
              Sign out
            </a>
          </div>
        </div>
        {/* Mobile menu button */}
        <div className="flex items-center md:hidden ml-4">
        <button
        onClick={() => setHamburger(!hamburger)}
        className="md:hidden relative group me-2 self-end">
  <div
      onClick={() => setIsOpen(!isOpen)}
      className={`relative flex flex-col overflow-hidden items-center justify-center rounded-lg my-2 w-[50px] h-[50px] transform transition-all bg-slate-30 ring-slate-500 hover:ring-2 focus:ring-2 ring-opacity-30 duration-200 shadow cursor-pointer`}
    >
      {/* Arrow Icon */}
      <div
        className={`transform transition-all duration-150 overflow-hidden ${
          isOpen ? "translate-y-3" : "-translate-y-5"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 animate-bounce text-[#00203FFF]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </div>

      {/* Menu Bars */}
      <div
        className={`flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden ${
          isOpen ? "translate-y-6" : "-translate-y-3"
        }`}
      >
        <div
          className={`bg-[#00203FFF] mb-1.5 h-[2px] w-7 transform transition-all duration-300 origin-left ${
            isOpen ? "translate-y-6" : ""
          }`}
        ></div>
        <div
          className={`bg-[#00203FFF] mb-1.5 h-[2px] w-4 rounded transform transition-all duration-300 ${
            isOpen ? "translate-y-6 delay-75" : ""
          }`}
        ></div>
        <div
          className={`bg-[#00203FFF] h-[2px] w-3 transform transition-all duration-300 origin-left ${
            isOpen ? "translate-y-6 delay-100" : ""
          }`}
        ></div>
      </div>
    </div>
      </button>
        </div>
      </div>
    </div>
  </div>
  {/* Mobile menu, show/hide based on menu state */}
  <div className={`md:hidden bg-gray-800 ${hamburger && "hidden"}`} id="mobile-menu">
    <div className="px-2 pt-2 pb-3 space-y-1">
      <a
        href="#"
        className="bg-gray-800 text-white block px-3 py-2 rounded-md text-base font-medium"
      >
        Dashboard
      </a>
      <a
        href="#"
        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
      >
        Team
      </a>
      <a
        href="#"
        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
      >
        Projects
      </a>
      <a
        href="#"
        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
      >
        Calendar
      </a>
    </div>
    {/* Mobile search */}
    <div className="px-2 pt-2 pb-3">
      <div className="relative">
        <input
          type="text"
          className="bg-gray-800 text-white w-full rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search..."
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
    {/* Mobile profile */}
    <div className="pt-4 pb-3 border-t border-gray-700">
      <div className="flex items-center px-5">
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div className="ml-3">
          <div className="text-base font-medium text-white">Tom Cook</div>
          <div className="text-sm font-medium text-gray-400">
            tom@example.com
          </div>
        </div>
      </div>
      <div className="mt-3 px-2 space-y-1">
        <a
          href="#"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
        >
          Your Profile
        </a>
        <a
          href="#"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
        >
          Settings
        </a>
        <a
          href="#"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
        >
          Sign out
        </a>
      </div>
    </div>
  </div>
</nav>


    </div>
    {/* <nav className="shadow-lg shadow-indigo-300/50 bg-black">
    
    <div className="max-w-screen-xl flex  text-center justify-between mx-3 py-2">
<p className=' my-3 text-[#ADEFD1FF] xl:text-xl cursor-pointer first-letter:lowercase text-md font-light text-center'>{email}</p>
<div className='flex'>
          {sign ? <div>
          <button type="button" ><Link className="text-white bg-gradient-to-br from-[#00203f] to-slate-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-1" to="login">SignIn</Link></button>
              <button type='button'><Link className="relative p-0.5 inline-flex me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-bl from-[#00203f] to-slate-400 group-hover:from-[#00203f] group-hover:to--[#00203f] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"  aria-current="page" to="signup"><span className="relative p-2 px-3.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Sign-Up
</span></Link></button>
          </div> : <button onClick={logout} type="button" className="my-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2">Logout</button> }
</div>


        </div>
    </nav> */}
    
    </>
  )
}

export default Navbar