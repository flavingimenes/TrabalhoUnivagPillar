require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Routers
const authRoutes = require('./routes/auth.routes');
const contentRoutes = require('./routes/content.routes');
const quizRoutes = require('./routes/quiz.routes');
const annotationsRoutes = require('./routes/annotations.routes');
const userRoutes = require('./routes/user.routes');

// Middlewares
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Healthcheck
app.get('/', (req, res) => {
    res.send('API do sistema de login está funcionando!');
});

// Mount routes (prefixes preserved)
app.use('/content', contentRoutes);          // /content/home
app.use('/api/quiz', quizRoutes);           // /api/quiz/...
app.use('/api/annotations', annotationsRoutes);
app.use('/api/user', userRoutes);
app.use('/', authRoutes);                   // /register e /login

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
