import React from 'react'
import {createRoot,ReactDom} from 'react-dom/client'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import storeSetUp from './store/storeSetUp'
import { Provider } from 'react-redux'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

const store = storeSetUp()
console.log(store)
root.render(
  <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
  </BrowserRouter>
)