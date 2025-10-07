import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../pages/Forms/Login';
import Register from '../pages/Forms/Register';
import ErrorPage from '../pages/error/ErrorPage';
import Home from '../pages/Home/Home';
import PrimeiroAno from '../pages/materias/PrimeiroAno/PrimeiroAno';
import SegundoAno from '../pages/materias/SegundoAno/SegundoAno';
import TerceiroAno from '../pages/materias/TerceiroAno/TerceiroAno';
import Activities from "../pages/Atividades/Activities";


// Imports das Matérias do Primeiro Ano
import Portugues from "../pages/materias/PrimeiroAno/LinguaPortuguesa/Portugues";
import Artes from "../pages/materias/PrimeiroAno/Arte/Artes";
import Biologia from "../pages/materias/PrimeiroAno/Biologia/Biologia";
import Educfisica from "../pages/materias/PrimeiroAno/Educfisica/Educfisica";
import Filosofia from "../pages/materias/PrimeiroAno/Filosofia/Filosofia";
import Fisica from "../pages/materias/PrimeiroAno/Fisica/Fisica";
import Historia from "../pages/materias/PrimeiroAno/Historia/Historia";
import Ingles from "../pages/materias/PrimeiroAno/Ingles/Ingles";
import Matematica from "../pages/materias/PrimeiroAno/Matematica/Matematica";
import Quimica from "../pages/materias/PrimeiroAno/Quimica/Quimica";
import Sociologia from "../pages/materias/PrimeiroAno/Sociologia/Sociologia";

// Imports das Matérias do Segundo Ano
import Portugues2 from "../pages/materias/SegundoAno/LinguaPortuguesa/Portugues";
import Artes2 from "../pages/materias/SegundoAno/Arte/Artes";
import Biologia2 from "../pages/materias/SegundoAno/Biologia/Biologia";
import Educfisica2 from "../pages/materias/SegundoAno/Educfisica/Educfisica";
import Filosofia2 from "../pages/materias/SegundoAno/Filosofia/Filosofia";
import Fisica2 from "../pages/materias/SegundoAno/Fisica/Fisica";
import Historia2 from "../pages/materias/SegundoAno/Historia/Historia";
import Ingles2 from "../pages/materias/SegundoAno/Ingles/Ingles";
import Matematica2 from "../pages/materias/SegundoAno/Matematica/Matematica";
import Quimica2 from "../pages/materias/SegundoAno/Quimica/Quimica"; 
import Sociologia2 from "../pages/materias/SegundoAno/Sociologia/Sociologia";

// Imports das Matérias do Terceiro Ano
import Portugues3 from "../pages/materias/TerceiroAno/LinguaPortuguesa/Portugues"; 
import Artes3 from "../pages/materias/TerceiroAno/Arte/Artes";
import Biologia3 from "../pages/materias/TerceiroAno/Biologia/Biologia";
import Educfisica3 from "../pages/materias/TerceiroAno/Educfisica/Educfisica";
import Filosofia3 from "../pages/materias/TerceiroAno/Filosofia/Filosofia";
import Fisica3 from "../pages/materias/TerceiroAno/Fisica/Fisica";
import Historia3 from "../pages/materias/TerceiroAno/Historia/Historia";
import Ingles3 from "../pages/materias/TerceiroAno/Ingles/Ingles";
import Matematica3 from "../pages/materias/TerceiroAno/Matematica/Matematica";
import Quimica3 from "../pages/materias/TerceiroAno/Quimica/Quimica"; 
import Sociologia3 from "../pages/materias/TerceiroAno/Sociologia/Sociologia";


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
        <Route path="/atividades" element={<Activities />} />


        {/* -- ROTAS PRIMEIRO ANO -- */}
        <Route path="/primeiroAno/portugues" element={<Portugues />} />
        <Route path="/primeiroAno/artes" element={<Artes />} />
        <Route path="/primeiroAno/biologia" element={<Biologia />} />
        <Route path="/primeiroAno/educfisica" element={<Educfisica />} />
        <Route path="/primeiroAno/filosofia" element={<Filosofia />} />
        <Route path="/primeiroAno/fisica" element={<Fisica />} />
        <Route path="/primeiroAno/historia" element={<Historia />} />
        <Route path="/primeiroAno/ingles" element={<Ingles />} />
        <Route path="/primeiroAno/matematica" element={<Matematica />} />
        <Route path="/primeiroAno/quimica" element={<Quimica />} />
        <Route path="/primeiroAno/sociologia" element={<Sociologia />} />


        {/* -- ROTAS SEGUNDO ANO -- */}
        <Route path="/segundoAno/portugues" element={<Portugues2 />} />
        <Route path="/segundoAno/artes" element={<Artes2 />} />
        <Route path="/segundoAno/biologia" element={<Biologia2 />} />
        <Route path="/segundoAno/educfisica" element={<Educfisica2 />} />
        <Route path="/segundoAno/filosofia" element={<Filosofia2 />} />
        <Route path="/segundoAno/fisica" element={<Fisica2 />} />
        <Route path="/segundoAno/historia" element={<Historia2 />} />
        <Route path="/segundoAno/ingles" element={<Ingles2 />} />
        <Route path="/segundoAno/matematica" element={<Matematica2 />} />
        <Route path="/segundoAno/quimica" element={<Quimica2 />} />
        <Route path="/segundoAno/sociologia" element={<Sociologia2 />} />


        {/* -- ROTAS TERCEIRO ANO -- */}
        <Route path="/terceiroAno/portugues" element={<Portugues3 />} />
        <Route path="/terceiroAno/artes" element={<Artes3 />} />
        <Route path="/terceiroAno/biologia" element={<Biologia3 />} />
        <Route path="/terceiroAno/educfisica" element={<Educfisica3 />} />
        <Route path="/terceiroAno/filosofia" element={<Filosofia3 />} />
        <Route path="/terceiroAno/fisica" element={<Fisica3 />} />
        <Route path="/terceiroAno/historia" element={<Historia3 />} />
        <Route path="/terceiroAno/ingles" element={<Ingles3 />} />
        <Route path="/terceiroAno/matematica" element={<Matematica3 />} />
        <Route path="/terceiroAno/quimica" element={<Quimica3 />} />
        <Route path="/terceiroAno/sociologia" element={<Sociologia3 />} />


        {/* -- ROTA DE ERRO -- */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
