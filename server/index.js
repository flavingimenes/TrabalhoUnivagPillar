require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// --- Imports das Rotas ---
const authRoutes = require('./routes/auth.routes');
const contentRoutes = require('./routes/content.routes');
const quizRoutes = require('./routes/quiz.routes'); // Nosso arquivo de rotas
const annotationsRoutes = require('./routes/annotations.routes');
const userRoutes = require('./routes/user.routes');

// --- Middlewares ---
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Portas comuns do React/Vite
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// --- Rota de Teste (Healthcheck) ---
app.get('/', (req, res) => {
    res.send('API do Pillar está funcionando!');
});

// --- Definição das Rotas da API ---

app.use('/content', contentRoutes);

// CORREÇÃO AQUI: Mudamos de '/api/quiz' para '/api'.
// Isso faz com que a rota final seja "localhost:3001/api/subjects", que é o que seu front-end busca.
app.use('/api', quizRoutes); 

app.use('/api/annotations', annotationsRoutes);
app.use('/api/user', userRoutes);
app.use('/', authRoutes);

// --- Iniciar Servidor ---
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});