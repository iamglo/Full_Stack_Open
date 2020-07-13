import React from 'react'
import ReactDOM from 'react-dom'
import Routing from './Routing'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Routing></Routing>
    </Provider>
  </Router>, document.getElementById('root'))