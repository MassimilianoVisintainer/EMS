import './App.css'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent'

function App() {

  return (
    <>
    <BrowserRouter>
    <HeaderComponent />
      <Routes>
        <Route path='/' element ={<ListEmployeeComponent/>}></Route>
        <Route path='/employees' element ={<ListEmployeeComponent/>}></Route>
        <Route path='/addEmployee' element ={<EmployeeComponent/>}></Route>
        <Route path='/updateEmployee/:id' element ={<EmployeeComponent/>}></Route>
      </Routes>
      <FooterComponent />
     </BrowserRouter>
    </>
    
  )
}

export default App
