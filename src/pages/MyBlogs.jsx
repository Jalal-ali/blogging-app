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
const MyBlogs = () => {

    const [blog , setBlog] = useState([])



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
  return (
    <>
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