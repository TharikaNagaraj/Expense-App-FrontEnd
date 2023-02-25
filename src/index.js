import React from 'react'
import {createRoot,ReactDom} from 'react-dom/client'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
root.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
)