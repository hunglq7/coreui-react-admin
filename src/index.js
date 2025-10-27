import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import store from './store'
// import 'primeicons/primeicons.css';
// import { PrimeReactProvider } from 'primereact/api'
// import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'


createRoot(document.getElementById('root')).render(
  // <PrimeReactProvider>
  <Provider store={store}>
    <App />
  </Provider >
  // </PrimeReactProvider>

)
