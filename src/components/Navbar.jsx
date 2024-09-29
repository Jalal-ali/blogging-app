import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../config';
import { useEffect, useState } from 'react';
const Navbar = () => {

  const [outBtn , setOutbtn] = useState(null)
  const [sign , setSign] = useState(null)
  const [email , setEmail] = useState(null)
  const [hambrgr , setHambrgr] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("logged in h");
        setSign(false)
        setOutbtn(true);
          setEmail(user.email);
        // console.log(email);
        
      } else {
        setOutbtn(false);
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
  const showBrgr = () => {
    hambrgr ? setHambrgr(false) : setHambrgr(true)
  }

  return (
    <>
    <nav className="shadow-lg shadow-blue-300/50 bg-black dark:bg-gray-950">
    <div className="max-w-screen-xl flex flex-wrap text-center justify-between mx-auto p-4">
<p className='my-3 text-white xl:text-xl cursor-pointer first-letter:uppercase text-md font-light text-center'>{email}</p>
        <div className="space-x-3 md:space-x-0 rtl:space-x-reverse">
            
          <button onClick={showBrgr} data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
          </button>
        </div>
       {hambrgr ?  <div className="justify-center flex w-full md:flex md:w-auto md:order-1" itemID="navbar-cta">
          
          <button type="button" ><Link className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-3 mb-2" to="/">Dashboard</Link></button>
          <button type="button" ><Link className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-3 mb-2" to="myblogs">My Blogs</Link></button>
          {sign ? <div>
          <button type="button" ><Link className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-1" to="login">SignIn</Link></button>
              <button type='button'><Link className="relative p-0.5 inline-flex me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"  aria-current="page" to="signup"><span className="relative p-2 px-3.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Sign-Up
</span></Link></button>
          </div> : null }
          
        
              
            
{outBtn ? <button onClick={logout} type="button" className="my-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>
: null}

        </div> : null}
        </div>
    </nav>
    </>
  )
}

export default Navbar