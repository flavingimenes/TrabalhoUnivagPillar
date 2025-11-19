CREATE DATABASE IF NOT EXISTS Pillar;
USE Pillar;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


USE Pillar;
-- 1. Cria a tabela para guardar os textos do site
-- Usamos uma estrutura de Chave (section_key) e Valor (content_text)
CREATE TABLE IF NOT EXISTS site_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section_key VARCHAR(100) NOT NULL UNIQUE, -- Ex: 'hero_title', 'feat_1_title'
    content_text TEXT,                        -- O texto que aparece na tela
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Inserir o conteúdo ATUAL da sua Home no banco
-- Assim, quando você trocar o código, a página não ficará vazia.

INSERT INTO site_content (section_key, content_text) VALUES 
-- Header / Hero
('hero_top_tag', 'seu estudo, em um lugar só'),
('hero_title', 'Study Smarter, Not Harder'),
('hero_subtitle', 'Torne seus estudos muito mais fluidos. Planeje suas metas, veja seu progresso, e foque no que importa.'),

-- Funcionalidades (Features)
('feat_1_title', '📅 Foque no que importa'),
('feat_1_desc', 'Nós te ajudaremos a manter o foco nas tarefas essenciais para seu sucesso, baseado em suas necessidades.'),
('feat_2_title', '📊 Visualize seu Progresso'),
('feat_2_desc', 'Gráficos e relatórios intuitivos que mostram sua evolução ao longo do tempo.'),
('feat_3_title', '📚 Centralize seus Estudos'),
('feat_3_desc', 'Aqui, você terá todas as suas matérias, anotações e recursos organizados em um só lugar.'),

-- Como Funciona (Steps)
('step_1_title', 'Teste Geral'),
('step_1_desc', 'Faça uma breve avaliação para avaliarmos seu conhecimento.'),
('step_2_title', 'Resultado'),
('step_2_desc', 'Veja seu desempenho e áreas de melhoria com gráficos detalhados.'),
('step_3_title', 'Pratique'),
('step_3_desc', 'Faça exercícios personalizados para reforçar seu aprendizado.'),

-- Depoimentos
('testim_1_text', '"Esta plataforma mudou minha forma de estudar. Finalmente consigo ver onde meu tempo está indo!"'),
('testim_1_author', '- João P., Estudante de Engenharia'),
('testim_2_text', '"A melhor parte é ter tudo em um só lugar. Adeus, planilhas confusas e apps separados."'),
('testim_2_author', '- Maria S., Concurseira'),
('testim_3_text', '"Intuitivo e direto ao ponto. Me ajudou a manter o foco e a disciplina para o ENEM."'),
('testim_3_author', '- Lucas R., Vestibulando'),

-- CTA e Footer
('cta_title', 'Pronto para transformar seus estudos?'),
('cta_desc', 'Comece gratuitamente e descubra uma nova forma de aprender e se organizar.'),
('footer_text', '© 2025 SeuProjeto. Todos os direitos reservados.');