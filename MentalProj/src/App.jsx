import { useState } from 'react'
import Person1 from './pages/person1'

import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Person1 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
