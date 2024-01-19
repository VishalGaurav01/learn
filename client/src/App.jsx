import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/Dashboard" element={<Dashboard />}/>
        <Route path="/Signup" element={<Signup />}/>
        <Route path="/Signin" element={<Signin />}/>
        <Route path="/Projects" element={<Projects />}/>
      </Routes>
    </BrowserRouter>
  )
}
