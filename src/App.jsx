import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Forms/Login'
import Register from './pages/Forms/Register'
import ErrorPage from './pages/error/ErrorPage'
import Home from './pages/Home/Home'
import Materias from './pages/materias/Materias'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/materias" element={<Materias />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App