import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../Pages/LandingPage/LandingPage'

const RoutePages = () => {
  return (
    <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
    </Routes>
  )
}

export default RoutePages