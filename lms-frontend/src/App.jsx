import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'

//////// React.dev

// Eslint plugging use!!
// Simple import sort (For sorting the imports and all)
// Import arrange karna important hai(Fix the simple import problem)


// Layout making (app mai hi agar footer aur nav daal diye toh limitation (admin & users)).

// Layout -> component -> special children Props (ek component aa rha hoga as a prop , JSX as a child)

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes> 
        {/* Individual routes */}
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/about' element={<AboutUs/>}></Route>

      </Routes>
    </>
  )
}

export default App
