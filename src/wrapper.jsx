import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Preview from './projects/Preview.jsx'
import Sunflower from './projects/Sunflower.jsx'
import Doodle from './projects/Doodle.jsx'

//import './index.css'

const router = () => {
  switch (window.location.pathname) {
    case "/preview":
      return Preview;
    case "/sunflower":
      return Sunflower;
    case "/doodle":
      return Doodle;
    default:
    return App;
  }
}

const Main = router();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)
