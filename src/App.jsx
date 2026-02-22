import React from 'react'
import "./App.css";
import Navbar from './Component/Navbar'
import LandingPage from './Component/LandingPage'
import { Routes, Route } from "react-router-dom"
import ApplyForm from './Component/ApplyForm';
import Login from './Component/Login';
import Signup from './Component/Signup';

function App(){
  return(
    <>
      <Navbar/>

      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path='apply'element={<ApplyForm/>}/>
        <Route path="/login" element={<Login/>} />
  <Route path="/signup" element={<Signup/>} />
      </Routes>
    </>
  )
}

export default App