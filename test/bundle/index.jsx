import React from 'react'
import ReactDOM from 'react-dom'
import { App } from '../views/index.jsx'

ReactDOM.hydrate(<App />, document.querySelector('main'))
