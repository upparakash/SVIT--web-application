import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import { Contact } from 'lucide-react'
import Shop from './pages/Shop'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar />
     
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/shop' element={ <Shop /> } />
    <Route path='/contact' element={ <Contact /> } />
     </Routes>
    </>
  )
}

export default App
