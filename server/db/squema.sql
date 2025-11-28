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

-- 1. Melhorar o tipo de dados de 'options' para JSON (se seu MariaDB for > 10.2)
-- Isso evita erros de formatação e permite buscas dentro das opções no futuro.
-- Se der erro, pode manter LONGTEXT, mas JSON é o ideal.
ALTER TABLE questions MODIFY COLUMN options JSON;

-- 2. Adicionar Nível de Dificuldade
-- Isso é CRUCIAL para um sistema de estudo inteligente.
-- Se o aluno errou, você pode priorizar mandar questões 'fáceis' ou 'médias' do tópico.
ALTER TABLE questions ADD COLUMN difficulty ENUM('facil', 'medio', 'dificil') DEFAULT 'medio';

-- 3. Criar Índices de Performance (MUITO IMPORTANTE)
-- Como vamos buscar muito por "matéria + tópico", precisamos indexar para não travar o banco
-- quando tiver milhares de questões.
CREATE INDEX idx_subject_topic ON questions (subject_id, topic);

-- 4. Opcional: Se 'subject_id' for numérico na tabela de matérias, altere aqui também.
-- Se você usa códigos como "MAT-01" (texto), mantenha VARCHAR. 
-- Se usa IDs numéricos (1, 2, 3), mude para INT para ser mais rápido.
-- ALTER TABLE questions MODIFY COLUMN subject_id INT(11);

-- SCRIPT DE INSERÇÃO - 220 NOVAS QUESTÕES (CORRIGIDO)

INSERT INTO questions (subject_id, question_text, options, correct_answer, topic, explanation) VALUES
('artes', 'Qual pintor holandês é famoso por cortar a própria orelha e pintar "A Noite Estrelada"?', '["Rembrandt", "Vincent van Gogh", "Johannes Vermeer", "Piet Mondrian"]', 'Vincent van Gogh', 'Pós-Impressionismo', 'Van Gogh é um dos ícones do pós-impressionismo, conhecido por sua instabilidade emocional e pinceladas vibrantes.'),
('artes', 'O que é uma "Instalação" na arte contemporânea?', '["Uma pintura de parede", "Uma obra que ocupa um espaço e envolve o espectador", "A colocação de quadros no museu", "Uma escultura de bronze"]', 'Uma obra que ocupa um espaço e envolve o espectador', 'Arte Contemporânea', 'A instalação cria um ambiente imersivo, diferindo da simples exibição de objetos.'),
('artes', 'O movimento Dadaísta surgiu com o objetivo de:', '["Valorizar a técnica acadêmica", "Questionar e negar a própria arte e a razão", "Retratar a natureza fielmente", "Promover a arte sacra"]', 'Questionar e negar a própria arte e a razão', 'Vanguardas Europeias', 'O Dadaísmo foi uma reação ao absurdo da Primeira Guerra Mundial, propondo a antiarte.'),
('artes', 'Quem pintou a "Mona Lisa"?', '["Michelangelo", "Rafael", "Leonardo da Vinci", "Donatello"]', 'Leonardo da Vinci', 'Renascimento', 'É a obra mais famosa de Da Vinci e do Renascimento italiano.'),
('artes', 'Qual técnica utiliza pequenos pedaços de vidro ou pedra para formar imagens?', '["Afresco", "Mosaico", "Xilogravura", "Aquarela"]', 'Mosaico', 'Técnicas Artísticas', 'Muito comum na arte Bizantina e Romana.'),
('artes', 'O que é "Perspectiva" na pintura?', '["O uso de cores vibrantes", "A técnica para criar ilusão de profundidade em uma superfície plana", "A pintura de retratos", "O uso de formas geométricas"]', 'A técnica para criar ilusão de profundidade em uma superfície plana', 'Fundamentos da Arte', 'Desenvolvida matematicamente no Renascimento para simular o espaço 3D.'),
('artes', 'Salvador Dalí é o maior representante do:', '["Surrealismo", "Impressionismo", "Realismo", "Futurismo"]', 'Surrealismo', 'Vanguardas Europeias', 'Suas obras exploram o mundo dos sonhos e do inconsciente.'),
('artes', 'A "Pop Art" utilizava imagens de:', '["Deuses gregos", "Paisagens rurais", "Cultura de massa e consumo (HQs, latas, celebridades)", "Cenas de guerra"]', 'Cultura de massa e consumo (HQs, latas, celebridades)', 'Arte Contemporânea', 'Andy Warhol é um grande nome, usando latas de sopa Campbell e Marilyn Monroe.'),
('artes', 'Qual destes é um instrumento de percussão?', '["Violino", "Flauta", "Atabaque", "Saxofone"]', 'Atabaque', 'Música', 'Instrumentos de percussão produzem som através do impacto ou agitação.'),
('artes', 'A arquitetura gótica é conhecida por:', '["Arcos redondos e paredes grossas", "Arcos ogivais (pontiagudos) e vitrais", "Colunas gregas", "Simplicidade e falta de ornamentos"]', 'Arcos ogivais (pontiagudos) e vitrais', 'História da Arte', 'As catedrais góticas buscavam a verticalidade e a luz.'),
('artes', 'Frida Kahlo é uma artista de qual nacionalidade?', '["Espanhola", "Mexicana", "Argentina", "Brasileira"]', 'Mexicana', 'Artistas', 'Conhecida por seus autorretratos e inspiração na cultura mexicana.'),
('artes', 'O que é Xilogravura?', '["Gravura em metal", "Pintura em tecido", "Gravura em madeira (como um carimbo)", "Escultura em argila"]', 'Gravura em madeira (como um carimbo)', 'Técnicas Artísticas', 'Muito utilizada na literatura de cordel no Brasil.'),
('artes', 'Qual movimento valorizava a luz natural e a pintura ao ar livre?', '["Impressionismo", "Barroco", "Gótico", "Cubismo"]', 'Impressionismo', 'História da Arte', 'Monet e Renoir buscavam capturar a impressão momentânea da luz.'),
('artes', 'Quem esculpiu o "David" e pintou o teto da Capela Sistina?', '["Leonardo da Vinci", "Michelangelo", "Boticelli", "Caravaggio"]', 'Michelangelo', 'Renascimento', 'Um dos maiores gênios do Renascimento.'),
('artes', 'O Teatro de Sombras é originário de qual continente?', '["Europa", "Ásia", "América", "África"]', 'Ásia', 'Teatro', 'Muito tradicional na China e Indonésia.'),
('artes', 'Hélio Oiticica criou os "Parangolés". O que eram?', '["Quadros a óleo", "Capas/Estandartes para serem vestidas e dançadas", "Estátuas de bronze", "Livros de poesia"]', 'Capas/Estandartes para serem vestidas e dançadas', 'Arte Brasileira', 'A obra só existia plenamente com o movimento do corpo, ligada ao samba.'),
('artes', 'O que define uma cor "secundária"?', '["A mistura de preto e branco", "A mistura de duas cores primárias", "A mistura de todas as cores", "Uma cor que não pode ser misturada"]', 'A mistura de duas cores primárias', 'Teoria das Cores', 'Ex: Azul + Amarelo = Verde.'),
('artes', 'O Coliseu está localizado em:', '["Atenas", "Roma", "Paris", "Cairo"]', 'Roma', 'Arquitetura', 'Símbolo do Império Romano.'),
('artes', 'Na dança, o que é uma "Coreografia"?', '["O figurino", "O cenário", "A sequência de movimentos planejados", "A música de fundo"]', 'A sequência de movimentos planejados', 'Dança', 'É o roteiro de movimentos que os dançarinos executam.'),
('artes', 'Romero Britto é um artista brasileiro conhecido por seu estilo:', '["Sombrio e realista", "Colorido, geométrico e pop", "Abstrato e minimalista", "Clássico e acadêmico"]', 'Colorido, geométrico e pop', 'Arte Brasileira', 'Suas obras são mundialmente famosas por cores vibrantes e traços fortes.');

INSERT INTO questions (subject_id, question_text, options, correct_answer, topic, explanation) VALUES
('biologia', 'Qual molécula carrega a informação genética na maioria dos seres vivos?', '["ATP", "DNA", "RNA", "Proteína"]', 'DNA', 'Genética', 'O Ácido Desoxirribonucleico contém as instruções genéticas.'),
('biologia', 'Qual o processo pelo qual as plantas produzem seu próprio alimento?', '["Respiração", "Fotossíntese", "Fermentação", "Transpiração"]', 'Fotossíntese', 'Botânica', 'Utilizam luz solar, água e gás carbônico para produzir glicose.'),
('biologia', 'As hemácias (glóbulos vermelhos) são responsáveis por:', '["Coagulação do sangue", "Defesa do organismo", "Transporte de oxigênio", "Produção de hormônios"]', 'Transporte de oxigênio', 'Fisiologia Humana', 'Possuem hemoglobina que se liga ao oxigênio.'),
('biologia', 'A qual reino pertencem os cogumelos e bolores?', '["Plantae", "Animalia", "Fungi", "Protista"]', 'Fungi', 'Taxonomia', 'Não são plantas pois não fazem fotossíntese.'),
('biologia', 'Os vírus são considerados seres:', '["Unicelulares", "Pluricelulares", "Acelulares", "Procariontes"]', 'Acelulares', 'Microbiologia', 'Não possuem células e precisam de um hospedeiro para se reproduzir.'),
('biologia', 'Qual é a célula fundamental do sistema nervoso?', '["Neurônio", "Néfron", "Hepatócito", "Miócito"]', 'Neurônio', 'Histologia', 'Responsável pela transmissão de impulsos nervosos.'),
('biologia', 'Um conjunto de seres vivos interagindo com o meio ambiente forma um:', '["População", "Comunidade", "Ecossistema", "Biosfera"]', 'Ecossistema', 'Ecologia', 'Envolve fatores bióticos (vivos) e abióticos (não vivos).'),
('biologia', 'Na relação de predatismo, o que acontece?', '["Ambos se beneficiam", "Um mata o outro para se alimentar", "Um vive dentro do outro sem matar", "Eles competem por território"]', 'Um mata o outro para se alimentar', 'Ecologia', 'Ex: Leão caçando uma zebra.'),
('biologia', 'O equilíbrio interno do corpo humano é chamado de:', '["Metabolismo", "Homeostase", "Anabolismo", "Catabolismo"]', 'Homeostase', 'Fisiologia', 'É a capacidade de manter o ambiente interno estável.'),
('biologia', 'Qual pigmento dá a cor verde às plantas?', '["Melanina", "Clorofila", "Hemoglobina", "Caroteno"]', 'Clorofila', 'Botânica', 'Essencial para a absorção de luz na fotossíntese.'),
('biologia', 'O "Darwinismo" baseia-se na ideia de:', '["Lei do Uso e Desuso", "Ancestralidade Comum e Seleção Natural", "Criação Divina", "Imutabilidade das espécies"]', 'Ancestralidade Comum e Seleção Natural', 'Evolução', 'As espécies mudam ao longo do tempo e compartilham ancestrais.'),
('biologia', 'A planária e a tênia são exemplos de:', '["Nematódeos", "Platelmintos", "Anelídeos", "Cnidários"]', 'Platelmintos', 'Zoologia', 'São vermes de corpo achatado.'),
('biologia', 'Qual característica é exclusiva dos mamíferos?', '["Pêlos e glândulas mamárias", "Ovos com casca", "Escamas", "Respiração branquial"]', 'Pêlos e glândulas mamárias', 'Zoologia', 'Servem para proteção térmica e alimentação dos filhotes.'),
('biologia', 'O tipo sanguíneo considerado "Doador Universal" é:', '["A", "B", "AB", "O negativo"]', 'O negativo', 'Genética', 'Não possui antígenos A ou B nem fator Rh, minimizando rejeição.'),
('biologia', 'O movimento de água através de uma membrana semipermeável chama-se:', '["Difusão", "Osmose", "Fagocitose", "Exocitose"]', 'Osmose', 'Citologia', 'A água vai do meio menos concentrado para o mais concentrado.'),
('biologia', 'As enzimas funcionam como:', '["Fontes de energia", "Catalisadores biológicos", "Material genético", "Reservas de gordura"]', 'Catalisadores biológicos', 'Bioquímica', 'Aceleram reações químicas no organismo.'),
('biologia', 'A divisão celular que produz gametas (espermatozoides e óvulos) é:', '["Mitose", "Meiose", "Fissão", "Regeneração"]', 'Meiose', 'Citologia', 'Reduz o número de cromossomos pela metade.'),
('biologia', 'A falta de Vitamina C causa qual doença?', '["Raquitismo", "Escorbuto", "Cegueira noturna", "Anemia"]', 'Escorbuto', 'Nutrição', 'Causa sangramento nas gengivas e fraqueza.'),
('biologia', 'Antibióticos são eficazes contra:', '["Vírus", "Bactérias", "Fungos", "Todos os anteriores"]', 'Bactérias', 'Saúde', 'Não matam vírus, por isso não curam gripe.'),
('biologia', 'O vetor transmissor da Dengue, Zika e Chikungunya é:', '["Barbeiro", "Mosquito Anopheles", "Mosquito Aedes aegypti", "Carrapato"]', 'Mosquito Aedes aegypti', 'Saúde Pública', 'A fêmea do mosquito transmite o vírus ao picar.');

INSERT INTO questions (subject_id, question_text, options, correct_answer, topic, explanation) VALUES
('educacao-fisica', 'Quantos jogadores formam um time titular de Basquete?', '["5", "6", "7", "11"]', '5', 'Esportes Coletivos', 'São 5 jogadores em quadra para cada time.'),
('educacao-fisica', 'No Handebol, é proibido:', '["Quicar a bola", "Dar 3 passos com a bola", "Tocar a bola com os pés (exceto goleiro)", "Arremessar saltando"]', 'Tocar a bola com os pés (exceto goleiro)', 'Esportes Coletivos', 'O jogo é jogado exclusivamente com as mãos.'),
('educacao-fisica', 'O que é Frequência Cardíaca?', '["A pressão do sangue", "O número de batimentos do coração por minuto", "A quantidade de oxigênio no sangue", "A velocidade da corrida"]', 'O número de batimentos do coração por minuto', 'Fisiologia', 'Indicador importante da intensidade do esforço físico.'),
('educacao-fisica', 'Qual a função do aquecimento antes da atividade física?', '["Cansar o atleta", "Prevenir lesões e preparar o corpo", "Aumentar a massa muscular instantaneamente", "Resfriar o corpo"]', 'Prevenir lesões e preparar o corpo', 'Treinamento', 'Aumenta a temperatura corporal e o fluxo sanguíneo.'),
('educacao-fisica', 'No Voleibol, o "rodízio" dos jogadores ocorre quando:', '["O time marca um ponto", "O time recupera o direito de sacar", "O técnico pede tempo", "A bola sai da quadra"]', 'O time recupera o direito de sacar', 'Esportes Coletivos', 'Todos os jogadores devem mudar de posição no sentido horário.'),
('educacao-fisica', 'Quais são os 4 estilos oficiais de natação?', '["Crawl, Costas, Peito e Borboleta", "Livre, Cachorrinho, Mergulho e Costas", "Rápido, Lento, Fundo e Raso", "Borboleta, Sapo, Golfinho e Tubarão"]', 'Crawl, Costas, Peito e Borboleta', 'Esportes Individuais', 'São os estilos disputados em competições olímpicas.'),
('educacao-fisica', 'A prova de 100 metros rasos pertence a qual modalidade?', '["Natação", "Ciclismo", "Atletismo", "Ginástica"]', 'Atletismo', 'Esportes Individuais', 'É a prova mais rápida do atletismo de pista.'),
('educacao-fisica', 'A trave de equilíbrio é um aparelho de qual esporte?', '["Ginástica Rítmica", "Ginástica Artística", "Salto em Altura", "Parkour"]', 'Ginástica Artística', 'Ginástica', 'Aparelho exclusivamente feminino nas Olimpíadas.'),
('educacao-fisica', 'O jogo de "Queimada" tem como objetivo principal:', '["Fazer gols", "Acertar os adversários com a bola para eliminá-los", "Correr mais rápido", "Pular corda"]', 'Acertar os adversários com a bola para eliminá-los', 'Jogos e Brincadeiras', 'Também conhecido como "Baleado" ou "Dodgeball".'),
('educacao-fisica', 'O que significa "Fair Play"?', '["Jogar sujo", "Jogo justo e conduta ética", "Ganhar a qualquer custo", "Perder de propósito"]', 'Jogo justo e conduta ética', 'Ética no Esporte', 'Respeito às regras, aos adversários e árbitros.'),
('educacao-fisica', 'No Judô, a pontuação máxima que encerra a luta chama-se:', '["Wazari", "Yuko", "Ippon", "Koka"]', 'Ippon', 'Lutas', 'Equivale ao nocaute, golpe perfeito.'),
('educacao-fisica', 'O Tênis de Mesa é popularmente conhecido como:', '["Ping-Pong", "Badminton", "Squash", "Padel"]', 'Ping-Pong', 'Esportes de Rede', 'Jogado com raquetes pequenas e bola leve sobre uma mesa.'),
('educacao-fisica', 'Qual esporte utiliza uma peteca?', '["Tênis", "Badminton", "Vôlei", "Hóquei"]', 'Badminton', 'Esportes de Rede', 'O objetivo é fazer a peteca tocar o chão da quadra adversária.'),
('educacao-fisica', 'Uma "entorse" é uma lesão que afeta principalmente:', '["Os ossos", "A pele", "Os ligamentos de uma articulação", "O cérebro"]', 'Os ligamentos de uma articulação', 'Saúde', 'Comum no tornozelo ao "torcer o pé".'),
('educacao-fisica', 'Por que a hidratação é vital durante o exercício?', '["Para ganhar peso", "Para repor água e sais minerais perdidos no suor", "Para encher o estômago", "Para diminuir a força"]', 'Para repor água e sais minerais perdidos no suor', 'Saúde', 'A desidratação prejudica o desempenho e a saúde.'),
('educacao-fisica', 'Samba de Gafieira e Forró são exemplos de:', '["Danças Urbanas", "Danças de Salão", "Danças Clássicas", "Lutas"]', 'Danças de Salão', 'Dança', 'Dançadas em pares.'),
('educacao-fisica', 'O Skate tornou-se esporte olímpico em:', '["2000", "2016", "2021 (Tóquio 2020)", "Ainda não é olímpico"]', '2021 (Tóquio 2020)', 'Esportes Radicais', 'Nas modalidades Street e Park.'),
('educacao-fisica', 'O esporte praticado sobre ondas com uma prancha é o:', '["Kitesurf", "Windsurf", "Surfe", "Bodyboard"]', 'Surfe', 'Esportes de Aventura', 'Exige equilíbrio e leitura das ondas.'),
('educacao-fisica', 'A prática de Yoga busca:', '["Apenas força muscular", "Competição extrema", "União entre corpo e mente", "Violência"]', 'União entre corpo e mente', 'Práticas Corporais', 'Utiliza posturas (asanas), respiração e meditação.'),
('educacao-fisica', 'O método Pilates foca principalmente em:', '["Fortalecimento do ''Core'' (centro de força) e postura", "Levantamento de peso máximo", "Corrida de longa distância", "Saltos acrobáticos"]', 'Fortalecimento do ''Core'' (centro de força) e postura', 'Práticas Corporais', 'Criado por Joseph Pilates para reabilitação e condicionamento.');

INSERT INTO questions (subject_id, question_text, options, correct_answer, topic, explanation) VALUES
('filosofia', 'O método de perguntas e respostas de Sócrates é chamado de:', '["Maiêutica", "Retórica", "Sofismo", "Dogmatismo"]', 'Maiêutica', 'Filosofia Antiga', 'Significa "parto das ideias", ajudando o interlocutor a descobrir a verdade.'),
('filosofia', 'Para Platão, o mundo verdadeiro e perfeito é o:', '["Mundo Sensível", "Mundo das Ideias", "Mundo Material", "Mundo dos Sonhos"]', 'Mundo das Ideias', 'Filosofia Antiga', 'O mundo físico seria apenas uma cópia imperfeita das Ideias.'),
('filosofia', 'Aristóteles escreveu sobre a busca da felicidade na obra:', '["O Banquete", "Ética a Nicômaco", "Leviatã", "O Capital"]', 'Ética a Nicômaco', 'Filosofia Antiga', 'A felicidade (Eudaimonia) seria o fim último das ações humanas.'),
('filosofia', 'Santo Agostinho é o principal nome da:', '["Escolástica", "Patrística", "Filosofia Moderna", "Sofística"]', 'Patrística', 'Filosofia Medieval', 'Buscou conciliar a fé cristã com a filosofia de Platão.'),
('filosofia', 'São Tomás de Aquino tentou unir a fé cristã com o pensamento de:', '["Platão", "Sócrates", "Aristóteles", "Epicuro"]', 'Aristóteles', 'Filosofia Medieval', 'Principal nome da Escolástica.'),
('filosofia', 'John Locke é considerado o pai do:', '["Racionalismo", "Empirismo", "Idealismo", "Existencialismo"]', 'Empirismo', 'Filosofia Moderna', 'Afirmava que a mente é uma "tábula rasa" e todo conhecimento vem da experiência.'),
('filosofia', 'Immanuel Kant propôs o "Criticismo" para resolver o debate entre:', '["Fé e Razão", "Racionalismo e Empirismo", "Bem e Mal", "Deus e Diabo"]', 'Racionalismo e Empirismo', 'Filosofia Moderna', 'Analisou os limites e possibilidades da razão humana.'),
('filosofia', 'O conceito de "Super-homem" (Übermensch) pertence a:', '["Hegel", "Marx", "Nietzsche", "Freud"]', 'Nietzsche', 'Filosofia Contemporânea', 'Aquele que supera a moral tradicional e cria seus próprios valores.'),
('filosofia', 'O Utilitarismo defende que uma ação é correta se:', '["Seguir os mandamentos divinos", "Trouxer a maior felicidade para o maior número de pessoas", "For feita por dever", "Beneficiar apenas o agente"]', 'Trouxer a maior felicidade para o maior número de pessoas', 'Ética', 'Jeremy Bentham e John Stuart Mill são expoentes.'),
('filosofia', 'O Ceticismo é a corrente filosófica que:', '["Acredita em tudo", "Duvida da possibilidade de conhecimento absoluto", "Defende dogmas religiosos", "Busca o prazer"]', 'Duvida da possibilidade de conhecimento absoluto', 'Teoria do Conhecimento', 'Questiona as certezas e verdades absolutas.'),
('filosofia', 'O Epicurismo associa a felicidade ao:', '["Sofrimento", "Prazer moderado e ausência de dor", "Poder político", "Acúmulo de riquezas"]', 'Prazer moderado e ausência de dor', 'Filosofia Helenística', 'Buscava a ataraxia (tranquilidade da alma).'),
('filosofia', 'Para os Estoicos, o sábio deve:', '["Aceitar o destino e controlar as emoções", "Buscar o prazer a todo custo", "Revoltar-se contra os deuses", "Isolar-se em uma caverna"]', 'Aceitar o destino e controlar as emoções', 'Filosofia Helenística', 'A virtude é o único bem.'),
('filosofia', 'Rousseau afirmou que "O homem nasce bom, mas...":', '["A natureza o corrompe", "A sociedade o corrompe", "O pecado o destrói", "Ele se torna mau sozinho"]', 'A sociedade o corrompe', 'Contratualismo', 'Criticava a propriedade privada e a desigualdade.'),
('filosofia', 'Hannah Arendt criou o conceito de "Banalidade do Mal" ao analisar:', '["O Comunismo", "O Nazismo (Julgamento de Eichmann)", "A Revolução Francesa", "O Império Romano"]', 'O Nazismo (Julgamento de Eichmann)', 'Filosofia Política', 'O mal pode ser praticado por pessoas comuns que apenas "cumprem ordens" sem pensar.'),
('filosofia', 'Michel Foucault analisou as relações de poder e as prisões na obra:', '["Vigiar e Punir", "O Contrato Social", "Assim Falou Zaratustra", "A Riqueza das Nações"]', 'Vigiar e Punir', 'Filosofia Contemporânea', 'Estudou como a sociedade disciplina os corpos.'),
('filosofia', 'Simone de Beauvoir escreveu: "Não se nasce mulher, ...":', '["Torna-se mulher", "Nasce-se mãe", "Morre-se mulher", "Vive-se mulher"]', 'Torna-se mulher', 'Existencialismo/Feminismo', 'O gênero é uma construção social e cultural.'),
('filosofia', 'Para Sartre, "estamos condenados a ser...":', '["Felizes", "Livres", "Escravos", "Sozinhos"]', 'Livres', 'Existencialismo', 'Não podemos escapar da responsabilidade de nossas escolhas.'),
('filosofia', 'Albert Camus utilizou o "Mito de Sísifo" para discutir:', '["O absurdo da existência", "A vitória da razão", "A glória dos deuses", "A ciência moderna"]', 'O absurdo da existência', 'Existencialismo', 'A vida não tem sentido intrínseco, mas devemos vivê-la mesmo assim.'),
('filosofia', 'Os filósofos pré-socráticos buscavam a "Arché", que significa:', '["O fim do mundo", "O princípio originário de todas as coisas", "O deus supremo", "A melhor forma de governo"]', 'O princípio originário de todas as coisas', 'Filosofia Antiga', 'Ex: Água (Tales), Ar (Anaxímenes).'),
('filosofia', 'Heráclito afirmou que "Ninguém se banha duas vezes no mesmo...":', '["Mar", "Lago", "Rio", "Chuveiro"]', 'Rio', 'Pré-Socráticos', 'Tudo flui, tudo está em constante mudança.');

INSERT INTO questions (subject_id, question_text, options, correct_answer, topic, explanation) VALUES
('fisica', 'A 2ª Lei de Newton (Princípio Fundamental da Dinâmica) é expressa pela fórmula:', '["F = m . a", "V = d / t", "E = m . c²", "P = m . g"]', 'F = m . a', 'Dinâmica', 'Força resultante é igual à massa vezes a aceleração.'),
('fisica', 'A 3ª Lei de Newton é conhecida como:', '["Lei da Inércia", "Lei da Ação e Reação", "Lei da Gravidade", "Lei da Conservação"]', 'Lei da Ação e Reação', 'Dinâmica', 'Para toda ação há uma reação de mesma intensidade, mesma direção e sentido oposto.'),
('fisica', 'Qual a unidade de Potência Elétrica?', '["Joule", "Watt", "Newton", "Pascal"]', 'Watt', 'Eletricidade', 'Homenagem a James Watt.'),
('fisica', 'Qual é a velocidade da luz no vácuo?', '["300.000 km/s", "340 m/s", "1.000 km/h", "Infinite"]', '300.000 km/s', 'Óptica', 'Aproximadamente 3 x 10^8 m/s.'),
('fisica', 'O som é uma onda:', '["Eletromagnética", "Mecânica", "Gravitacional", "Luminosa"]', 'Mecânica', 'Ondulatória', 'Precisa de um meio material (ar, água, sólido) para se propagar.'),
('fisica', 'Qual a diferença entre Calor e Temperatura?', '["São a mesma coisa", "Calor é energia em trânsito, Temperatura é agitação molecular", "Temperatura é energia, Calor é medida", "Calor é frio, Temperatura é quente"]', 'Calor é energia em trânsito, Temperatura é agitação molecular', 'Termologia', 'Calor flui do corpo mais quente para o mais frio.'),
('fisica', 'A dilatação térmica ocorre quando:', '["Um corpo esfria e aumenta de tamanho", "Um corpo esquenta e aumenta de tamanho", "Um corpo muda de cor", "Um corpo derrete"]', 'Um corpo esquenta e aumenta de tamanho', 'Termologia', 'O aumento da temperatura agita as moléculas, que ocupam mais espaço.'),
('fisica', 'Em um espelho plano, a imagem formada é:', '["Virtual, direita e do mesmo tamanho", "Real e invertida", "Maior e distorcida", "Menor e virtual"]', 'Virtual, direita e do mesmo tamanho', 'Óptica', 'A imagem parece estar atrás do espelho.'),
('fisica', 'A reflexão total é o princípio de funcionamento da:', '["Lâmpada incandescente", "Fibra óptica", "Bateria", "Bússola"]', 'Fibra óptica', 'Óptica', 'A luz fica "presa" dentro do núcleo da fibra.'),
('fisica', 'A propriedade da matéria de resistir à mudança de movimento chama-se:', '["Força", "Aceleração", "Inércia", "Peso"]', 'Inércia', 'Mecânica', 'Quanto maior a massa, maior a inércia.'),
('fisica', 'A força que se opõe ao movimento entre superfícies é:', '["Gravidade", "Empuxo", "Atrito", "Tensão"]', 'Atrito', 'Dinâmica', 'Pode ser estático ou cinético.'),
('fisica', 'A Lei de Hooke descreve a força elástica em:', '["Molas", "Líquidos", "Gases", "Ímãs"]', 'Molas', 'Dinâmica', 'F = -k . x (deformação).'),
('fisica', 'Densidade é calculada por:', '["Massa x Volume", "Massa / Volume", "Volume / Massa", "Peso / Altura"]', 'Massa / Volume', 'Hidrostática', 'Determina se um objeto flutua ou afunda.'),
('fisica', 'O Princípio de Arquimedes explica o:', '["Voo dos pássaros", "Funcionamento de ímãs", "Empuxo", "Som"]', 'Empuxo', 'Hidrostática', 'Todo corpo mergulhado em um fluido sofre uma força vertical para cima.'),
('fisica', 'A região ao redor de um ímã onde atua a força magnética é o:', '["Campo elétrico", "Campo magnético", "Campo gravitacional", "Vácuo"]', 'Campo magnético', 'Magnetismo', 'Visualizado com limalha de ferro.'),
('fisica', 'A corrente elétrica que muda de sentido periodicamente (usada nas tomadas) é a:', '["Contínua (CC)", "Alternada (CA)", "Estática", "Magnética"]', 'Alternada (CA)', 'Eletricidade', 'Gerada em usinas e transmitida para as casas.'),
('fisica', 'A energia armazenada em um objeto devido à sua altura é:', '["Cinética", "Potencial Gravitacional", "Térmica", "Química"]', 'Potencial Gravitacional', 'Mecânica', 'Ep = m . g . h.'),
('fisica', 'Em Física, "Trabalho" é:', '["Emprego", "Energia transferida por uma força ao deslocar um corpo", "Esforço mental", "Cansaço"]', 'Energia transferida por uma força ao deslocar um corpo', 'Mecânica', 'T = F . d.'),
('fisica', 'O modelo atômico de Bohr introduziu a ideia de:', '["Núcleo denso", "Níveis de energia (camadas)", "Pudim de passas", "Átomo indivisível"]', 'Níveis de energia (camadas)', 'Física Moderna', 'Os elétrons orbitam em camadas específicas.'),
('fisica', 'A energia do Sol provém da:', '["Queima de carvão", "Fissão nuclear", "Fusão nuclear", "Eletricidade"]', 'Fusão nuclear', 'Física Moderna', 'Átomos de hidrogênio se fundem formando hélio e liberando energia.');

INSERT INTO questions (subject_id, question_text, options, correct_answer, topic, explanation) VALUES
('historia', 'A civilização da Mesopotâmia desenvolveu-se entre os rios:', '["Nilo e Eufrates", "Tigre e Eufrates", "Ganges e Indo", "Amarelo e Azul"]', 'Tigre e Eufrates', 'Antiguidade Oriental', 'No atual Iraque ("Terra entre rios").'),
('historia', 'O Egito Antigo dependia das cheias do rio:', '["Nilo", "Amazonas", "Danúbio", "Tigre"]', 'Nilo', 'Antiguidade Oriental', 'O rio era vital para a agricultura no deserto.'),
('historia', 'A democracia nasceu em qual cidade-estado grega?', '["Esparta", "Atenas", "Troia", "Corinto"]', 'Atenas', 'Antiguidade Clássica', 'Permitia a participação dos cidadãos (homens livres) nas decisões.'),
('historia', 'O sistema político e econômico da Idade Média baseava-se na posse de terras e chamava-se:', '["Capitalismo", "Socialismo", "Feudalismo", "Escravismo"]', 'Feudalismo', 'Idade Média', 'Relação entre suseranos e vassalos.'),
('historia', 'As Cruzadas foram expedições militares cristãs para recuperar:', '["Roma", "Paris", "Jerusalém (Terra Santa)", "Constantinopla"]', 'Jerusalém (Terra Santa)', 'Idade Média', 'Conflito entre Cristãos e Muçulmanos.'),
('historia', 'O "Renascimento Comercial" na Baixa Idade Média foi impulsionado pelo surgimento das:', '["Feiras e Burgos", "Fábricas", "Fazendas", "Igrejas"]', 'Feiras e Burgos', 'Idade Média', 'Deu origem à burguesia.'),
('historia', 'Martinho Lutero iniciou qual movimento religioso no século XVI?', '["Contrarreforma", "Reforma Protestante", "Cruzadas", "Inquisição"]', 'Reforma Protestante', 'Idade Moderna', 'Criticou a venda de indulgências pela Igreja Católica.'),
('historia', 'Qual filósofo iluminista propôs a divisão dos poderes em Executivo, Legislativo e Judiciário?', '["Voltaire", "Rousseau", "Montesquieu", "Diderot"]', 'Montesquieu', 'Iluminismo', 'Para evitar o abuso de poder (O Espírito das Leis).'),
('historia', 'A Independência dos Estados Unidos (1776) influenciou:', '["A manutenção das monarquias", "Movimentos de independência na América Latina", "O feudalismo", "A união da Europa"]', 'Movimentos de independência na América Latina', 'Idade Moderna', 'Foi a primeira colônia a romper com a metrópole.'),
('historia', 'A Revolução Russa de 1917 implantou o:', '["Fascismo", "Nazismo", "Socialismo/Comunismo", "Anarquismo"]', 'Socialismo/Comunismo', 'Idade Contemporânea', 'Liderada por Lênin e os Bolcheviques.'),
('historia', 'A Crise de 1929 foi causada pelo:', '["Quebra da Bolsa de Nova York", "Início da Guerra Fria", "Ataque a Pearl Harbor", "Queda do Muro de Berlim"]', 'Quebra da Bolsa de Nova York', 'Idade Contemporânea', 'Crise de superprodução do capitalismo.'),
('historia', 'A Guerra do Vietnã foi um conflito inserido no contexto da:', '["Primeira Guerra Mundial", "Segunda Guerra Mundial", "Guerra Fria", "Guerra do Golfo"]', 'Guerra Fria', 'Idade Contemporânea', 'EUA (apoiando o Sul) vs Vietnã do Norte (Comunista).'),
('historia', 'A queda do Muro de Berlim em 1989 simbolizou:', '["O início do Nazismo", "O fim da Guerra Fria e reunificação alemã", "O início da Primeira Guerra", "A divisão da China"]', 'O fim da Guerra Fria e reunificação alemã', 'Idade Contemporânea', 'O muro dividia o mundo capitalista do socialista.'),
('historia', 'Cristóvão Colombo chegou à América em:', '["1492", "1500", "1453", "1789"]', '1492', 'Grandes Navegações', 'Acreditava ter chegado às Índias.'),
('historia', 'As Capitanias Hereditárias foram:', '["Divisões administrativas do Brasil Colonial", "Cargos militares", "Impostos", "Tipos de navios"]', 'Divisões administrativas do Brasil Colonial', 'Brasil Colônia', 'Territórios doados pela Coroa Portuguesa a donatários.'),
('historia', 'O Ciclo do Ouro no Brasil (Séc. XVIII) deslocou o eixo econômico para:', '["O Nordeste", "O Sul", "O Sudeste (Minas Gerais)", "O Norte"]', 'O Sudeste (Minas Gerais)', 'Brasil Colônia', 'Levou à mudança da capital de Salvador para o Rio de Janeiro.'),
('historia', 'Tiradentes foi o mártir de qual revolta?', '["Revolução Farroupilha", "Inconfidência Mineira", "Conjuração Baiana", "Revolta da Chibata"]', 'Inconfidência Mineira', 'Brasil Colônia', 'Movimento separatista contra os impostos portugueses.'),
('historia', 'A Proclamação da República no Brasil ocorreu em:', '["7 de setembro de 1822", "15 de novembro de 1889", "13 de maio de 1888", "21 de abril de 1792"]', '15 de novembro de 1889', 'Brasil República', 'Liderada pelo Marechal Deodoro da Fonseca.'),
('historia', 'O AI-5 (Ato Institucional nº 5) marcou o período mais duro da:', '["Era Vargas", "Ditadura Militar", "República Velha", "Nova República"]', 'Ditadura Militar', 'Brasil República', 'Fechou o congresso e suspendeu direitos civis em 1968.'),
('historia', 'A Constituição de 1988 é conhecida como:', '["Constituição Outorgada", "Constituição Cidadã", "Constituição Polaca", "Constituição Provisória"]', 'Constituição Cidadã', 'Brasil República', 'Restabeleceu a democracia e ampliou direitos sociais.');

INSERT INTO questions (subject_id, question_text, options, correct_answer, topic, explanation) VALUES
('ingles', 'Complete: "I ______ a student."', '["is", "are", "am", "be"]', 'am', 'Grammar - Verb to Be', 'I am, You are, He is.'),
('ingles', 'O "Simple Future" pode ser formado com:', '["Did", "Will", "Have", "Does"]', 'Will', 'Grammar - Future Tense', 'Ex: I will travel tomorrow.'),
('ingles', 'Qual pronome substitui "My friends and I"?', '["They", "We", "You", "He"]', 'We', 'Grammar - Pronouns', 'Nós (Eu e meus amigos).'),
('ingles', 'Qual destas cores é "Purple"?', '["Vermelho", "Roxo", "Amarelo", "Verde"]', 'Roxo', 'Vocabulary', 'Purple = Roxo.'),
('ingles', 'Qual dia vem depois de "Tuesday"?', '["Monday", "Wednesday", "Thursday", "Friday"]', 'Wednesday', 'Vocabulary', 'Terça -> Quarta.'),
('ingles', 'O Natal (Christmas) é celebrado em qual mês?', '["January", "December", "July", "March"]', 'December', 'Vocabulary', 'Dezembro.'),
('ingles', 'O comparativo de "Big" é:', '["Bigger", "More big", "Bigest", "Biggers"]', 'Bigger', 'Grammar - Comparatives', 'Adjetivo curto dobra a consoante + er.'),
('ingles', 'O superlativo de "Good" é:', '["Goodest", "Best", "Better", "Most good"]', 'Best', 'Grammar - Superlatives', 'Good (Bom) -> Better (Melhor) -> Best (O Melhor).'),
('ingles', 'Preposição usada para dias da semana (Ex: ___ Monday):', '["In", "At", "On", "To"]', 'On', 'Grammar - Prepositions', 'On Monday, On Friday.'),
('ingles', 'A palavra "Push" em uma porta significa:', '["Puxar", "Empurrar", "Pare", "Entre"]', 'Empurrar', 'False Cognates', 'Parece "Puxar", mas é "Empurrar". Puxar é "Pull".'),
('ingles', 'Qual tempo verbal usa "Have/Has + Past Participle"?', '["Simple Past", "Present Perfect", "Future", "Continuous"]', 'Present Perfect', 'Grammar - Verb Tenses', 'Ex: I have finished.'),
('ingles', 'Passe para a voz passiva: "She eats the apple."', '["The apple is eaten by her", "The apple was ate", "She is eating", "The apple eats she"]', 'The apple is eaten by her', 'Grammar - Passive Voice', 'Objeto vira sujeito + verbo to be + particípio.'),
('ingles', 'Complete a Tag Question: "You are happy, ______?"', '["aren''t you", "are you", "do you", "don''t you"]', 'aren''t you', 'Grammar - Tag Questions', 'Frase afirmativa -> Tag negativa.'),
('ingles', 'O verbo modal "Can" expressa:', '["Obrigação", "Habilidade ou Permissão", "Passado", "Futuro"]', 'Habilidade ou Permissão', 'Grammar - Modals', 'Ex: I can swim (Habilidade).'),
('ingles', 'Para dar um conselho, usamos:', '["Must", "Should", "Will", "Do"]', 'Should', 'Grammar - Modals', 'Ex: You should study (Você deveria estudar).'),
('ingles', 'O que significa "Uncle"?', '["Avô", "Tio", "Primo", "Irmão"]', 'Tio', 'Vocabulary - Family', 'Tio.'),
('ingles', 'Como se escreve "20" em inglês?', '["Twelve", "Twenty", "Thirty", "Two"]', 'Twenty', 'Vocabulary - Numbers', '20.'),
('ingles', 'O "Genitive Case" (''s) indica:', '["Plural", "Posse", "Verbo", "Negação"]', 'Posse', 'Grammar', 'Ex: John''s car (O carro do John).'),
('ingles', 'O plural de "Foot" (pé) é:', '["Foots", "Feet", "Feets", "Footes"]', 'Feet', 'Grammar - Plurals', 'Plural irregular.'),
('ingles', 'Qual artigo usamos antes de "Apple"?', '["A", "An", "Two", "No"]', 'An', 'Grammar - Articles', 'An apple (antes de som de vogal).');

INSERT INTO questions (subject_id, question_text, options, correct_answer, topic, explanation) VALUES
('portugues', 'A palavra "Mesa" é um:', '["Verbo", "Adjetivo", "Substantivo", "Advérbio"]', 'Substantivo', 'Morfologia', 'Nomeia um objeto.'),
('portugues', 'Qual palavra é um adjetivo?', '["Correr", "Feliz", "Hoje", "Casa"]', 'Feliz', 'Morfologia', 'Caracteriza o substantivo.'),
('portugues', 'Em "Eles viajarão", o verbo está no:', '["Passado", "Presente", "Futuro", "Gerúndio"]', 'Futuro', 'Morfologia', 'Ação que ainda vai acontecer.'),
('portugues', 'Em "O menino correu", qual é o sujeito?', '["O menino", "Correu", "O", "Nenhum"]', 'O menino', 'Sintaxe', 'Quem praticou a ação.'),
('portugues', 'O predicado é:', '["O sujeito da frase", "Tudo o que se declara sobre o sujeito", "O ponto final", "A primeira palavra"]', 'Tudo o que se declara sobre o sujeito', 'Sintaxe', 'Ex: ...correu (predicado).'),
('portugues', 'Em "Comprei flores", "flores" é:', '["Objeto Direto", "Objeto Indireto", "Sujeito", "Predicativo"]', 'Objeto Direto', 'Sintaxe', 'Complementa o verbo sem preposição.'),
('portugues', 'A crase é facultativa antes de:', '["Verbos", "Nomes próprios femininos", "Palavras masculinas", "Plural"]', 'Nomes próprios femininos', 'Gramática - Crase', 'Ex: Entreguei a Maria ou Entreguei à Maria.'),
('portugues', 'Qual "Por que" usamos em perguntas no início da frase?', '["Porque", "Porquê", "Por que", "Por quê"]', 'Por que', 'Ortografia', 'Separado e sem acento.'),
('portugues', 'O hífen é usado em "Guarda-chuva" porque:', '["É substantivo composto", "É verbo", "É bonito", "Não tem regra"]', 'É substantivo composto', 'Ortografia', 'Une palavras com significados próprios.'),
('portugues', 'A vírgula é usada para:', '["Terminar a frase", "Separar itens de uma lista ou pausas", "Indicar pergunta", "Indicar grito"]', 'Separar itens de uma lista ou pausas', 'Pontuação', 'Ex: Comprei maçã, banana e uva.'),
('portugues', 'A figura "Lê Machado de Assis" (lê a obra dele) é uma:', '["Metáfora", "Metonímia", "Antítese", "Hipérbole"]', 'Metonímia', 'Figuras de Linguagem', 'Substituição do autor pela obra.'),
('portugues', '"Subir para cima" é um exemplo de:', '["Pleonasmo", "Ironia", "Eufemismo", "Sarcasmo"]', 'Pleonasmo', 'Vícios de Linguagem', 'Repetição desnecessária de ideia.'),
('portugues', 'Qual o objetivo de uma "Notícia"?', '["Divertir", "Informar fatos atuais", "Ensinar uma receita", "Contar uma lenda"]', 'Informar fatos atuais', 'Gêneros Textuais', 'Texto jornalístico informativo.'),
('portugues', 'O Trovadorismo é o primeiro movimento literário da língua:', '["Inglesa", "Portuguesa", "Espanhola", "Francesa"]', 'Portuguesa', 'Literatura', 'Idade Média, cantigas.'),
('portugues', 'O Arcadismo valorizava:', '["A vida no campo (bucolismo)", "A vida na cidade", "A tecnologia", "O sofrimento"]', 'A vida no campo (bucolismo)', 'Literatura', 'Fugere Urbem (fugir da cidade).'),
('portugues', 'A Geração de 30 do Modernismo focou em:', '["Romance Regionalista e Social", "Poesia Parnasiana", "Contos de Fadas", "Teatro Grego"]', 'Romance Regionalista e Social', 'Literatura', 'Ex: Graciliano Ramos (Vidas Secas).'),
('portugues', 'Clarice Lispector é conhecida por sua prosa:', '["Jornalística", "Intimista e psicológica", "De aventura", "Histórica"]', 'Intimista e psicológica', 'Literatura', 'Explora o fluxo de consciência.'),
('portugues', 'Guimarães Rosa inovou a linguagem em:', '["Grande Sertão: Veredas", "Dom Casmurro", "O Guarani", "Iracema"]', 'Grande Sertão: Veredas', 'Literatura', 'Recriou a fala do sertanejo.'),
('portugues', 'Cecília Meireles faz parte do:', '["Barroco", "Modernismo", "Romantismo", "Simbolismo"]', 'Modernismo', 'Literatura', 'Poetisa da 2ª fase.'),
('portugues', 'Carlos Drummond de Andrade escreveu o famoso poema:', '["No Meio do Caminho", "Navio Negreiro", "Canção do Exílio", "Os Lusíadas"]', 'No Meio do Caminho', 'Literatura', '"Tinha uma pedra no meio do caminho...".');

INSERT INTO questions (subject_id, question_text, options, correct_answer, topic, explanation) VALUES
('matematica', 'Em uma fração, o número de cima chama-se:', '["Denominador", "Numerador", "Divisor", "Resto"]', 'Numerador', 'Aritmética', 'Indica quantas partes tomamos.'),
('matematica', 'O MMC de 4 e 6 é:', '["10", "12", "24", "2"]', '12', 'Aritmética', 'Mínimo Múltiplo Comum. M(4)={4,8,12...}, M(6)={6,12...}.'),
('matematica', 'O MDC de 8 e 12 é:', '["2", "4", "8", "1"]', '4', 'Aritmética', 'Máximo Divisor Comum.'),
('matematica', 'Resolva: 3x - 5 = 10', '["3", "4", "5", "6"]', '5', 'Álgebra', '3x = 15 -> x = 5.'),
('matematica', 'Quanto é 3 ao quadrado (3²)?', '["6", "9", "5", "3"]', '9', 'Aritmética', '3 x 3 = 9.'),
('matematica', 'A raiz quadrada de 49 é:', '["6", "7", "8", "9"]', '7', 'Aritmética', '7 x 7 = 49.'),
('matematica', 'Um polígono de 5 lados chama-se:', '["Quadrado", "Pentágono", "Hexágono", "Triângulo"]', 'Pentágono', 'Geometria', 'Penta = 5.'),
('matematica', 'A fórmula da área do círculo é:', '["L x L", "b x h", "π . r²", "2 . π . r"]', 'π . r²', 'Geometria', 'Pi vezes raio ao quadrado.'),
('matematica', 'O volume de um cubo de aresta 2 cm é:', '["4 cm³", "6 cm³", "8 cm³", "10 cm³"]', '8 cm³', 'Geometria Espacial', '2 x 2 x 2 = 8.'),
('matematica', 'A média aritmética de 10, 20 e 30 é:', '["15", "20", "25", "30"]', '20', 'Estatística', '(10+20+30)/3 = 60/3 = 20.'),
('matematica', 'Em estatística, a "Mediana" é:', '["O valor central", "A soma", "O valor que mais repete", "O maior valor"]', 'O valor central', 'Estatística', 'Divide os dados em duas partes iguais.'),
('matematica', 'Em estatística, a "Moda" é:', '["O valor médio", "O valor que mais se repete", "O menor valor", "A diferença"]', 'O valor que mais se repete', 'Estatística', 'O dado mais frequente.'),
('matematica', 'Qual a probabilidade de tirar um número par em um dado comum?', '["1/2 (50%)", "1/6", "1/3", "100%"]', '1/2 (50%)', 'Probabilidade', 'Pares: 2, 4, 6 (3 números de 6 totais).'),
('matematica', 'Em um triângulo retângulo, o seno é:', '["Cateto Oposto / Hipotenusa", "Cateto Adjacente / Hipotenusa", "Cateto Oposto / Adjacente", "Hipotenusa / Cateto"]', 'Cateto Oposto / Hipotenusa', 'Trigonometria', 'Relação trigonométrica básica.'),
('matematica', 'O Teorema de Tales trata de:', '["Retas paralelas cortadas por transversais", "Círculos", "Juros", "Probabilidade"]', 'Retas paralelas cortadas por transversais', 'Geometria', 'Proporcionalidade entre segmentos.'),
('matematica', 'Juros simples são calculados sobre:', '["O montante acumulado", "O valor inicial (principal) apenas", "O tempo", "A taxa"]', 'O valor inicial (principal) apenas', 'Matemática Financeira', 'J = C.i.t.'),
('matematica', 'Juros compostos são conhecidos como:', '["Juros sobre juros", "Desconto", "Imposto", "Lucro"]', 'Juros sobre juros', 'Matemática Financeira', 'A taxa incide sobre o montante anterior.'),
('matematica', 'Uma tabela de números organizados em linhas e colunas é uma:', '["Matriz", "Equação", "Função", "P.A."]', 'Matriz', 'Álgebra Linear', 'Usada para resolver sistemas lineares.'),
('matematica', 'O determinante só pode ser calculado em matrizes:', '["Quadradas", "Retangulares", "Nulas", "Identidade"]', 'Quadradas', 'Álgebra Linear', 'Mesmo número de linhas e colunas.'),
('matematica', 'A unidade imaginária "i" vale:', '["0", "1", "Raiz quadrada de -1", "Infinito"]', 'Raiz quadrada de -1', 'Números Complexos', 'Permite resolver raízes negativas.');

INSERT INTO questions (subject_id, question_text, options, correct_answer, topic, explanation) VALUES
('quimica', 'O elemento químico representado por H é:', '["Hélio", "Hidrogênio", "Ferro", "Mercúrio"]', 'Hidrogênio', 'Tabela Periódica', 'O elemento mais simples e abundante.'),
('quimica', 'Água com açúcar dissolvido é uma mistura:', '["Heterogênea", "Homogênea", "Coloidal", "Suspensa"]', 'Homogênea', 'Química Geral', 'Apresenta uma única fase visual.'),
('quimica', 'A destilação serve para separar misturas:', '["Sólido-Sólido", "Líquido-Líquido (Homogêneas)", "Sólido-Gás", "Magnéticas"]', 'Líquido-Líquido (Homogêneas)', 'Separação de Misturas', 'Baseia-se nos diferentes pontos de ebulição.'),
('quimica', 'O nêutron é uma partícula:', '["Com carga positiva", "Com carga negativa", "Sem carga elétrica (neutra)", "De antimatéria"]', 'Sem carga elétrica (neutra)', 'Estrutura Atômica', 'Localizado no núcleo do átomo.'),
('quimica', 'Isótopos são átomos com mesmo número de:', '["Massa", "Nêutrons", "Prótons", "Elétrons"]', 'Prótons', 'Estrutura Atômica', 'Pertencem ao mesmo elemento químico.'),
('quimica', 'Os Metais Alcalinos (Grupo 1) são muito:', '["Estáveis", "Reativos", "Gasosos", "Inertes"]', 'Reativos', 'Tabela Periódica', 'Ex: Sódio, Potássio (explodem em água).'),
('quimica', 'A ligação covalente envolve o:', '["Ganho de elétrons", "Perda de elétrons", "Compartilhamento de elétrons", "Mar de elétrons"]', 'Compartilhamento de elétrons', 'Ligações Químicas', 'Comum entre ametais.'),
('quimica', 'Uma substância com pH menor que 7 é:', '["Ácida", "Básica", "Neutra", "Salina"]', 'Ácida', 'Físico-Química', 'Ex: Suco de limão, Vinagre.'),
('quimica', 'As bases (hidróxidos) liberam em água o íon:', '["H+", "OH- (Hidroxila)", "Na+", "Cl-"]', 'OH- (Hidroxila)', 'Funções Inorgânicas', 'Segundo Arrhenius.'),
('quimica', 'O Sal de cozinha é quimicamente chamado de:', '["Sulfato de Cobre", "Cloreto de Sódio", "Bicarbonato", "Nitrato"]', 'Cloreto de Sódio', 'Funções Inorgânicas', 'NaCl.'),
('quimica', 'Óxidos são compostos binários onde o elemento mais eletronegativo é o:', '["Carbono", "Oxigênio", "Hidrogênio", "Nitrogênio"]', 'Oxigênio', 'Funções Inorgânicas', 'Ex: CO2, Fe2O3.'),
('quimica', 'Para ocorrer combustão (fogo), é necessário:', '["Combustível e Comburente (Oxigênio)", "Água", "Gelo", "Vácuo"]', 'Combustível e Comburente (Oxigênio)', 'Reações Químicas', 'Reação que libera energia.'),
('quimica', 'O balanceamento de equações obedece à Lei de:', '["Newton", "Lavoisier (Conservação das Massas)", "Darwin", "Mendel"]', 'Lavoisier (Conservação das Massas)', 'Química Geral', '"Na natureza nada se cria, nada se perde, tudo se transforma".'),
('quimica', 'A Massa Molar é a massa de:', '["1 átomo", "1 molécula", "1 mol de substância (6,02 x 10²³ partículas)", "1 litro"]', '1 mol de substância (6,02 x 10²³ partículas)', 'Estequiometria', 'Expressa em g/mol.'),
('quimica', 'Em uma solução, o componente em menor quantidade que é dissolvido chama-se:', '["Solvente", "Soluto", "Precipitado", "Filtro"]', 'Soluto', 'Soluções', 'Ex: O sal na água salgada.'),
('quimica', 'Uma reação endotérmica:', '["Libera calor", "Absorve calor", "Não envolve energia", "Gela o ambiente"]', 'Absorve calor', 'Termoquímica', 'A entalpia dos produtos é maior que a dos reagentes.'),
('quimica', 'A Cinética Química estuda a:', '["Cor das reações", "Velocidade das reações", "Eletricidade", "Massa"]', 'Velocidade das reações', 'Físico-Química', 'Fatores que aceleram ou retardam processos.'),
('quimica', 'Uma cadeia carbônica fechada é chamada de:', '["Aberta", "Cíclica", "Linear", "Mista"]', 'Cíclica', 'Química Orgânica', 'Forma um anel.'),
('quimica', 'Hidrocarbonetos são compostos formados apenas por:', '["Carbono e Oxigênio", "Carbono e Hidrogênio", "Nitrogênio", "Água"]', 'Carbono e Hidrogênio', 'Química Orgânica', 'Ex: Metano, Petróleo.'),
('quimica', 'Polímeros são macromoléculas formadas pela repetição de:', '["Átomos", "Monômeros", "Células", "Cristais"]', 'Monômeros', 'Química Orgânica', 'Ex: Plásticos, Borracha, DNA.');

INSERT INTO questions (subject_id, question_text, options, correct_answer, topic, explanation) VALUES
('sociologia', 'Família, Escola e Igreja são exemplos de:', '["Indivíduos", "Instituições Sociais", "Partidos", "Empresas"]', 'Instituições Sociais', 'Conceitos Básicos', 'Estruturas que organizam a sociedade.'),
('sociologia', 'A divisão da sociedade em camadas hierárquicas (ricos, pobres, etc.) é:', '["Estratificação Social", "Igualdade", "Comunismo", "Anarquia"]', 'Estratificação Social', 'Estrutura Social', 'Pode ser por castas, estamentos ou classes.'),
('sociologia', 'Produtos culturais feitos para consumo em larga escala formam a:', '["Cultura Erudita", "Cultura Popular", "Cultura de Massa", "Folclore"]', 'Cultura de Massa', 'Cultura', 'Música pop, filmes blockbusters, novelas.'),
('sociologia', 'Quem criou o termo "Indústria Cultural"?', '["Marx e Engels", "Adorno e Horkheimer", "Weber", "Durkheim"]', 'Adorno e Horkheimer', 'Escola de Frankfurt', 'A arte transformada em mercadoria para lucro e manipulação.'),
('sociologia', 'Pierre Bourdieu desenvolveu o conceito de "Habitus", que é:', '["Uma roupa", "Disposições incorporadas que guiam nossos gostos e ações", "Uma lei", "Um lugar"]', 'Disposições incorporadas que guiam nossos gostos e ações', 'Sociologia Contemporânea', 'Como nosso meio social molda quem somos.'),
('sociologia', 'Ulrich Beck descreve a modernidade atual como:', '["Sociedade de Risco", "Sociedade Perfeita", "Sociedade Industrial", "Sociedade Agrícola"]', 'Sociedade de Risco', 'Sociologia Contemporânea', 'Riscos globais (nucleares, ambientais) criados pelo próprio homem.'),
('sociologia', 'A Globalização é caracterizada pela:', '["Integração econômica, cultural e informacional mundial", "Isolamento dos países", "Fim do comércio", "Volta ao feudalismo"]', 'Integração econômica, cultural e informacional mundial', 'Mundo Contemporâneo', 'Encurtamento das distâncias.'),
('sociologia', 'Grupos organizados que buscam mudanças sociais (ex: Feminismo, Ambientalismo) são:', '["Empresas", "Movimentos Sociais", "Governos", "Exércitos"]', 'Movimentos Sociais', 'Política', 'Atores coletivos de transformação.'),
('sociologia', 'Cidadania envolve:', '["Apenas votar", "Direitos e Deveres (Civis, Políticos e Sociais)", "Ter muito dinheiro", "Morar na cidade"]', 'Direitos e Deveres (Civis, Políticos e Sociais)', 'Política', 'Participação plena na vida em sociedade.'),
('sociologia', 'Os Direitos Humanos são:', '["Apenas para alguns", "Universais, inalienáveis e indivisíveis", "Dependentes da religião", "Compráveis"]', 'Universais, inalienáveis e indivisíveis', 'Direitos', 'Valem para todas as pessoas, sem distinção.'),
('sociologia', 'Diferença entre Preconceito e Discriminação:', '["São iguais", "Preconceito é a ideia/opinião, Discriminação é o ato/ação", "Preconceito é bom", "Discriminação é pensamento"]', 'Preconceito é a ideia/opinião, Discriminação é o ato/ação', 'Desigualdade', 'Preconceito está na mente, discriminação na prática.'),
('sociologia', 'Gênero na sociologia refere-se a:', '["Sexo biológico", "Construção social e cultural do masculino/feminino", "Gramática", "Roupa"]', 'Construção social e cultural do masculino/feminino', 'Identidade', 'Diferente de sexo biológico.'),
('sociologia', 'A família moderna tem passado por mudanças, como:', '["Fim da família", "Novos arranjos (monoparentais, homoafetivos)", "Volta ao patriarcado rígido", "Proibição do divórcio"]', 'Novos arranjos (monoparentais, homoafetivos)', 'Instituições', 'Diversificação dos modelos familiares.'),
('sociologia', 'A "Uberização" do trabalho indica:', '["Melhores salários", "Trabalho flexível, mas precarizado e sem direitos", "Trabalho escravo", "Trabalho público"]', 'Trabalho flexível, mas precarizado e sem direitos', 'Trabalho', 'Fenômeno da economia de plataforma.'),
('sociologia', 'Secularização significa:', '["O fim da religião", "A perda de influência da religião na vida pública e no Estado", "O aumento de seitas", "A teocracia"]', 'A perda de influência da religião na vida pública e no Estado', 'Religião', 'Separação entre Igreja e Estado.'),
('sociologia', 'A violência urbana no Brasil está ligada a:', '["Fatores biológicos", "Desigualdade social, falta de oportunidades e falhas do Estado", "Clima quente", "Apenas falta de polícia"]', 'Desigualdade social, falta de oportunidades e falhas do Estado', 'Violência', 'Fenômeno complexo e multicausal.'),
('sociologia', 'O racismo estrutural é:', '["Xingamento individual", "Práticas institucionais e históricas que perpetuam a desigualdade racial", "Algo que não existe", "Racismo reverso"]', 'Práticas institucionais e históricas que perpetuam a desigualdade racial', 'Desigualdade', 'Está enraizado na organização da sociedade.'),
('sociologia', 'Democracia significa:', '["Governo de um só", "Governo dos ricos", "Governo do povo", "Sem governo"]', 'Governo do povo', 'Política', 'Pode ser direta ou representativa.'),
('sociologia', 'O Estado de Bem-Estar Social busca:', '["Acabar com a economia", "Garantir direitos básicos (saúde, educação) à população", "Lucro máximo", "Guerra"]', 'Garantir direitos básicos (saúde, educação) à população', 'Política', 'Welfare State.'),
('sociologia', 'A Pós-Modernidade é marcada por:', '["Certezas absolutas", "Fragmentação, relativismo e consumismo", "Tradição rígida", "Fim da tecnologia"]', 'Fragmentação, relativismo e consumismo', 'Cultura Contemporânea', 'Questionamento das grandes narrativas.');