import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../header/Header'
import { Footer } from '../footer/Footer'

export const Layout = ({ openLogin, openSignup }) => {
  return (
    <>
    <Header openLogin={openLogin} openSignup={openSignup}/>
   <Outlet></Outlet>
   <Footer/>
   </>
  )
}
