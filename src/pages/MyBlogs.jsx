import { useEffect, useState } from "react"
// import {  useEffect} from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { db , auth } from "./config";
import { auth , db } from "../config";
import { collection, 
    getDocs,
    orderBy,
      query, } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
const MyBlogs = () => {

    const [blog , setBlog] = useState([])
    const [hambrgr , setHambrgr] = useState(true)



      //func getData from fire base
 async function getData() {

    const q = query(collection(db, "blogs"),orderBy('postTime' , 'asc'))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => { 
        if(auth.currentUser.uid == doc.data().uid )        
            blog.push(doc.data())
            setBlog([...blog])
            console.log(blog);
    });
  } //..getData func ended ..//

  useEffect(() => {
    onAuthStateChanged(auth, (user) =>{
        if(user){
            console.log("user hai");
        }else{
            console.log("user ni hai");            
        }
    })
    getData()
  } , [])
  const showBrgr = () => {
    hambrgr ? setHambrgr(false) : setHambrgr(true)
  }
  

  return (
    <>
     {/* new nav  */}
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
      <div className="bg-zinc-300 min-h-screen max-h-full py-7">    
    <h1 className="text-2xl text-center font-semibold pb-2">My Blogs</h1>
    {blog.map((item , index)=>{
        return <div key={index} className="bg-zinc-50 bg-opacity-40 shadow-lg my-2 border-b border-t border-slate-500 rounded-lg p-3 mx-12 text-left"> 
        <h1 className="text-2xl font-semi-bold font-serif first-letter:uppercase">{item.Title}</h1> <p className="font-sans text-lg first-letter:uppercase text-gray-500">{item.Description}</p></div>
    })}
    </div>
    </>
  )
}

export default MyBlogs