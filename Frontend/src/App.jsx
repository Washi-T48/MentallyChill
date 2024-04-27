import { useState } from 'react'
import Person1 from './pages/Person1'
import Person2 from "./pages/person2"
import Person3 from "./pages/person3"
import Remark from './pages/remark'
import Remark2 from './pages/remark2'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import FormOption from './pages/formOption'
import FormOption2 from './pages/formOption2'
import CRI_dass21 from './pages/cri_dass21'
import P1_dass21 from './pages/p1_dass21'
import Radio_rate from './pages/radio_rate'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Person1 />} />
          
          <Route path='/person1' element={<Person1 />} />
          <Route path='/person2' element={<Person2 />} />
          <Route path='/person3' element={<Person3 />} />
          <Route path='/remark' element={<Remark/>} />
          <Route path='/remark2' element={<Remark2 />} />
          <Route path='/formOption' element={<FormOption/>} />
          <Route path='/formOption2' element={<FormOption2/>} />
          <Route path='/cri_dass21' element={<CRI_dass21 />} />
          <Route path='/p1_dass21' element={<P1_dass21/>} />
          <Route path='/radio_rate' element={<Radio_rate/>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
