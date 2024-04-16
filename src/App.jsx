// styles
import './App.css'
// react router
import { BrowserRouter, Routes, Route} from 'react-router-dom'
// components
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
// pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <div className="container">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/about' element={<About/>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
