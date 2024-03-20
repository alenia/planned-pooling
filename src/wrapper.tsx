import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Footer from './Footer';
import Preview from './projects/Preview'
import Sunflower from './projects/Sunflower'
import Doodle from './projects/Doodle'
import LogoOption from './projects/LogoOption'
import StretchLengths from './projects/StretchLengths'
import Parallax from './projects/Parallax'
import './index.scss'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/preview",
    element: <Preview/>
  },
  {
    path: "/sunflower",
    element: <Sunflower/>
  },
  {
    path: "/doodle",
    element: <Doodle/>
  },
  {
    path: "/branding-ideas",
    element: <LogoOption/>
  },
  {
    path: "/experimental",
    element: <StretchLengths/>
  },
  {
    path: "/parallax",
    element: <Parallax/>
  },
  {
    path: "/",
    element: <App/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <main className="container">
      <RouterProvider router={router} />
    </main>
    <Footer />
  </React.StrictMode>,
)
