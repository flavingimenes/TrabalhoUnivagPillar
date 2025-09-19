import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../pages/Forms/Login';
import Register from '../pages/Forms/Register';
import ErrorPage from '../pages/error/ErrorPage';
import Home from '../pages/Home/Home';
import Materias from '../pages/materias/Materias';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/materias" element={<Materias />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
