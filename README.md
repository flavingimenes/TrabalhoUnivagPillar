<h1 align="center">
  📚 Pillar - Plataforma de Estudos Adaptativa
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white" alt="MariaDB">
</p>

<p align="center">
  Plataforma de estudos adaptativa focada em alunos do Ensino Médio, com quizzes inteligentes, análise de desempenho e reforço automático baseado nas dificuldades do estudante.
</p>

---

## 📌 Sobre o Projeto

O **Pillar** é uma aplicação web desenvolvida com o objetivo de tornar o processo de estudo mais personalizado, prático e eficiente.

A plataforma é voltada para estudantes do Ensino Médio e foi pensada para auxiliar na revisão de conteúdos por meio de quizzes interativos. Diferente de sistemas tradicionais, o Pillar utiliza o desempenho do aluno para identificar dificuldades e gerar novos exercícios focados nos tópicos em que ele apresentou mais erros.

A proposta do projeto é unir tecnologia, educação e análise de dados para criar uma experiência de aprendizado mais inteligente e direcionada.

---

## 🎯 Objetivo

O principal objetivo do **Pillar** é ajudar estudantes a revisarem conteúdos de forma personalizada, identificando pontos fracos e oferecendo reforço automático.

Além disso, o projeto busca aplicar conceitos de desenvolvimento web full stack, utilizando front-end moderno, back-end com API REST e banco de dados relacional.

---

## ✨ Funcionalidades

- Sistema de quizzes interativos
- Perguntas com alternativas dinâmicas
- Feedback imediato após as respostas
- Exibição de justificativa para cada questão
- Análise de desempenho ao final do quiz
- Geração automática de exercícios de reforço
- Identificação dos tópicos com maior índice de erro
- Sistema anti-repetição de questões
- Embaralhamento de alternativas
- Relatórios visuais de desempenho
- Interface responsiva para desktop e mobile
- Navegação fluida entre páginas
- Estrutura preparada para expansão de disciplinas, conteúdos e usuários

---

## 🧠 Como Funciona

O funcionamento do Pillar é baseado em um fluxo de aprendizado adaptativo:

1. O aluno responde a uma sequência de questões.
2. O sistema registra os acertos e erros.
3. Ao final do quiz, o desempenho é analisado.
4. Os tópicos com maior dificuldade são identificados.
5. O sistema gera uma nova bateria de exercícios focada nesses pontos.
6. O aluno pode revisar os conteúdos e melhorar seu desempenho progressivamente.

Esse método busca evitar uma revisão genérica, priorizando os conteúdos que realmente precisam de atenção.

---

## 🛠️ Tecnologias Utilizadas

### Front-end

- **React.js**  
  Utilizado para construção da interface da aplicação, componentização das telas e controle dos estados da aplicação.

- **Vite**  
  Ferramenta utilizada para criação e execução do projeto React com maior velocidade durante o desenvolvimento.

- **React Router DOM**  
  Utilizado para gerenciamento das rotas e navegação entre as páginas da aplicação.

- **CSS Modules / CSS Vanilla**  
  Utilizado para estilização da interface, responsividade e organização visual dos componentes.

---

### Back-end

- **Node.js**  
  Ambiente de execução utilizado para desenvolver o servidor da aplicação.

- **Express.js**  
  Framework utilizado para criação das rotas da API e gerenciamento das requisições HTTP.

- **MariaDB**  
  Banco de dados relacional utilizado para armazenar informações como usuários, questões, alternativas, tópicos e histórico de desempenho.

- **MySQL2 / MariaDB Driver**  
  Utilizado para realizar a conexão entre o back-end e o banco de dados.

---

## 🗄️ Banco de Dados

O banco de dados do projeto foi estruturado para armazenar e organizar as informações necessárias para o funcionamento da plataforma.

Entre os principais dados armazenados estão:

- Usuários
- Disciplinas
- Tópicos
- Questões
- Alternativas
- Respostas dos usuários
- Histórico de desempenho
- Dados utilizados para geração de reforço

Essa estrutura permite que o sistema acompanhe o desempenho individual de cada estudante e ofereça exercícios personalizados.

---

## 🧩 Principais Recursos Técnicos

- API RESTful com Node.js e Express
- Integração entre front-end e back-end
- Banco de dados relacional com MariaDB
- Componentização com React
- Controle de rotas com React Router
- Sistema de quiz com feedback imediato
- Lógica de análise de erros por tópico
- Geração de questões de reforço
- Sistema para evitar repetição excessiva de questões
- Embaralhamento de alternativas
- Layout responsivo
- Organização modular do projeto

---

## 📱 Responsividade

O Pillar foi desenvolvido com foco em uma boa experiência tanto em computadores quanto em dispositivos móveis.

A interface se adapta a diferentes tamanhos de tela, permitindo que o estudante utilize a plataforma de forma confortável em desktops, notebooks, tablets e celulares.

---

## 📁 Estrutura do Projeto

```bash
Pillar/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── database/
│   │   └── app.js
│   ├── package.json
│   └── server.js
│
└── README.md
