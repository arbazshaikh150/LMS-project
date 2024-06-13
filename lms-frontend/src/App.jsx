import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import CourseList from './Pages/Course/CourseList'

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
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/courses' element={<CourseList/>}></Route>


        {/* Unknown route */}
        <Route path='*' element={<NotFound/>}></Route>

      </Routes>
    </>
  )
}

export default App
