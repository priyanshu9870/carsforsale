import React from 'react'

import Navbar from './Navbar';
import Footer from './Footer'
import { useOutlet } from 'react-router-dom';
const Layout = () => {
    const outlet = useOutlet();
  return (
    <main>
        <Navbar/>
        {outlet}
        <Footer/>
    </main>
  )
}

export default Layout
