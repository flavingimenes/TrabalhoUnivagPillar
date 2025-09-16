import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Forms/Login'
import Register from './pages/Forms/Register'
import ErrorPage from './pages/error/ErrorPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App