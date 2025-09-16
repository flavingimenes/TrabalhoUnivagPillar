import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './routes/Login'
import Register from './routes/Register'
import ErrorPage from './routes/ErrorPage'

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