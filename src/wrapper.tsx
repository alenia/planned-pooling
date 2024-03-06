import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Preview from './projects/Preview'
import Sunflower from './projects/Sunflower'
import Doodle from './projects/Doodle'
import './index.scss'

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)
