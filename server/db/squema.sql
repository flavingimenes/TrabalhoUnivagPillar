CREATE DATABASE IF NOT EXISTS Pillar;
USE Pillar;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    academic_focus VARCHAR(50) DEFAULT NULL
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

USE Pillar;

-- Tabela para armazenar as anotações do Planner
CREATE TABLE IF NOT EXISTS study_annotations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,            -- Vincula a anotação ao usuário (tabela users)
    title VARCHAR(255) NOT NULL,     -- O título "O que você vai estudar?"
    annotation_date DATE NOT NULL,   -- Data para posicionar no calendário (YYYY-MM-DD)
    start_time TIME,                 -- Horário de início
    end_time TIME,                   -- Horário de fim
    subject_type VARCHAR(50) NOT NULL, -- Tipo da matéria ('matematica', 'historia', etc)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Garante que se o usuário for deletado, as anotações também somem
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ==========================================================
-- SCRIPT COMPLETO DE CRIAÇÃO E CARGA DE DADOS - QUIZ APP
-- ==========================================================

-- 1. CRIAÇÃO DAS TABELAS
-- ==========================================================

CREATE TABLE IF NOT EXISTS subjects (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(10)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject_id VARCHAR(50),
    question_text TEXT NOT NULL,
    options JSON NOT NULL, -- Armazena as opções como array JSON ["A", "B", "C", "D"]
    correct_answer VARCHAR(255) NOT NULL,
    topic VARCHAR(100),
    explanation TEXT,
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. LIMPEZA (OPCIONAL - APENAS SE QUISER RESETAR OS DADOS ANTES)
-- DELETE FROM questions;
-- DELETE FROM subjects;

-- 3. INSERINDO AS MATÉRIAS (SUBJECTS)
-- ==========================================================

INSERT INTO subjects (id, name, icon) VALUES
('artes', 'Artes', '🎨'),
('biologia', 'Biologia', '🧬'),
('educacao-fisica', 'Educação Física', '⚽'),
('filosofia', 'Filosofia', '🤔'),
('fisica', 'Física', '⚡'),
('historia', 'História', '📜'),
('ingles', 'Inglês', '🇬🇧'),
('portugues', 'Língua Portuguesa', '📚'),
('matematica', 'Matemática', '📐'),
('quimica', 'Química', '🧪'),
('sociologia', 'Sociologia', '👥');

-- 4. INSERINDO AS PERGUNTAS (QUESTIONS)
-- ==========================================================

-- --- ARTES ---
INSERT INTO questions (subject_id, question_text, options, correct_answer, topic, explanation) VALUES
('artes', 'Qual movimento artístico brasileiro teve início oficial com a Semana de Arte Moderna de 1922?', '["Barroco", "Modernismo", "Romantismo", "Realismo"]', 'Modernismo', 'História da Arte Brasileira', 'A Semana de 22 marcou o início do Modernismo no Brasil, rompendo com o academicismo.'),
('artes', 'Quem pintou a obra "Abaporu"?', '["Candido Portinari", "Anita Malfatti", "Tarsila do Amaral", "Di Cavalcanti"]', 'Tarsila do Amaral', 'Modernismo', 'O Abaporu é a obra mais famosa de Tarsila do Amaral e inspirou o Movimento Antropofágico.'),
('artes', 'O Renascimento Cultural valorizava principalmente:', '["O Teocentrismo", "O Antropocentrismo", "O Abstracionismo", "O Misticismo"]', 'O Antropocentrismo', 'História da Arte Geral', 'O Renascimento colocava o ser humano no centro do universo (Antropocentrismo).'),
('artes', 'Quais são as três cores primárias na teoria das cores pigmento?', '["Verde, Vermelho e Azul", "Amarelo, Azul e Vermelho", "Branco, Preto e Cinza", "Laranja, Roxo e Verde"]', 'Amarelo, Azul e Vermelho', 'Teoria das Cores', 'A partir dessas três cores, é possível criar todas as cores secundárias e terciárias.'),
('artes', 'O que caracteriza a Arte Contemporânea?', '["Regras rígidas de composição", "Diversidade de estilos e liberdade material", "Foco exclusivo em temas religiosos", "Uso apenas de pintura a óleo"]', 'Diversidade de estilos e liberdade material', 'Arte Contemporânea', 'A arte contemporânea prioriza a ideia e o conceito, usando diversos meios e materiais.'),
('artes', 'Aleijadinho foi o principal expoente de qual movimento no Brasil?', '["Barroco Mineiro", "Neoclassicismo", "Impressionismo", "Cubismo"]', 'Barroco Mineiro', 'Barroco', 'Antônio Francisco Lisboa, o Aleijadinho, é o mestre do Barroco em Minas Gerais.'),
('artes', 'O Cubismo, liderado por Picasso, é caracterizado por:', '["Uso intenso de luz e sombra", "Formas geométricas e fragmentação", "Pinturas ao ar livre", "Retratos realistas"]', 'Formas geométricas e fragmentação', 'Vanguardas Europeias', 'O Cubismo decompõe os objetos em formas geométricas.'),
('artes', 'Qual destas manifestações é considerada Patrimônio Imaterial do Brasil?', '["Cristo Redentor", "Frevo", "MASP", "Teatro Amazonas"]', 'Frevo', 'Patrimônio Cultural', 'O Frevo é uma forma de expressão musical e coreográfica considerada patrimônio imaterial.'),
('artes', 'Na música, o que define o "ritmo"?', '["A altura do som", "A duração e acentuação dos sons", "A qualidade do som", "O volume do som"]', 'A duração e acentuação dos sons', 'Linguagem Musical', 'Ritmo é a organização do tempo na música (duração e pausa).'),
('artes', 'A arte rupestre é caracterizada por:', '["Pinturas em telas", "Esculturas de mármore", "Pinturas em paredes de cavernas", "Mosaicos bizantinos"]', 'Pinturas em paredes de cavernas', 'Pré-História', 'São as primeiras manifestações artísticas da humanidade, feitas em rochas e cavernas.');

-- --- BIOLOGIA ---
INSERT INTO questions (subject_id, question_text, options, correct_answer, topic, explanation) VALUES
('biologia', 'Qual organela é responsável pela respiração celular?', '["Ribossomo", "Mitocôndria", "Lisossomo", "Complexo de Golgi"]', 'Mitocôndria', 'Citologia', 'A mitocôndria é a "usina de energia" da célula, onde ocorre a respiração celular.'),
('biologia', 'Quem é considerado o pai da Genética?', '["Charles Darwin", "Gregor Mendel", "Louis Pasteur", "Watson e Crick"]', 'Gregor Mendel', 'Genética', 'Mendel formulou as leis básicas da hereditariedade usando ervilhas.'),
('biologia', 'Qual é a base nitrogenada exclusiva do RNA?', '["Timina", "Uracila", "Citosina", "Guanina"]', 'Uracila', 'Bioquímica', 'No RNA, a Uracila substitui a Timina encontrada no DNA.'),
('biologia', 'A seleção natural é um conceito proposto por:', '["Lamarck", "Darwin", "Mendel", "Lineu"]', 'Darwin', 'Evolução', 'Charles Darwin propôs que os indivíduos mais adaptados ao meio têm maior chance de sobreviver.'),
('biologia', 'Qual o tipo de relação ecológica onde ambos se beneficiam?', '["Parasitismo", "Mutualismo", "Competição", "Amensalismo"]', 'Mutualismo', 'Ecologia', 'No mutualismo, a associação é benéfica para ambas as espécies envolvidas.'),
('biologia', 'O que são vacinas?', '["Antibióticos fortes", "Soro com anticorpos prontos", "Preparações com antígenos inativados/atenuados", "Vitaminas concentradas"]', 'Preparações com antígenos inativados/atenuados', 'Imunologia', 'Vacinas estimulam o sistema imunológico a produzir seus próprios anticorpos (imunização ativa).'),
('biologia', 'Qual filo do reino animal possui corpo segmentado e exoesqueleto de quitina?', '["Moluscos", "Artrópodes", "Anelídeos", "Cordados"]', 'Artrópodes', 'Zoologia', 'Artrópodes (insetos, aracnídeos, crustáceos) possuem apêndices articulados e exoesqueleto.'),
('biologia', 'O processo de divisão celular que gera gametas é a:', '["Mitose", "Meiose", "Fissão binária", "Clonagem"]', 'Meiose', 'Divisão Celular', 'A meiose reduz o número de cromossomos à metade, essencial para a reprodução sexuada.'),
('biologia', 'As plantas que possuem vasos condutores, mas não têm sementes, são:', '["Briófitas", "Pteridófitas", "Gimnospermas", "Angiospermas"]', 'Pteridófitas', 'Botânica', 'Exemplo clássico são as samambaias. Elas têm xilema e floema, mas se reproduzem por esporos.'),
('biologia', 'Qual hormônio é responsável pela redução da glicose no sangue?', '["Glucagon", "Adrenalina", "Insulina", "Tiroxina"]', 'Insulina', 'Fisiologia Humana', 'A insulina facilita a entrada de glicose nas células, baixando a glicemia.');

-- --- EDUCAÇÃO FÍSICA ---
INSERT INTO questions (subject_id, question_text, options, correct_answer, topic, explanation) VALUES
('educacao-fisica', 'Qual capacidade física é predominante em uma maratona?', '["Força explosiva", "Resistência aeróbica", "Velocidade pura", "Flexibilidade"]', 'Resistência aeróbica', 'Fisiologia do Exercício', 'Maratonas exigem que o corpo mantenha atividade por longo tempo usando oxigênio.'),
('educacao-fisica', 'O IMC (Índice de Massa Corporal) é calculado dividindo:', '["Peso pela altura", "Peso pela altura ao quadrado", "Altura pelo peso", "Altura ao quadrado pelo peso"]', 'Peso pela altura ao quadrado', 'Saúde e Qualidade de Vida', 'A fórmula é: Peso (kg) / (Altura (m) x Altura (m)).'),
('educacao-fisica', 'No Futsal, quantos jogadores de linha iniciam o jogo (sem contar o goleiro)?', '["4", "5", "6", "10"]', '4', 'Esportes Coletivos', 'Um time de futsal tem 5 jogadores no total: 1 goleiro e 4 na linha.'),
('educacao-fisica', 'O sedentarismo está diretamente ligado ao risco de desenvolver:', '["Hipertrofia muscular", "Melhora cardiovascular", "Doenças crônicas como hipertensão e diabetes", "Flexibilidade articular"]', 'Doenças crônicas como hipertensão e diabetes', 'Saúde', 'A falta de atividade física é um fator de risco primário para doenças cardiovasculares e metabólicas.'),
('educacao-fisica', 'A Capoeira é uma mistura de:', '["Dança, luta e jogo", "Luta greco-romana e samba", "Judô e Ballet", "Futebol e Boxe"]', 'Dança, luta e jogo', 'Cultura Corporal', 'Originária do Brasil, a capoeira combina elementos de arte marcial, dança e música.'),
('educacao-fisica', 'Qual o principal objetivo dos exercícios de alongamento?', '["Aumentar a força", "Melhorar a flexibilidade", "Queimar gordura", "Aumentar a massa óssea"]', 'Melhorar a flexibilidade', 'Treinamento Físico', 'O alongamento visa aumentar a amplitude de movimento das articulações e elasticidade muscular.'),
('educacao-fisica', 'No Voleibol, quantos toques a equipe pode dar na bola antes de passá-la para o outro lado?', '["2", "3", "4", "Ilimitado"]', '3', 'Regras de Esportes', 'São permitidos até 3 toques, além do toque do bloqueio.'),
('educacao-fisica', 'O que caracteriza um exercício anaeróbico?', '["Baixa intensidade e longa duração", "Alta intensidade e curta duração", "Uso exclusivo de oxigênio", "Relaxamento mental"]', 'Alta intensidade e curta duração', 'Fisiologia', 'Exemplos: Musculação pesada, sprints de 100m. O corpo usa energia sem depender imediata de oxigênio.'),
('educacao-fisica', 'Onde foram realizados os Jogos Olímpicos de 2016?', '["Londres", "Tóquio", "Rio de Janeiro", "Paris"]', 'Rio de Janeiro', 'História do Esporte', 'Foi a primeira vez que os Jogos Olímpicos foram sediados na América do Sul.'),
('educacao-fisica', 'O doping no esporte refere-se a:', '["Uso de equipamentos tecnológicos", "Uso de substâncias ilícitas para aumento de desempenho", "Treinamento intensivo", "Dieta balanceada"]', 'Uso de substâncias ilícitas para aumento de desempenho', 'Ética no Esporte', 'É proibido pois fere a ética esportiva e pode prejudicar a saúde do atleta.');

-- --- FILOSOFIA ---
INSERT INTO questions (subject_id, question_text, options, correct_answer, topic, explanation) VALUES
('filosofia', 'A frase "Só sei que nada sei" é atribuída a:', '["Platão", "Sócrates", "Aristóteles", "Nietzsche"]', 'Sócrates', 'Filosofia Antiga', 'Representa a postura de humildade intelectual necessária para buscar a verdade.'),
('filosofia', 'O "Mito da Caverna" foi escrito por:', '["Platão", "Descartes", "Maquiavel", "Kant"]', 'Platão', 'Filosofia Antiga', 'Encontra-se na obra "A República" e discute a teoria do conhecimento (mundo sensível vs inteligível).'),
('filosofia', 'Quem é o autor de "O Príncipe", obra fundamental da política moderna?', '["Rousseau", "Hobbes", "Maquiavel", "Locke"]', 'Maquiavel', 'Filosofia Política', 'Maquiavel analisa como um governante deve agir para conquistar e manter o poder.'),
('filosofia', 'O que estuda a Ética?', '["A origem do universo", "Os valores morais e a conduta humana", "A lógica matemática", "A estrutura do governo"]', 'Os valores morais e a conduta humana', 'Ética', 'A ética reflete sobre o bem, o mal, o justo e o comportamento em sociedade.'),
('filosofia', 'René Descartes é famoso pela frase:', '["Penso, logo existo", "O homem é o lobo do homem", "Deus está morto", "Tudo flui"]', 'Penso, logo existo', 'Racionalismo', 'Cogito, ergo sum. É a base do racionalismo moderno.'),
('filosofia', 'Para Karl Marx, a história da humanidade é a história da:', '["Evolução das espécies", "Luta de classes", "Vontade de potência", "Razão pura"]', 'Luta de classes', 'Filosofia Contemporânea', 'Marx via o conflito entre opressores (burguesia) e oprimidos (proletariado) como motor da história.'),
('filosofia', 'O Existencialismo, de Sartre, afirma que:', '["A essência precede a existência", "A existência precede a essência", "Tudo já está determinado", "Deus define nosso destino"]', 'A existência precede a essência', 'Existencialismo', 'Primeiro o homem existe, surge no mundo, e só depois se define através de suas escolhas.'),
('filosofia', 'O que é um silogismo na lógica aristotélica?', '["Um poema grego", "Um argumento lógico com duas premissas e uma conclusão", "Uma lei política", "Um mito religioso"]', 'Um argumento lógico com duas premissas e uma conclusão', 'Lógica', 'Ex: Todo homem é mortal (Premissa 1) -> Sócrates é homem (Premissa 2) -> Logo, Sócrates é mortal (Conclusão).'),
('filosofia', 'Segundo Thomas Hobbes, o "estado de natureza" é:', '["Um paraíso perdido", "Uma guerra de todos contra todos", "Uma democracia perfeita", "Uma sociedade sem leis, mas pacífica"]', 'Uma guerra de todos contra todos', 'Contratualismo', 'Por isso, segundo ele, precisamos de um Estado forte (Leviatã) para garantir a ordem.'),
('filosofia', 'A Escola de Frankfurt é conhecida por desenvolver a:', '["Teoria Crítica", "Teoria das Ideias", "Teoria do Caos", "Teoria da Relatividade"]', 'Teoria Crítica', 'Filosofia Contemporânea', 'Analisavam a cultura de massa e a sociedade industrial capitalista.');

-- --- FÍSICA ---
INSERT INTO questions (subject_id, question_text, options, correct_answer, topic, explanation) VALUES
('fisica', 'Qual é a 1ª Lei de Newton?', '["Lei da Ação e Reação", "Lei da Inércia", "Lei da Gravitação Universal", "Lei de Ohm"]', 'Lei da Inércia', 'Mecânica', 'Um corpo tende a permanecer em repouso ou movimento retilíneo uniforme a menos que uma força atue sobre ele.'),
('fisica', 'Qual a fórmula da velocidade média?', '["Vm = ΔS / Δt", "Vm = m . a", "Vm = Δt / ΔS", "Vm = m . v²"]', 'Vm = ΔS / Δt', 'Cinemática', 'Velocidade média é a variação de espaço dividida pela variação de tempo.'),
('fisica', 'O que estuda a Termodinâmica?', '["O movimento dos planetas", "As trocas de calor e trabalho", "A luz e as cores", "A eletricidade estática"]', 'As trocas de calor e trabalho', 'Termologia', 'Analisa como a energia térmica se transforma em outras formas de energia.'),
('fisica', 'Qual unidade mede a resistência elétrica no Sistema Internacional?', '["Volt", "Ampere", "Ohm", "Watt"]', 'Ohm', 'Eletrodinâmica', 'O símbolo é a letra grega ômega (Ω).'),
('fisica', 'Na óptica, a miopia é corrigida com lentes:', '["Convergentes", "Divergentes", "Bifocais", "Cilíndricas"]', 'Divergentes', 'Óptica', 'A lente divergente "abre" os raios de luz para que a imagem se forme na retina, e não antes dela.'),
('fisica', 'A energia cinética está associada a:', '["Altura", "Movimento", "Molas deformadas", "Calor"]', 'Movimento', 'Energia', 'A fórmula é Ec = (m.v²)/2. Depende da massa e da velocidade.'),
('fisica', 'Dois corpos com cargas de sinais opostos:', '["Se repelem", "Se atraem", "Não interagem", "Se anulam"]', 'Se atraem', 'Eletrostática', 'Cargas iguais se repelem, cargas opostas se atraem.'),
('fisica', 'Qual fenômeno explica a formação do arco-íris?', '["Reflexão", "Refração e dispersão", "Difração", "Interferência"]', 'Refração e dispersão', 'Óptica', 'A luz branca do sol entra na gota de água, refrata e se dispersa nas 7 cores visíveis.'),
('fisica', 'Qual é a aceleração da gravidade aproximada na Terra?', '["5 m/s²", "9,8 m/s²", "15 m/s²", "20 m/s²"]', '9,8 m/s²', 'Gravitação', 'Frequentemente arredondada para 10 m/s² em exercícios escolares.'),
('fisica', 'A pressão atmosférica diminui quando:', '["A altitude aumenta", "A altitude diminui", "A temperatura cai", "Está chovendo"]', 'A altitude aumenta', 'Hidrostática', 'Quanto mais alto, menos ar existe acima de nós, logo, menor a pressão.');

-- --- HISTÓRIA ---
INSERT INTO questions (subject_id, question_text, options, correct_answer, topic, explanation) VALUES
('historia', 'O que marcou o fim da Idade Média e início da Idade Moderna?', '["Queda de Roma", "Queda de Constantinopla", "Revolução Francesa", "Descobrimento do Brasil"]', 'Queda de Constantinopla', 'História Geral', 'A tomada de Constantinopla pelos turcos em 1453 é o marco tradicional.'),
('historia', 'Quem foi o primeiro imperador do Brasil?', '["D. Pedro II", "D. João VI", "D. Pedro I", "Deodoro da Fonseca"]', 'D. Pedro I', 'Brasil Império', 'Ele proclamou a independência em 1822 e governou até abdicar em 1831.'),
('historia', 'A Guerra Fria foi um conflito ideológico entre:', '["EUA e Alemanha", "EUA e URSS", "China e Japão", "Inglaterra e França"]', 'EUA e URSS', 'Idade Contemporânea', 'Ocorreu entre o bloco capitalista (EUA) e o bloco socialista (União Soviética).'),
('historia', 'Qual movimento intelectual influenciou a Revolução Francesa?', '["Iluminismo", "Renascimento", "Positivismo", "Marxismo"]', 'Iluminismo', 'Revoluções Burguesas', 'Ideais de liberdade, igualdade e fraternidade vieram dos filósofos iluministas.'),
('historia', 'O que foi o "Coronelismo" na República Velha brasileira?', '["Um sistema militar", "O poder político local exercido por grandes latifundiários", "A industrialização de São Paulo", "A revolta dos tenentes"]', 'O poder político local exercido por grandes latifundiários', 'Brasil República', 'Os coronéis controlavam o "voto de cabresto" para eleger seus aliados.'),
('historia', 'A Lei Áurea, que aboliu a escravidão no Brasil, foi assinada em:', '["1822", "1850", "1888", "1889"]', '1888', 'Brasil Império', 'Assinada pela Princesa Isabel em 13 de maio de 1888.'),
('historia', 'O nazismo e o fascismo são regimes:', '["Democráticos", "Totalitários de extrema-direita", "Comunistas", "Anarquistas"]', 'Totalitários de extrema-direita', 'Segunda Guerra Mundial', 'Caracterizados pelo nacionalismo extremo, autoritarismo e supressão de oposições.'),
('historia', 'Qual era a principal atividade econômica no início da colonização do Brasil?', '["Mineração de ouro", "Café", "Extração de Pau-Brasil", "Cana-de-açúcar"]', 'Extração de Pau-Brasil', 'Brasil Colônia', 'Antes dos engenhos de açúcar, o foco foi o escambo do pau-brasil com os indígenas.'),
('historia', 'A Revolução Industrial começou em qual país?', '["França", "Estados Unidos", "Inglaterra", "Alemanha"]', 'Inglaterra', 'Idade Moderna/Contemporânea', 'A Inglaterra foi pioneira no século XVIII devido às reservas de carvão e capital acumulado.'),
('historia', 'Quem presidiu o Brasil durante o "Estado Novo" (1937-1945)?', '["Juscelino Kubitschek", "Getúlio Vargas", "João Goulart", "Eurico Gaspar Dutra"]', 'Getúlio Vargas', 'Era Vargas', 'Foi um período ditatorial liderado por Vargas, com forte censura e centralização.');

-- --- INGLÊS ---
INSERT INTO questions (subject_id, question_text, options, correct_answer, topic, explanation) VALUES
('ingles', 'What is the past tense of the verb "to go"?', '["Goed", "Gone", "Went", "Going"]', 'Went', 'Grammar - Simple Past', '"Go" is an irregular verb. Past: Went. Participle: Gone.'),
('ingles', 'Choose the correct sentence:', '["She don''t like pizza.", "She doesn''t like pizza.", "She no like pizza.", "She not likes pizza."]', 'She doesn''t like pizza.', 'Grammar - Simple Present', 'In Simple Present negative, third person singular (She) uses "doesn''t".'),
('ingles', 'What does the word "Parents" mean in Portuguese?', '["Parentes", "Pais", "Avós", "Primos"]', 'Pais', 'Vocabulary - False Cognates', '"Parents" is a false friend. "Parentes" in English is "Relatives".'),
('ingles', 'Which sentence is in the Present Continuous?', '["I play soccer.", "I am playing soccer.", "I played soccer.", "I will play soccer."]', 'I am playing soccer.', 'Grammar - Verb Tenses', 'Subject + verb to be + main verb + ing (am playing).'),
('ingles', 'Complete: "If I ______ money, I would travel."', '["have", "had", "has", "having"]', 'had', 'Grammar - Conditionals', 'Second Conditional: If + Simple Past, ... would + infinitive.'),
('ingles', 'The plural of "Child" is:', '["Childs", "Children", "Childrens", "Childes"]', 'Children', 'Grammar - Plurals', 'Irregular plural. One child, two children.'),
('ingles', 'What is the opposite of "Always"?', '["Sometimes", "Often", "Never", "Usually"]', 'Never', 'Vocabulary - Adverbs', 'Always (Sempre) x Never (Nunca).'),
('ingles', 'The book is ON the table. "ON" is a preposition of:', '["Time", "Place", "Movement", "Cause"]', 'Place', 'Grammar - Prepositions', 'Indicates location (sobre a mesa/em cima da mesa).'),
('ingles', 'Choose the correct pronoun: "______ car is blue."', '["He", "Him", "His", "He''s"]', 'His', 'Grammar - Possessives', 'Possessive adjective for "He" is "His" (O carro dele).'),
('ingles', 'What is the translation of "Actually"?', '["Atualmente", "Na verdade", "Agora", "Rapidamente"]', 'Na verdade', 'Vocabulary - False Cognates', '"Actually" means "Na verdade" or "De fato". "Atualmente" is "Nowadays".');

-- --- PORTUGUÊS ---
INSERT INTO questions (subject_id, question_text, options, correct_answer, topic, explanation) VALUES
('portugues', 'Qual das opções abaixo apresenta uso de crase obrigatório?', '["Fui a pé.", "Vou a Bahia.", "Fui à escola.", "Entreguei o livro a ela."]', 'Fui à escola.', 'Gramática - Crase', 'Quem vai, vai A algum lugar + A (artigo) escola = À escola.'),
('portugues', 'O Romantismo no Brasil teve como marco inicial a obra:', '["Memórias Póstumas de Brás Cubas", "Suspiros Poéticos e Saudades", "O Cortiço", "Macunaíma"]', 'Suspiros Poéticos e Saudades', 'Literatura', 'Publicada em 1836 por Gonçalves de Magalhães.'),
('portugues', 'Qual figura de linguagem presente em: "O vento beijava meu rosto"?', '["Metáfora", "Prosopopeia (Personificação)", "Antítese", "Eufemismo"]', 'Prosopopeia (Personificação)', 'Figuras de Linguagem', 'Atribuição de características humanas (beijar) a seres inanimados (vento).'),
('portugues', 'Em "Ele estudou muito, MAS não passou", a conjunção indica:', '["Adição", "Conclusão", "Adversidade", "Causa"]', 'Adversidade', 'Sintaxe - Orações Coordenadas', '"Mas" introduz uma ideia oposta à anterior (Oração Coordenada Adversativa).'),
('portugues', 'Machado de Assis é o principal nome do:', '["Romantismo", "Realismo", "Parnasianismo", "Simbolismo"]', 'Realismo', 'Literatura', 'Fundador da Academia Brasileira de Letras e ícone do Realismo.'),
('portugues', 'A palavra "pássaro" é acentuada porque é uma:', '["Oxítona", "Paroxítona", "Proparoxítona", "Monossílabo tônico"]', 'Proparoxítona', 'Ortografia - Acentuação', 'Todas as proparoxítonas (sílaba tônica na antepenúltima) são acentuadas.'),
('portugues', 'O que é variação linguística regional?', '["Diferença de fala entre idosos e jovens", "Diferença de fala dependendo da região geográfica (sotaques)", "Uso de gírias", "Linguagem técnica"]', 'Diferença de fala dependendo da região geográfica (sotaques)', 'Sociolinguística', 'Exemplo: Falar "mandioca", "aipim" ou "macaxeira" dependendo do estado.'),
('portugues', 'Qual a função da linguagem focada no emissor e seus sentimentos?', '["Referencial", "Emotiva", "Metalinguística", "Conativa"]', 'Emotiva', 'Funções da Linguagem', 'Foca na subjetividade, no "eu" (ex: diários, poesias líricas).'),
('portugues', 'Em "Vende-se casas", há um erro de concordância. O correto seria:', '["Vendem-se casas", "Vende-se casa", "Vendido casas", "Casas a venda"]', 'Vendem-se casas', 'Sintaxe - Concordância Verbal', 'Casas (sujeito) são vendidas. O verbo deve ir para o plural.'),
('portugues', 'O movimento Modernista de 1922 buscava:', '["Copiar a arte europeia", "Retomar os valores gregos", "Criar uma arte genuinamente brasileira e livre", "Manter o formalismo parnasiano"]', 'Criar uma arte genuinamente brasileira e livre', 'Literatura - Modernismo', 'Rompimento com o passado e valorização da identidade nacional.');

-- --- MATEMÁTICA ---
INSERT INTO questions (subject_id, question_text, options, correct_answer, topic, explanation) VALUES
('matematica', 'Qual é a solução da equação logaritmo log2(x) = 3?', '["6", "8", "9", "5"]', '8', 'Logaritmos', '2 elevado a 3 é igual a 8 (2³ = 8).'),
('matematica', 'Em um triângulo retângulo, o quadrado da hipotenusa é igual à soma dos quadrados dos catetos. Esse é o teorema de:', '["Tales", "Pitágoras", "Bhaskara", "Arquimedes"]', 'Pitágoras', 'Geometria Plana', 'a² = b² + c².'),
('matematica', 'Qual é o valor de x na equação 2x + 10 = 20?', '["2", "5", "10", "15"]', '5', 'Álgebra Básica', '2x = 10 -> x = 10/2 -> x = 5.'),
('matematica', 'Como se calcula a área de um retângulo?', '["Base x Altura", "Base + Altura", "(Base x Altura) / 2", "Lado x Lado x Lado"]', 'Base x Altura', 'Geometria Plana', 'A área é a medida da superfície, multiplicando os dois lados diferentes.'),
('matematica', 'Qual é o próximo termo da P.A. (2, 5, 8, ...)?', '["10", "11", "12", "13"]', '11', 'Progressões (PA/PG)', 'A razão é 3 (5-2=3). Logo, 8 + 3 = 11.'),
('matematica', 'O gráfico de uma função do 2º grau (quadrática) é uma:', '["Reta", "Parábola", "Circunferência", "Hipérbole"]', 'Parábola', 'Funções', 'Toda função f(x) = ax² + bx + c gera uma parábola.'),
('matematica', 'Quanto é 20% de 150?', '["15", "20", "30", "40"]', '30', 'Matemática Financeira', '10% de 150 é 15. 20% é o dobro, ou seja, 30.'),
('matematica', 'Qual a soma dos ângulos internos de um triângulo?', '["180°", "360°", "90°", "270°"]', '180°', 'Geometria Plana', 'Independentemente do tipo de triângulo, a soma é sempre 180 graus.'),
('matematica', 'Na análise combinatória, o fatorial de 4 (4!) é:', '["10", "16", "24", "12"]', '24', 'Análise Combinatória', '4! = 4 x 3 x 2 x 1 = 24.'),
('matematica', 'Se f(x) = 3x + 2, qual o valor de f(4)?', '["10", "12", "14", "16"]', '14', 'Funções', 'Substituindo x por 4: 3(4) + 2 = 12 + 2 = 14.');

-- --- QUÍMICA ---
INSERT INTO questions (subject_id, question_text, options, correct_answer, topic, explanation) VALUES
('quimica', 'O modelo atômico conhecido como "Pudim de Passas" foi proposto por:', '["Dalton", "Thomson", "Rutherford", "Bohr"]', 'Thomson', 'Modelos Atômicos', 'Thomson descobriu o elétron e propôs uma esfera positiva incrustada de cargas negativas.'),
('quimica', 'O pH 2 indica que uma substância é:', '["Neutra", "Ácida", "Básica", "Salina"]', 'Ácida', 'Físico-Química', 'A escala vai de 0 a 14. Abaixo de 7 é ácido, 7 é neutro, acima é básico.'),
('quimica', 'Qual a fórmula da água?', '["H2O2", "HO", "H2O", "OH"]', 'H2O', 'Química Geral', 'Dois átomos de hidrogênio e um de oxigênio.'),
('quimica', 'Na tabela periódica, os elementos da família 18 (gases nobres) são conhecidos por:', '["Alta reatividade", "Estabilidade química", "Formarem cátions facilmente", "Serem metais sólidos"]', 'Estabilidade química', 'Tabela Periódica', 'Eles possuem a camada de valência completa (geralmente 8 elétrons), reagindo pouco.'),
('quimica', 'Qual tipo de ligação ocorre entre o Sódio (Metal) e o Cloro (Ametal)?', '["Covalente", "Iônica", "Metálica", "De Hidrogênio"]', 'Iônica', 'Ligações Químicas', 'Ocorre transferência de elétrons, formando íons (Na+ e Cl-).'),
('quimica', 'O etanol (álcool comum) pertence a qual função orgânica?', '["Álcool", "Cetona", "Ácido Carboxílico", "Éster"]', 'Álcool', 'Química Orgânica', 'Possui a hidroxila (-OH) ligada a um carbono saturado.'),
('quimica', 'Qual é o número de Avogadro (aproximado)?', '["3,14 x 10^23", "6,02 x 10^23", "1,6 x 10^-19", "9,8 x 10^2"]', '6,02 x 10^23', 'Estequiometria', 'Representa a quantidade de entidades elementares em 1 mol.'),
('quimica', 'A separação de misturas heterogêneas sólido-líquido (ex: areia e água) pode ser feita por:', '["Destilação", "Filtração", "Decantação (apenas)", "Filtração ou Decantação"]', 'Filtração ou Decantação', 'Separação de Misturas', 'Tanto filtrar quanto deixar decantar (assentar) funcionam para separar a areia da água.'),
('quimica', 'O que é uma reação exotérmica?', '["Reação que absorve calor", "Reação que libera calor", "Reação nuclear", "Reação muito lenta"]', 'Reação que libera calor', 'Termoquímica', 'O prefixo "exo" significa para fora. O sistema libera energia para o meio.'),
('quimica', 'O Carbono faz quantas ligações covalentes para ficar estável?', '["2", "3", "4", "5"]', '4', 'Química Orgânica', 'O carbono é tetravalente.');

-- --- SOCIOLOGIA ---
INSERT INTO questions (subject_id, question_text, options, correct_answer, topic, explanation) VALUES
('sociologia', 'Quem é considerado um dos "pais" da Sociologia e criou o conceito de Fato Social?', '["Max Weber", "Émile Durkheim", "Karl Marx", "Auguste Comte"]', 'Émile Durkheim', 'Sociologia Clássica', 'Para Durkheim, fatos sociais são maneiras de agir, pensar e sentir exteriores ao indivíduo.'),
('sociologia', 'Para Karl Marx, a sociedade é movida pela:', '["Solidariedade orgânica", "Ação social", "Luta de classes", "Burocracia"]', 'Luta de classes', 'Sociologia Clássica', 'O conflito econômico entre burguesia e proletariado estrutura a sociedade capitalista.'),
('sociologia', 'O conceito de "Mais-Valia" refere-se a:', '["Ao lucro obtido pela exploração do trabalho", "Ao imposto pago ao governo", "Ao valor sentimental de um bem", "Ao aumento da inflação"]', 'Ao lucro obtido pela exploração do trabalho', 'Marxismo', 'É a diferença entre o que o trabalhador produz e o que ele recebe como salário.'),
('sociologia', 'O que é Etnocentrismo?', '["Valorização de todas as culturas", "Julgar outras culturas usando a sua própria como padrão superior", "Estudo dos indígenas", "Mistura de raças"]', 'Julgar outras culturas usando a sua própria como padrão superior', 'Antropologia', 'É a visão preconceituosa de que a sua cultura é o centro e a "correta".'),
('sociologia', 'Gilberto Freyre escreveu qual obra clássica da sociologia brasileira?', '["Raízes do Brasil", "O Povo Brasileiro", "Casa-Grande & Senzala", "Os Sertões"]', 'Casa-Grande & Senzala', 'Sociologia Brasileira', 'A obra analisa a formação da sociedade brasileira e a miscigenação.'),
('sociologia', 'Max Weber estudou a:', '["Luta de classes", "Fatos sociais", "Ação social", "Positivismo"]', 'Ação social', 'Sociologia Clássica', 'Para Weber, a sociologia deve compreender o sentido que o indivíduo dá à sua ação.'),
('sociologia', 'O que significa "Meritocracia"?', '["Governo dos mais ricos", "Sistema onde o progresso depende do mérito e esforço individual", "Sistema de castas", "Governo religioso"]', 'Sistema onde o progresso depende do mérito e esforço individual', 'Política e Sociedade', 'Um conceito debatido, pois ignora desigualdades de oportunidades iniciais.'),
('sociologia', 'Zygmunt Bauman criou o conceito de:', '["Sociedade do Espetáculo", "Modernidade Líquida", "Fim da História", "Aldeia Global"]', 'Modernidade Líquida', 'Sociologia Contemporânea', 'Refere-se à fluidez e instabilidade das relações humanas no mundo moderno.'),
('sociologia', 'O processo de socialização é:', '["Fazer amigos em festas", "O aprendizado e interiorização dos valores e normas da sociedade", "O uso de redes sociais", "A estatização de empresas"]', 'O aprendizado e interiorização dos valores e normas da sociedade', 'Conceitos Básicos', 'Começa na família (socialização primária) e continua na escola/trabalho (secundária).'),
('sociologia', 'A Desigualdade Social no Brasil é historicamente marcada por:', '["Herança colonial e escravista", "Falta de recursos naturais", "Excesso de guerras externas", "Clima tropical"]', 'Herança colonial e escravista', 'Desigualdade', 'A concentração de terras e renda tem raízes na colonização e escravidão.');

CREATE TABLE quiz_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    subject_id INT NOT NULL,  -- O ID da matéria (ex: 1 para Matemática)
    score INT NOT NULL,       -- Quantas o aluno acertou
    total_questions INT NOT NULL, -- Total de perguntas no quiz
    percentage DECIMAL(5,2),  -- Opcional: A percentagem de acerto (ex: 80.00)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);