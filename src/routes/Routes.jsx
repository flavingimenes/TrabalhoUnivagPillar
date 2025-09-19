import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../pages/Forms/Login';
import Register from '../pages/Forms/Register';
import ErrorPage from '../pages/error/ErrorPage';
import Home from '../pages/Home/Home';
import PrimeiroAno from '../pages/materias/PrimeiroAno/PrimeiroAno';
import SegundoAno from '../pages/materias/SegundoAno/SegundoAno';
import TerceiroAno from '../pages/materias/TerceiroAno/TerceiroAno';


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/primeiroAno" element={<PrimeiroAno />} />
        <Route path="/segundoAno" element={<SegundoAno />} />
        <Route path="/terceiroAno" element={<TerceiroAno />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
