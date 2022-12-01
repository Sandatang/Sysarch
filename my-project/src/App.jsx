import React from 'react'
import { DB_table, Login, WebcamCapture } from './component'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App = () => {

  return (
    <>
    {/* <UserContext.Provider> */}
      <Router>
      <Routes>
          <Route index element={<Login/>}/>
          <Route path='/table' element={<DB_table/>}/>
          <Route path='/webcam' element={<WebcamCapture/>}/>
          
      </Routes>
      </Router>
    {/* </UserContext.Provider> */}
    
    </>
  )
}

export default App