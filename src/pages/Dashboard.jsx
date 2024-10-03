import { useEffect, useRef, useState } from "react"
// import {  useEffect} from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { db , auth } from "./config";
import { auth , db } from "../config";
import { addDoc, collection,
    getDoc,
    getDocs,
    orderBy,
      query,
      serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";


const Dashboard = () => {
    const [blog , setBlog] = useState([])
    const titleVal = useRef()
    const descVal = useRef()
    const myObj = {}
    const [userCheck , setUserCheck] = useState(false)
  const [hambrgr , setHambrgr] = useState(true)


  const saveData = async ()=> {
  
    try {
        const docRef = await addDoc(collection(db, "blogs"), {
        Title : myObj.Title,
        Description : myObj.Description,
        postTime: serverTimestamp() ,        
        uid: auth.currentUser.uid
      });  
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const postTime = data.postTime.toDate(); // Convert Firestore timestamp to JavaScript Date
      
        console.log("Post Time (Date format):", postTime);
      } else {
        console.log("No such document!");
      }


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
      console.log();
      
      
      blog.push(formattedData);
            setBlog([...blog])
            console.log(blog); 
    });
  } //..getData func ended ..//

  useEffect(() => {
    onAuthStateChanged(auth, (user) =>{
        if(user){
            console.log("user hai");
            setUserCheck(true)
        }else{
            console.log("user ni hai");            
        }
    })
    getData()
  } , [])

const addBlog = (event) =>{
    event.preventDefault();
myObj.Title = titleVal.current.value ;
myObj.Description = descVal.current.value ;

blog.push(myObj)
setBlog([...blog])
console.log();
saveData()

titleVal.current.value = null
descVal.current.value = null
}

const showBrgr = () => {
  hambrgr ? setHambrgr(false) : setHambrgr(true)
}

  return (
    <>
     {/* new nav  */}
<nav className="shadow-lg shadow-blue-300/50 bg-gray-900 bg-opacity-20 border-b-2 border-teal-300">
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
          <button type="button" ><Link className="block py-auto px-3 md:p-0 hover:text-teal-400  text-teal-400 duration-200 md:bg-transparent " to="/">Dashboard</Link></button>
    
          </li>
          <li>
          <button type="button" ><Link className="block py-2 px-3 md:p-0 hover:text-teal-400 text-teal-200" to="/myblogs">My Blogs</Link></button>
          </li>
          <li>
          <button type="button" ><Link className="block py-2 px-3 md:p-0 hover:text-teal-400 text-teal-200 rounded md:bg-transparent " to="/myblogs">My Blogs</Link></button>
          </li>
        </ul>
      </div> : null}
      



    </div>

</nav>

{/* ... */}

    <div className="bg-zinc-50 min-h-screen max-h-full py-7">
        {userCheck ? <div className="text-center w-auto mx-auto  rounded-xl py-8 px-10">
<form onSubmit={addBlog} className="bg-zinc-400 shadow-lg py-3 px-3 rounded-lg">

<input ref={titleVal} type="text" placeholder="Place Holder." className="px-5 bg-gray-200 rounded" />
    {/* <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Your message</label> */}
    <textarea ref={descVal} id="message" rows="4" className="my-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Your message..."></textarea>
    <button type="submit" className="text-zinc-100 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Publish</button>
</form>
    </div> : null}
    <h1 className="text-2xl text-center font-semibold pb-2">All Blogs</h1>
  
    
    {blog.map((item , index)=>{
        return <div key={index} className=" bg-gray-300 bg-opacity-60 shadow-lg my-4 border border-slate-500 border-opacity-30 rounded-lg p-3 py-auto mx-10  text-left"> 
         <header>
    <address className="flex items-center mb-6 not-italic">
                  <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                      <img className="mr-4 w-16 h-16 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Jese Leos" />
                      <div>
                          <a href="#" rel="author" className="text-xl font-semibold text-gray-800">Jese Leos</a>
                          <p className="text-base text-gray-600 ">Graphic Designer, educator & CEO Flowbite</p>
                          <p className=" text-gray-500 ">{item.postTime.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
              
                  </div>
              </address>
              <article className="prose lg:prose-xl">
  <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-800 lg:mb-6 lg:text-4xl ">{item.Title}</h1>
  <p className="lead font-sans text-gray-600">{item.Description}
    For years parents have espoused the health benefits of eating garlic bread with cheese to their
    children, with the food earning such an iconic status in our culture that kids will often dress
    up as warm, cheesy loaf for Halloween.
  </p>
  
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