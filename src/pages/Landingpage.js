import React from 'react'
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";


function landingPage() {
  return (
    <div className='header'> 
      <Navbar />
        <div className='header-text-container'>
            <h3>welcome to</h3>
            <h1>fitmeal app</h1>
            <h2>There are many fit recipes to learn and share with fitmeal.</h2>
            <Link to='/signup' className='join-signup'>
              <button className='join-signup-btn'>Start here!</button>
            </Link>
        </div>
    </div>
  )
}

export default landingPage;