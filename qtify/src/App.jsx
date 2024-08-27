import { useState } from 'react'
import Navbar from './components/Navbar/Navabar'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Hero from './components/Hero/Hero';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Navbar searchData=""/>
      <Hero/>
    </BrowserRouter>
  )
}

export default App
