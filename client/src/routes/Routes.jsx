import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../pages/Forms/Login';
import Register from '../pages/Forms/Register';
import ErrorPage from '../pages/error/ErrorPage';
import Home from '../pages/Home/Home';
import PrimeiroAno from '../pages/materias/PrimeiroAno/PrimeiroAno';
import SegundoAno from '../pages/materias/SegundoAno/SegundoAno';
import TerceiroAno from '../pages/materias/TerceiroAno/TerceiroAno';
import Activities from "../pages/Atividades/Activities";
import Calendario from "../pages/Calendario/calendario.jsx";
import QuizPage from '../pages/Atividades/QuizPage.jsx';
import User from "../pages/Usuário/User.jsx";


// Imports das Matérias do Primeiro Ano
import Portugues from "../pages/materias/PrimeiroAno/LinguaPortuguesa/Portugues.jsx";
import Artes from "../pages/materias/PrimeiroAno/Arte/Artes.jsx";
import Biologia from "../pages/materias/PrimeiroAno/Biologia/Biologia.jsx";
import EducFisica from "../pages/materias/PrimeiroAno/EducFisica/EducFisica.jsx";
import Filosofia from "../pages/materias/PrimeiroAno/Filosofia/Filosofia.jsx";
import Fisica from "../pages/materias/PrimeiroAno/Fisica/Fisica.jsx";
import Historia from "../pages/materias/PrimeiroAno/Historia/Historia.jsx";
import Ingles from "../pages/materias/PrimeiroAno/Ingles/Ingles.jsx";
import Matematica from "../pages/materias/PrimeiroAno/Matematica/Matematica.jsx";
import Quimica from "../pages/materias/PrimeiroAno/Quimica/Quimica.jsx";
import Sociologia from "../pages/materias/PrimeiroAno/Sociologia/Sociologia.jsx";

// Imports das Matérias do Segundo Ano
import Portugues2 from "../pages/materias/SegundoAno/LinguaPortuguesa/Portugues.jsx";
import Artes2 from "../pages/materias/SegundoAno/Arte/Artes.jsx";
import Biologia2 from "../pages/materias/SegundoAno/Biologia/Biologia.jsx";
import EducFisica2 from "../pages/materias/SegundoAno/EducFisica/EducFisica.jsx";
import Filosofia2 from "../pages/materias/SegundoAno/Filosofia/Filosofia.jsx";
import Fisica2 from "../pages/materias/SegundoAno/Fisica/Fisica.jsx";
import Historia2 from "../pages/materias/SegundoAno/Historia/Historia.jsx";
import Ingles2 from "../pages/materias/SegundoAno/Ingles/Ingles.jsx";
import Matematica2 from "../pages/materias/SegundoAno/Matematica/Matematica.jsx";
import Quimica2 from "../pages/materias/SegundoAno/Quimica/Quimica.jsx"; 
import Sociologia2 from "../pages/materias/SegundoAno/Sociologia/Sociologia.jsx";

// Imports das Matérias do Terceiro Ano
import Portugues3 from "../pages/materias/TerceiroAno/LinguaPortuguesa/Portugues.jsx"; 
import Artes3 from "../pages/materias/TerceiroAno/Arte/Artes.jsx";
import Biologia3 from "../pages/materias/TerceiroAno/Biologia/Biologia.jsx";
import EducFisica3 from "../pages/materias/TerceiroAno/EducFisica/EducFisica.jsx";
import Filosofia3 from "../pages/materias/TerceiroAno/Filosofia/Filosofia.jsx";
import Fisica3 from "../pages/materias/TerceiroAno/Fisica/Fisica.jsx";
import Historia3 from "../pages/materias/TerceiroAno/Historia/Historia.jsx";
import Ingles3 from "../pages/materias/TerceiroAno/Ingles/Ingles.jsx";
import Matematica3 from "../pages/materias/TerceiroAno/Matematica/Matematica.jsx";
import Quimica3 from "../pages/materias/TerceiroAno/Quimica/Quimica.jsx"; 
import Sociologia3 from "../pages/materias/TerceiroAno/Sociologia/Sociologia.jsx";


// CONFIGURAR SEGURANÇA DAS ROTAAAASSSS//

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
        <Route path="/quiz/:subjectId" element={<QuizPage />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/usuario" element={<User />} />


        {/* -- ROTAS PRIMEIRO ANO -- */}
        <Route path="/primeiroAno/portugues" element={<Portugues />} />
        <Route path="/primeiroAno/artes" element={<Artes />} />
        <Route path="/primeiroAno/biologia" element={<Biologia />} />
        <Route path="/primeiroAno/educfisica" element={<EducFisica />} />
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
        <Route path="/segundoAno/educfisica" element={<EducFisica2 />} />
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
        <Route path="/terceiroAno/educfisica" element={<EducFisica3 />} />
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
