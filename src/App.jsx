import './App.css'


import {Outlet} from "react-router-dom";

function App() {

  return (
    <>
    <div className='welcome'>
      <h1>Bem-Vindo ao <strong className='anton-black-regular'>Pillar</strong></h1>
    </div>
      <Outlet />
    </>
  )
}

export default App
