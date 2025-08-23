import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router'
import Home from './Pages/Home'
import Single from './Pages/Single'
import Detail from './Pages/Detail'
import '@fortawesome/fontawesome-free/css/all.css';
import Cart from './Pages/Cart'

function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
   <Route path='/Single/:Dishes' element={<Single/>}/>
   <Route path='/Detail/:id' element={<Detail/>}/>
   <Route path="/Cart" element={<Cart/>} /> 
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App

