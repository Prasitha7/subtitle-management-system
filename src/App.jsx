import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import NavBar from "./components/NavBar/NavBar"
import Home from "./pages/Home";
import Media from "./pages/Media";
import Publishers from "./pages/Publishers";

function App() {

  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/media' element={<Media/>}/>
        <Route path='/publishers' element={<Publishers/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
