import './App.css'
import {CreateBrowserRouter, Router, RouterProvider} from 'react-router'

import Home from './Components/Home/Home'
import About from './pages/About'
import Post from './pages/Post'
import Layout from './Layout'

function App() {
  const router = CreateBrowserRouter([
    {
      path:"/",
      element: <Layout/>,
      children: [
        { 
          index: true,
          element: <Home/>
        },
        { 
          path: "about",
          element: <About/>
        },
        {
          path: "post/id",
          element: <Post/>
        },
        {
          path:"post",
          element: <Post/>
        }
      ]
    }
  ])

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
