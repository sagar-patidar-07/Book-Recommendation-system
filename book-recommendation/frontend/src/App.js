import React from 'react'
import Navbar from './components/Navbar'
import Books from './components/Books'
import BooksYear from './components/Books-year'
import Search from './components/Search'
import LandingPage from './components/Landing Page'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <Navbar/>
      <LandingPage/>
      <Search/>
      <Books/>
      <BooksYear/>
      <Footer/>
    </div>
  )
}

export default App