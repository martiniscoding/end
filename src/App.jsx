import React from 'react'
import Home from './components/Home'
import Login from './components/login'
import {Routes , Route } from "react-router-dom"
import Allusers from './components/Allusers'
import EditProfile from './components/EditProfile'


function App() {
  return (
    <div>
      
        <Routes>
          <Route path='/home' element={<Home></Home>}></Route>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/allusers' element={<Allusers></Allusers>}></Route>
          <Route path='/profile' element={<EditProfile></EditProfile>}> </Route>
        </Routes>

    </div>
  )
}

export default App