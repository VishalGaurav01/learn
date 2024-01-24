import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'

export default function Main() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route element={<PrivateRoute/>}>
        <Route path="/Dashboard" element={<Dashboard />}/>
        </Route>
        <Route path="/Signup" element={<Signup />}/>
        <Route path="/Signin" element={<Signin />}/>
        <Route path="/Projects" element={<Projects />}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}
