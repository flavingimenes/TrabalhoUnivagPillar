<h1 align="center">
  📚 Pillar - Plataforma de Estudos Adaptativa
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white" alt="MariaDB">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
</p>

<p align="center">
  Uma plataforma de estudos inteligente focada no Ensino Médio e alinhada à BNCC (Base Nacional Comum Curricular), projetada para personalizar a jornada de aprendizado através de dados.
</p>

---

## 🎯 Sobre o Projeto

O **Pillar** é uma aplicação web (PWA) que visa transformar a maneira como estudantes do ensino médio revisam conteúdos. Diferente de plataformas estáticas, o Pillar utiliza um sistema de feedback contínuo para identificar as fraquezas do aluno e sugerir conteúdos de reforço automaticamente.

### ✨ Principais Funcionalidades

* **Quiz Interativo & Dinâmico:** Sistema de perguntas e respostas com feedback imediato e justificativa para cada alternativa.
* **Algoritmo de Reforço Inteligente:** Ao final de cada quiz, o sistema analisa os tópicos que o aluno errou e gera, automaticamente, uma nova bateria de exercícios focada nessas dificuldades.
* **Sistema Anti-Repetição:** Lógica no Backend que prioriza questões inéditas e embaralha alternativas para garantir um aprendizado real, não apenas memorização de posições.
* **Relatórios de Desempenho:** Feedback visual colorido e motivacional baseado na porcentagem de acertos.
* **Navegação Fluida:** Interface responsiva adaptada para Mobile e Desktop.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando a stack **PERN/M** (adaptada para MariaDB):

### Front-end
* **React.js:** Biblioteca principal para construção da interface.
* **Vite:** Build tool para desenvolvimento rápido.
* **React Router DOM:** Gerenciamento de rotas.
* **CSS Modules/Vanilla:** Estilização responsiva e customizada.

### Back-end
* **Node.js & Express:** Servidor e API RESTful.
* **MariaDB:** Banco de dados relacional para armazenamento de questões, usuários e histórico.
* **MySQL2 / Mariadb Driver:** Conectores para comunicação com o banco.

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para rodar o projeto em sua máquina local.

### Pré-requisitos
* Node.js instalado.
* Servidor MariaDB rodando (XAMPP, Docker ou instalação nativa).

### 1. Configuração do Banco de Dados
Crie um banco de dados chamado `pillar` e certifique-se de ter a tabela `questions` com a seguinte estrutura (exemplo simplificado):

```sql
CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject_id VARCHAR(50),
    question_text TEXT,
    options JSON, -- Armazena arrays ["A", "B", "C", "D"]
    correct_answer VARCHAR(255),
    topic VARCHAR(100),
    explanation TEXT,
    difficulty ENUM('facil', 'medio', 'dificil')
);
