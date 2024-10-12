import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
// import Signup from './pages/signup.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import MyBlogs from './pages/MyBlogs.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    element : <Layout/>,
    children :[
      {
        path : "",
        element : <Dashboard />
      },
      {
        path : "myblogs",
        element : <MyBlogs />
      },
      {
        path : "dashboard",
        element : <Dashboard />
      },
      {
        path : "login" ,
        element : <Login />
      },
      {
        path : "signup",
        element : <Register />
      },
      {
        path : "*" ,
        element : <h1>Not Found.</h1>
      },{
        path : "profile" ,
        element : <Profile />
      }
      
    ]
  }
])

createRoot(document.getElementById('root')).render(
  
  <RouterProvider router={router}>
  </RouterProvider>,
)
