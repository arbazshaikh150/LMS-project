import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import {Provider} from 'react-redux'
import store from './Redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  // For routing
  // Puri app mai routing kar sakte hai

  // Puri application main redux store activate ho chuka hai
  <Provider store={store}>
  <BrowserRouter>
    <App />
    <Toaster />
  </BrowserRouter>
  </Provider>
)
