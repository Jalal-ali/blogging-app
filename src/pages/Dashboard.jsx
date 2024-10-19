import { useEffect, useRef, useState } from "react"
// import {  useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
// import { db , auth } from "./config";
import { auth , db,
  //  storage
   } from "../config";
import { addDoc, collection,
    // getDoc,
    getDocs,
    orderBy,
      query,
      serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";
// import { getDownloadURL, listAll, ref } from "firebase/storage";


const Dashboard = () => {

  const [blog , setBlog] = useState([])
    const titleVal = useRef()
    const descVal = useRef()
    const myObj = {}
    const [userCheck , setUserCheck] = useState(false)
  const [hambrgr , setHambrgr] = useState(true)

  
  
  // get profile 



// check user 
useEffect(() => {
  
  getData()
  
  onAuthStateChanged(auth, (user) =>{
    if(user){
      console.log(user.email);
      setUserCheck(true)
        }else{
            console.log("user ni hai");            
        }
    })
  } , [])

  // .... 


  
  // .toDate();    
  const saveData = async ()=> {
  
    try {
        const docRef = await addDoc(collection(db, "blogs"), {
        Title : myObj.Title,
        Description : myObj.Description ,
        postTime: serverTimestamp() ,        
        uid: auth.currentUser.uid
      });  

      console.log(myObj.Title + " pushed " + "Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  //func getData from fire base
 async function getData() {
    const q = query(collection(db, "blogs"),orderBy('postTime' , 'asc'))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {  
      const data = doc.data();
      console.log(data);
      
      const postTimeDate = data.postTime.toDate();    
      const formattedData = {
        ...data,
        postTime: postTimeDate, // Replace postTime with JS Date object
      };
      blog.push(formattedData);
            setBlog([...blog])
            console.log(blog); 
    });
  } //..getData func ended ..//



const addBlog = (event) =>{
    event.preventDefault();
    
myObj.Title = titleVal.current.value ;
myObj.Description = descVal.current.value ;
myObj.postTime = new Date();

blog.push(myObj)
setBlog([...blog])
console.log();
saveData()

titleVal.current.value = null
descVal.current.value = null
}

const showBrgr = () => {
  setHambrgr(!hambrgr)
}



  return (
    <>
     {/* new nav  */}
<nav className="shadow-lg shadow-indigo-300 bg-gray-300 bg-opacity-30 border-b-2 border-gray-300 ">
    <div className="max-w-screen-xl flex flex-wrap place-content-end xl:place-content-center lg:place-content-center md:place-content-center  text-center lg:py-3 md:py-3 xl:py-3">
    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
  {/* new hamburger */}
  <button onClick={showBrgr} className="md:hidden relative group me-4">
        <div className="relative flex flex-col overflow-hidden items-center justify-center rounded-lg my-2 w-[50px] h-[50px] transform transition-all bg-slate-30 ring-[#ADEFD1FF] hover:ring-2 group-focus:ring-2 ring-opacity-30 duration-200 shadow">
          <div className="transform transition-all duration-150 overflow-hidden -translate-y-5 group-focus:translate-y-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce text-[#00203FFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </div>

          <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden -translate-y-3">
            <div className="bg-[#00203FFF] mb-1.5 h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-y-6"></div>
            <div className="bg-[#00203FFF] mb-1.5 h-[2px] w-4 rounded transform transition-all duration-300 group-focus:translate-y-6 delay-75"></div>
            <div className="bg-[#00203FFF] h-[2px] w-3 transform transition-all duration-300 origin-left group-focus:translate-y-6 delay-100"></div>
          </div>
        </div>
      </button>
        {/* .... */}
      {/* <button  id="hambrgr" data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center me-4 justify-center my-1 w-10 h-10 text-sm text-[#00203FFF] rounded-lg  ring-slate-500 ring-1 hover:text-gray-500" aria-controls="navbar-cta" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button> */}
      </div> 
        <div id="hdnli" className={hambrgr ? "hidden align-middle items-center justify-center mx-3 w-full md:flex md:w-auto md:order-1" : "align-middle items-center justify-center mx-3 mb-2 w-full md:flex md:w-auto md:order-1"} itemID="navbar-cta">
        <ul className="flex flex-col align-middle font-semibold md:py-auto border-2 border-[#00203FFF] rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
          <li>
          <button type="button" ><Link className={hambrgr ? "block py-auto px-3 md:p-0 hover:text-teal-400  text-indigo-500 duration-200 md:bg-transparent " : "block py-auto px-3 md:p-0 hover:bg-gray-300 my-1 p-1 text-[#1c5084]  rounded bg-gray-300 duration-200 md:bg-transparent "} to="/">Dashboard</Link></button>
    
          </li>
          <li>
          <button type="button" ><Link className={hambrgr ? "block py-auto px-3 md:p-0 hover:text-teal-400  text-indigo-500 duration-200 md:bg-transparent " : "block py-auto px-3  md:p-0 hover:bg-gray-300 rounded p-1 text-[#1c5084] duration-200 md:bg-transparent "} to="/myblogs">My Blogs</Link></button>
          </li>
          <li>
          <button type="button" ><Link className={hambrgr ? "block py-auto px-3 md:p-0 hover:text-teal-400  text-indigo-500 duration-200 md:bg-transparent " : "block py-auto px-3 my-1 md:p-0  hover:bg-gray-300 rounded p-1  text-[#1c5084] duration-200 md:bg-transparent "} to="/profile">Profile</Link></button>
          </li>
        </ul>
      </div> 
      



    </div>

</nav>
{/* ... */}



    <div className="bg-zinc-50 min-h-screen max-h-full py-7">
        {userCheck ? <div className="text-center w-auto mx-auto  rounded-xl py-8 px-10">
<form onSubmit={addBlog} className="bg-[#001f3fc9] shadow border-t-2 border-b-2 border-[#5faa88] shadow-[#ADEFD1FF] py-3 px-3 rounded-lg">

<input ref={titleVal} type="text" placeholder="Place Holder." className="px-5 bg-gray-200 rounded" />
    {/* <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Your message</label> */}
    <textarea ref={descVal} id="message" rows="4" className="my-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Your message..."></textarea>
    <button type="submit" className="text-zinc-100 bg-gradient-to-b from-[#295580] to-[#00203FFF] hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-[#336393] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Publish</button>
</form>
    </div> : null}
    <h1 className="text-2xl text-center font-semibold pb-2">All Blogs</h1>
  
    
    {blog.map((item , index)=>{
        return <div key={index} className=" bg-gray-300 bg-opacity-60 shadow-lg my-4 border border-slate-500 border-opacity-30 rounded-lg p-3 py-auto mx-10  text-left"> 
         <header>
    <address className="flex items-center mb-6 not-italic">
                  <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                      <img className="mr-4 w-16 h-16 rounded-full" alt="Jese Leos" />
                      <div>
                          <a href="#" rel="author" className="text-xl font-semibold text-gray-800">User Name</a>
                          <p className="text-base text-gray-600 ">User info</p>
                          <p className=" text-gray-500 ">{item.postTime.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
              
                  </div>
              </address>
              <article className="prose lg:prose-xl">
  <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-800 lg:mb-6 lg:text-4xl ">{item.Title}</h1>
  <p className="lead font-sans text-gray-600">{item.Description}</p>
  
</article>
<button className="my-3 "><Link className=" text-teal-500 hover:text-teal-400 font-semibold p-2">See all from this user</Link></button>

    </header>
          </div>
    })}
    </div>
    </>
  )
}

export default Dashboard