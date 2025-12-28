import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  return (
    <div className="flex flex-col min-h-screen"> 
      <Navbar />

      <div className="flex-grow"> {/* grows to push footer down */}
        <Manager />
      </div>

      <Footer /> 
    </div>
  )
}

export default App
