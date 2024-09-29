import { useEffect, useRef, useState } from "react"
// import {  useEffect} from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { db , auth } from "./config";
import { auth , db } from "../config";
import { addDoc, collection, 
    getDocs,
    orderBy,
      query, 
      serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";


const Dashboard = () => {
    const [blog , setBlog] = useState([])
    const titleVal = useRef()
    const descVal = useRef()
    const myObj = {}
    const [userCheck , setUserCheck] = useState(false)

const saveData = async ()=> {
    try {
        const docRef = await addDoc(collection(db, "blogs"), {
        Title : myObj.Title,
        Description : myObj.Description,
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
            blog.push(doc.data())
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

  return (
    <>

    <div className="bg-zinc-300 min-h-screen max-h-full py-7">
        {userCheck ? <div className="text-center w-auto mx-auto  rounded-xl py-8 px-10">
<form onSubmit={addBlog} className="bg-zinc-400 shadow-lg py-3 px-3 rounded-lg">

<input ref={titleVal} type="text" placeholder="Place Holder." className="px-5 bg-gray-200 rounded" />
    {/* <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Your message</label> */}
    <textarea ref={descVal} id="message" rows="4" className="my-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Your message..."></textarea>
    <button type="submit" className="border border-indigo-600 shadow text-white p-2 rounded-lg bg-indigo-500">Publish</button>
</form>
    </div> : null}
    <h1 className="text-2xl text-center font-semibold pb-2">All Blogs</h1>
    
    {blog.map((item , index)=>{
        return <div key={index} className="bg-zinc-50 bg-opacity-40 shadow-lg my-2 border-b border-t border-slate-500 rounded-lg p-3 mx-12 text-left"> 
        <h1 className="text-2xl font-semi-bold font-serif first-letter:uppercase">{item.Title}</h1> <p className="font-sans text-lg first-letter:uppercase text-gray-500">{item.Description}</p></div>
    })}
    </div>
    </>
  )
}

export default Dashboard