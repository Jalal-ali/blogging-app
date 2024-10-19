import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../config';
import { useEffect, useState } from 'react';
const Navbar = () => {


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


    <nav className="shadow-lg shadow-indigo-300/50 bg-black">
    
    <div className="max-w-screen-xl flex  text-center justify-between mx-3 py-2">
<p className=' my-3 text-[#ADEFD1FF] xl:text-xl cursor-pointer first-letter:uppercase text-md font-light text-center'>{email}</p>
<div className='flex'>
{/* <button type="button" ><Link className="text-white bg-gradient-to-b from-[#00203f] via-slate-700 to-[#00203f] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-[#001f3fcf] dark:focus:ring-[#001f3fb1] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" to="/dashboard">Home</Link></button> */}
          {sign ? <div>
          <button type="button" ><Link className="text-white bg-gradient-to-br from-[#00203f] to-slate-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-1" to="login">SignIn</Link></button>
              <button type='button'><Link className="relative p-0.5 inline-flex me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-bl from-[#00203f] to-slate-400 group-hover:from-[#00203f] group-hover:to--[#00203f] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"  aria-current="page" to="signup"><span className="relative p-2 px-3.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Sign-Up
</span></Link></button>
          </div> : <button onClick={logout} type="button" className="my-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2">Logout</button> }
</div>


        </div>
    </nav>

   

    </>
  )
}

export default Navbar