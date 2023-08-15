import React from 'react'
import Home from "./Routes/Home"
import Edit from "./Routes/Edit"
import Detail from "./Routes/Detail"

import {Routes,Route} from "react-router-dom"
const App = () => {
  return (
    <div className='container'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/restaurant/:id" element={<Detail/>}/>
        <Route path="/restaurant/:id/update" element={<Edit/>}/>
      </Routes>
    </div>
  )
}

export default App