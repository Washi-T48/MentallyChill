import { useState } from 'react'
import Person1 from './pages/person1'
import Person2 from './pages/person2'
import Person3 from './pages/person3'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Person1 />} />
          <Route path='/person1' element={<Person1 />} />
          <Route path='/person2' element={<Person2 />} />
          <Route path='/person3' element={<Person3 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
