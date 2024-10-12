 import { auth} from "../config";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";


const Profile = () => {
const navigate = useNavigate()

useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(auth.currentUser.uid);
            
          } else {     
            navigate("/login")
          }
        });
      } , [])




    const [hambrgr , setHambrgr] = useState(true)
    const showBrgr = () => {
        hambrgr ? setHambrgr(false) : setHambrgr(true)
      }


  
  


  return (
    <>
    <nav className="shadow-lg shadow-indigo-300 bg-zinc-900 ">
    <div className="max-w-screen-xl flex flex-wrap place-content-end xl:place-content-center lg:place-content-center md:place-content-center  text-center xl:py-3 lg:py-4">
    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
  
        
      <button onClick={showBrgr} id="hambrgr" data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center me-2 my-2 justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </div> 
      {hambrgr ? <div id="hdnli" className="align-middle items-center justify-center my-2 mx-3 w-full md:flex md:w-auto md:order-1" itemID="navbar-cta">
        <ul className="flex flex-col align-middle font-semibold p-3 md:p-0 border border-[#36e6c2] rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
          <li>
          <button type="button" ><Link className="block py-auto px-3 md:p-0 hover:text-teal-400  text-indigo-500 duration-200 md:bg-transparent " to="/">Dashboard</Link></button>
    
          </li>
          <li>
          <button type="button" ><Link className="block py-2 px-3 md:p-0 hover:text-teal-400 text-indigo-500" to="/myblogs">My Blogs</Link></button>
          </li>
          <li>
          <button type="button" ><Link className="block py-2 px-3 md:p-0 hover:text-teal-400 text-indigo-500 rounded md:bg-transparent " to="/profile">Profile</Link></button>
          </li>
        </ul>
      </div> : null}
      



    </div>

</nav>
{/* ... */}
    <h1>Profile</h1>
    <div>
      <h2>Firebase File Upload</h2>
      
    
    </div>

    </>

  )
}

export default Profile








  


