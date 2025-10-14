CREATE DATABASE IF NOT EXISTS pillar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pillar;

CREATE TABLE area_conhecimento (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  sigla VARCHAR(8) NOT NULL,
  UNIQUE KEY uq_area_nome (nome),
  UNIQUE KEY uq_area_sigla (sigla)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE etapa_ensino (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  sigla CHAR(2) NOT NULL,
  nome VARCHAR(50) NOT NULL,
  CONSTRAINT ck_etapa_em CHECK (sigla = 'EM'),
  UNIQUE KEY uq_etapa_sigla (sigla),
  UNIQUE KEY uq_etapa_nome (nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE serie (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  etapa_ensino_id BIGINT UNSIGNED NOT NULL,
  ordinal TINYINT UNSIGNED NOT NULL,
  nome VARCHAR(30) NOT NULL,
  CONSTRAINT ck_serie_ordinal CHECK (ordinal IN (1,2,3)),
  UNIQUE KEY uq_serie_etapa_ordinal (etapa_ensino_id, ordinal),
  KEY idx_serie_etapa (etapa_ensino_id),
  CONSTRAINT fk_serie_etapa
    FOREIGN KEY (etapa_ensino_id)
    REFERENCES etapa_ensino(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE disciplina (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  area_conhecimento_id BIGINT UNSIGNED NOT NULL,
  nome VARCHAR(150) NOT NULL,
  sigla_bncc VARCHAR(6) NOT NULL,
  UNIQUE KEY uq_disc_area_sigla (area_conhecimento_id, sigla_bncc),
  UNIQUE KEY uq_disc_area_nome (area_conhecimento_id, nome),
  KEY idx_disc_area (area_conhecimento_id),
  CONSTRAINT fk_disc_area
    FOREIGN KEY (area_conhecimento_id)
    REFERENCES area_conhecimento(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE competencia_especifica (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  area_conhecimento_id BIGINT UNSIGNED NOT NULL,
  numero TINYINT UNSIGNED NOT NULL,
  descricao TEXT NOT NULL,
  CONSTRAINT ck_comp_num CHECK (numero BETWEEN 1 AND 12),
  UNIQUE KEY uq_comp_area_num (area_conhecimento_id, numero),
  KEY idx_comp_area (area_conhecimento_id),
  CONSTRAINT fk_comp_area
    FOREIGN KEY (area_conhecimento_id)
    REFERENCES area_conhecimento(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE habilidade (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  competencia_especifica_id BIGINT UNSIGNED NOT NULL,
  codigo VARCHAR(24) NOT NULL,
  descricao TEXT NOT NULL,
  CONSTRAINT ck_hab_codigo_em CHECK (codigo REGEXP '^EM(13)?[A-Z]{2,6}[0-9]{2,3}[A-Za-z]?$'),
  UNIQUE KEY uq_hab_codigo (codigo),
  KEY idx_hab_comp (competencia_especifica_id),
  CONSTRAINT fk_hab_comp
    FOREIGN KEY (competencia_especifica_id)
    REFERENCES competencia_especifica(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE topico_elementar (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  disciplina_id BIGINT UNSIGNED NOT NULL,
  nome VARCHAR(200) NOT NULL,
  descricao TEXT,
  UNIQUE KEY uq_topico_disc_nome (disciplina_id, nome),
  KEY idx_topico_disc (disciplina_id),
  CONSTRAINT fk_topico_disc
    FOREIGN KEY (disciplina_id)
    REFERENCES disciplina(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE serie_disciplina (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  serie_id BIGINT UNSIGNED NOT NULL,
  disciplina_id BIGINT UNSIGNED NOT NULL,
  UNIQUE KEY uq_serie_disc (serie_id, disciplina_id),
  KEY idx_sd_serie (serie_id),
  KEY idx_sd_disc (disciplina_id),
  CONSTRAINT fk_sd_serie
    FOREIGN KEY (serie_id)
    REFERENCES serie(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_sd_disc
    FOREIGN KEY (disciplina_id)
    REFERENCES disciplina(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE topico_habilidade (
  topico_elementar_id BIGINT UNSIGNED NOT NULL,
  habilidade_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (topico_elementar_id, habilidade_id),
  KEY idx_th_hab (habilidade_id),
  CONSTRAINT fk_th_topico
    FOREIGN KEY (topico_elementar_id)
    REFERENCES topico_elementar(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_th_hab
    FOREIGN KEY (habilidade_id)
    REFERENCES habilidade(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO area_conhecimento (sigla, nome) VALUES
('LGG','Linguagens e suas Tecnologias'),
('MAT','Matemática e suas Tecnologias'),
('CNT','Ciências da Natureza e suas Tecnologias'),
('CHS','Ciências Humanas e Sociais Aplicadas');

INSERT INTO etapa_ensino (sigla, nome) VALUES ('EM','Ensino Médio');

INSERT INTO serie (etapa_ensino_id, ordinal, nome)
SELECT e.id, v.ord, v.nome
  FROM etapa_ensino e
  JOIN (SELECT 1 AS ord, '1ª série' AS nome UNION ALL
               SELECT 2, '2ª série' UNION ALL
               SELECT 3, '3ª série') v
    ON e.sigla='EM';

INSERT INTO disciplina (area_conhecimento_id, nome, sigla_bncc) VALUES
((SELECT id FROM area_conhecimento WHERE sigla='LGG'),'Língua Portuguesa','LP'),
((SELECT id FROM area_conhecimento WHERE sigla='LGG'),'Arte','ART'),
((SELECT id FROM area_conhecimento WHERE sigla='LGG'),'Educação Física','EF'),
((SELECT id FROM area_conhecimento WHERE sigla='LGG'),'Língua Inglesa','ING'),
((SELECT id FROM area_conhecimento WHERE sigla='MAT'),'Matemática','MAT'),
((SELECT id FROM area_conhecimento WHERE sigla='CNT'),'Biologia','BIO'),
((SELECT id FROM area_conhecimento WHERE sigla='CNT'),'Física','FIS'),
((SELECT id FROM area_conhecimento WHERE sigla='CNT'),'Química','QUI'),
((SELECT id FROM area_conhecimento WHERE sigla='CHS'),'História','HIS'),
((SELECT id FROM area_conhecimento WHERE sigla='CHS'),'Geografia','GEO'),
((SELECT id FROM area_conhecimento WHERE sigla='CHS'),'Filosofia','FIL'),
((SELECT id FROM area_conhecimento WHERE sigla='CHS'),'Sociologia','SOC');

INSERT INTO competencia_especifica (area_conhecimento_id, numero, descricao) VALUES
((SELECT id FROM area_conhecimento WHERE sigla='LGG'),1,'Compreender e analisar criticamente práticas de linguagem e a circulação de discursos em diferentes campos.'),
((SELECT id FROM area_conhecimento WHERE sigla='LGG'),2,'Compreender processos identitários, relações de poder e atuar com base em princípios democráticos e de Direitos Humanos.'),
((SELECT id FROM area_conhecimento WHERE sigla='LGG'),3,'Utilizar diferentes linguagens para exercer protagonismo e autoria de forma crítica, criativa, ética e solidária.'),
((SELECT id FROM area_conhecimento WHERE sigla='LGG'),4,'Compreender as línguas como fenômeno histórico, social e variável, respeitando variedades linguísticas.'),
((SELECT id FROM area_conhecimento WHERE sigla='LGG'),5,'Compreender múltiplos aspectos que envolvem a produção de sentidos nas práticas da cultura corporal de movimento.'),
((SELECT id FROM area_conhecimento WHERE sigla='LGG'),6,'Compreender princípios das linguagens artísticas e expandir repertórios estéticos e culturais.'),
((SELECT id FROM area_conhecimento WHERE sigla='MAT'),1,'Utilizar conhecimentos matemáticos para investigar e resolver problemas e tomar decisões com base em dados.'),
((SELECT id FROM area_conhecimento WHERE sigla='MAT'),2,'Articular conhecimentos matemáticos em ações para investigar desafios contemporâneos com responsabilidade social.'),
((SELECT id FROM area_conhecimento WHERE sigla='MAT'),3,'Compreender e utilizar procedimentos e estratégias em situações de resolução de problemas.'),
((SELECT id FROM area_conhecimento WHERE sigla='MAT'),4,'Compreender e utilizar diferentes registros de representação matemáticos com flexibilidade e fluidez.'),
((SELECT id FROM area_conhecimento WHERE sigla='MAT'),5,'Investigar e estabelecer conjecturas sobre conceitos e propriedades matemáticas, incluindo demonstrações quando necessário.'),
((SELECT id FROM area_conhecimento WHERE sigla='MAT'),6,'Desenvolver pensamento computacional e usar tecnologias digitais articuladas aos conteúdos matemáticos.'),
((SELECT id FROM area_conhecimento WHERE sigla='CNT'),1,'Analisar fenômenos naturais e processos tecnológicos com base nas relações entre matéria e energia.'),
((SELECT id FROM area_conhecimento WHERE sigla='CNT'),2,'Construir e utilizar interpretações sobre a dinâmica da Vida, da Terra e do Cosmos para fundamentar decisões.'),
((SELECT id FROM area_conhecimento WHERE sigla='CNT'),3,'Analisar situações-problema e avaliar aplicações do conhecimento científico e tecnológico, comunicando conclusões a públicos variados.'),
((SELECT id FROM area_conhecimento WHERE sigla='CHS'),1,'Analisar processos políticos, econômicos, sociais, ambientais e culturais em diferentes tempos e espaços.'),
((SELECT id FROM area_conhecimento WHERE sigla='CHS'),2,'Analisar a formação de territórios e fronteiras e os processos sociais geradores de desigualdades e poder.'),
((SELECT id FROM area_conhecimento WHERE sigla='CHS'),3,'Contextualizar e avaliar criticamente as relações sociedade-natureza e seus impactos socioambientais e econômicos.'),
((SELECT id FROM area_conhecimento WHERE sigla='CHS'),4,'Analisar relações de produção, capital e trabalho em diferentes contextos e culturas.'),
((SELECT id FROM area_conhecimento WHERE sigla='CHS'),5,'Reconhecer e combater desigualdades e violências, respeitando os Direitos Humanos.'),
((SELECT id FROM area_conhecimento WHERE sigla='CHS'),6,'Participar do debate público de forma consciente e qualificada, respeitando diferentes posições.');

INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG101','Analisar, em textos de diferentes semioses, condições de produção e circulação, relações de poder e efeitos de sentido.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=1;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG102','Analisar discursos considerando contextos de produção, interlocutores, objetivos e estratégias argumentativas.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=1;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG103','Selecionar e usar conhecimentos sobre gêneros e linguagens para ler/produzir textos em diferentes mídias e campos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=1;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG104','Avaliar a credibilidade de informações e fontes, reconhecendo fake news, discursos de ódio e manipulações.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=1;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG105','Produzir textos orais, escritos e multissemióticos com autoria e responsabilidade, visando ao interesse público.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=1;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG201','Analisar práticas de linguagem que manifestem preconceitos e discriminações, propondo ações de enfrentamento.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG202','Analisar discursos midiáticos, publicitários, políticos e outros quanto a posicionamentos e relações de poder.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG203','Examinar como identidades e diferenças são construídas em discursos e práticas sociais.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG204','Negociar sentidos e produzir entendimento mútuo nas diversas linguagens com base em princípios de equidade.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG205','Empregar estratégias de escuta ativa, diálogo e mediação de conflitos nas interações.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG206','Avaliar impactos de práticas de linguagem na promoção dos Direitos Humanos e da democracia.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG207','Planejar e realizar intervenções de linguagem voltadas ao bem comum em contextos variados.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG301','Planejar, produzir e revisar textos autorais em diferentes mídias, considerando propósitos, público e efeitos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG302','Participar de práticas colaborativas de produção textual, incluindo projetos e ações no território.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG303','Defender pontos de vista fundamentados em argumentos e evidências, respeitando o contraditório.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG304','Criar produtos culturais e artísticos com diferentes linguagens e tecnologias, com responsabilidade autoral.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG305','Utilizar estratégias de planejamento, avaliação e reescrita para aperfeiçoar produções autorais.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG306','Avaliar impactos sociais e éticos de práticas autorais e colaborativas nas redes e na vida pública.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG307','Mobilizar diferentes linguagens para intervir na realidade local, regional e global.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG401','Reconhecer e respeitar variedades linguísticas e seus usos nos diferentes contextos sociais.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=4;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG402','Analisar variação linguística, preconceito e ideologias linguísticas em práticas sociais.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=4;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG403','Empregar registros e variedades adequados a situações de comunicação, com consciência crítica.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=4;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG404','Analisar políticas linguísticas, diversidade e direitos linguísticos no Brasil e no mundo.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=4;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG405','Refletir sobre língua, linguagem e gramática como fenômenos históricos e sociais.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=4;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG501','Analisar práticas da cultura corporal de movimento e seus sentidos sociais, culturais e políticos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=5;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG502','Planejar e realizar práticas corporais com autonomia, respeito, cooperação e segurança.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=5;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG503','Praticar, significar e valorizar a cultura corporal como autoconhecimento, autocuidado e laços sociais.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=5;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG504','Analisar discursos e representações sobre corpo, saúde, desempenho e estética nas mídias.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=5;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG505','Organizar eventos e produções sobre práticas corporais em diálogo com a comunidade.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=5;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG601','Apreciar, fruir e analisar criticamente produções artísticas em diferentes linguagens e contextos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=6;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG602','Experimentar processos de criação artística, explorando materiais, técnicas e tecnologias.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=6;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13LGG603','Planejar e realizar projetos artísticos e culturais de forma colaborativa e ética.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='LGG' AND ce.numero=6;

INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT101','Resolver e elaborar problemas do cotidiano e de outras áreas, com técnicas algébricas e gráficas, com ou sem tecnologias.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=1;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT102','Resolver problemas cujos modelos são funções polinomiais de 1º e 2º graus, em contextos diversos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=1;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT103','Resolver problemas com porcentagens em diferentes contextos e juros compostos, destacando crescimento exponencial.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=1;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT104','Resolver problemas com funções exponenciais, interpretando variação de grandezas em Matemática Financeira e ciências.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=1;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT105','Resolver problemas com funções logarítmicas, interpretando variação de grandezas em contextos diversos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=1;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT201','Resolver problemas com fenômenos periódicos e comparar com funções seno e cosseno no plano cartesiano.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT202','Empregar métodos para obter medida de área de superfícies e deduzir expressões de cálculo para aplicá-las em situações reais.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT203','Resolver problemas envolvendo relações métricas, congruência e semelhança em triângulos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT301','Resolver problemas com sistemas de equações lineares, técnicas algébricas e gráficas, com ou sem TDIC.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT302','Resolver problemas que envolvem áreas e volumes de prismas, pirâmides e corpos redondos em situações reais.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT303','Resolver problemas de contagem com diferentes agrupamentos, usando princípios multiplicativo e aditivo.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT311','Resolver problemas de probabilidade, descrevendo espaço amostral e contagem de possibilidades.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT312','Resolver problemas de probabilidade de eventos em experimentos sucessivos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT313','Resolver problemas com medições, discutindo algarismos significativos e notação científica.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT314','Resolver problemas com grandezas compostas (razão/produto), como velocidade e densidade.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT315','Reconhecer problema algorítmico e expressá-lo por algoritmo e fluxograma.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT316','Calcular e interpretar medidas de tendência central e de dispersão.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT401','Converter representações algébricas de funções polinomiais de 1º grau em representações geométricas, distinguindo proporcionalidade.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=4;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT402','Converter representações de funções polinomiais de 2º grau e analisar proporcionalidade quadrática.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=4;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT403','Comparar e analisar representações das funções exponencial e logarítmica, identificando características fundamentais.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=4;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT404','Identificar características das funções seno e cosseno em ciclos trigonométricos e planos cartesianos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=4;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT405','Reconhecer funções definidas por sentenças ou tabelas, convertendo entre representações e identificando domínios e crescimento.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=4;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT406','Utilizar conceitos básicos de uma linguagem de programação na implementação de algoritmos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=4;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT407','Interpretar e construir vistas ortogonais de figuras espaciais e representar formas 3D por figuras planas.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=4;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT408','Construir e interpretar tabelas e gráficos de frequências, com ou sem uso de softwares.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=4;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT409','Interpretar e comparar conjuntos de dados por meio de diferentes diagramas e gráficos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=4;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT501','Investigar relações entre números em tabelas para reconhecer padrões e generalizar funções polinomiais de 1º grau.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=5;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT502','Investigar relações entre números em tabelas para generalizar funções de 2º grau do tipo y=ax².' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=5;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT503','Investigar pontos de máximo e mínimo de funções quadráticas em contextos reais.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=5;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT504','Investigar processos de obtenção do volume de prismas, pirâmides, cilindros e cones, incluindo princípio de Cavalieri.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=5;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT505','Resolver problemas de ladrilhamentos do plano e composição de polígonos, generalizando padrões observados.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=5;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT506','Representar graficamente variação de área e perímetro de polígonos regulares, analisando e classificando funções.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=5;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT507','Identificar e associar sequências numéricas (PA) a funções afins em domínios discretos, incluindo dedução de fórmulas.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=5;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT508','Identificar e associar sequências numéricas (PG) a funções exponenciais em domínios discretos, incluindo dedução de fórmulas.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=5;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT509','Investigar deformação de ângulos e áreas por diferentes projeções cartográficas.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=5;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT510','Investigar dados de duas variáveis, considerando variação e regressão linear quando apropriado.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=5;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT511','Reconhecer tipos de espaços amostrais e eventos e investigar implicações no cálculo de probabilidades.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=5;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13MAT512','Investigar propriedades de figuras geométricas, buscando contraexemplos ou demonstrações para validação.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='MAT' AND ce.numero=5;

INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT101','Analisar e representar transformações e conservações envolvendo matéria, energia e movimento em sistemas naturais e tecnológicos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=1;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT102','Realizar previsões, avaliar intervenções ou construir protótipos de sistemas térmicos visando à sustentabilidade.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=1;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT103','Utilizar conhecimentos sobre radiações e suas origens para avaliar potenciais e riscos em equipamentos e aplicações cotidianas.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=1;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT104','Avaliar prejuízos de diferentes materiais e produtos à saúde e ao ambiente, propondo soluções para uso adequado.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=1;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT105','Analisar a ciclagem de elementos químicos na natureza e efeitos de fenômenos naturais e da interferência humana.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=1;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT106','Avaliar tecnologias e soluções para geração, transporte, distribuição e consumo de energia elétrica, considerando impactos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=1;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT201','Analisar e utilizar modelos científicos de diferentes épocas para explicar surgimento e evolução da Vida, da Terra e do Universo.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT202','Interpretar manifestações da vida em diferentes níveis de organização e condições ambientais, na Terra e em outros planetas.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT203','Avaliar e prever efeitos de intervenções em ecossistemas e no corpo humano com base em ciclos de matéria e energia.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT204','Elaborar explicações e previsões sobre movimentos de objetos na Terra, no Sistema Solar e no Universo com base em interações gravitacionais.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT205','Utilizar probabilidade e incerteza para interpretar previsões em atividades experimentais e fenômenos naturais e tecnológicos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT206','Justificar a importância da preservação da biodiversidade e avaliar efeitos da ação humana e políticas ambientais.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT207','Identificar e analisar vulnerabilidades ligadas a desafios contemporâneos das juventudes e divulgar ações de prevenção e promoção da saúde.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT301','Construir questões, hipóteses e estimativas; empregar instrumentos de medição; representar e interpretar dados e resultados experimentais.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT302','Comunicar resultados de análises, pesquisas e experimentos a públicos variados, utilizando diferentes mídias e TDIC.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT303','Interpretar textos de divulgação científica, avaliando apresentação de dados, consistência de argumentos e coerência das conclusões.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT304','Analisar e debater situações controversas sobre aplicação de conhecimentos das Ciências da Natureza com base em argumentos éticos e responsáveis.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT305','Investigar e discutir o uso indevido de conhecimentos das Ciências da Natureza em processos de discriminação e privação de direitos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT306','Avaliar riscos em atividades cotidianas aplicando conhecimentos científicos para justificar uso de equipamentos e comportamentos seguros.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT307','Analisar propriedades específicas de materiais para avaliar adequação de uso e propor soluções seguras e sustentáveis.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT308','Analisar funcionamento de equipamentos elétricos/eletrônicos, redes de informática e automação, avaliando impactos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT309','Analisar questões socioambientais, políticas e econômicas ligadas ao uso de recursos fósseis e novas tecnologias energéticas.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CNT310','Investigar efeitos de programas de infraestrutura e serviços básicos e propor ações de melhoria da qualidade de vida.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CNT' AND ce.numero=3;

INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS101','Analisar e comparar fontes e narrativas em diversas linguagens para compreender e criticar ideias e processos históricos, geográficos, políticos, econômicos, sociais, ambientais e culturais.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=1;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS102','Identificar, analisar e discutir circunstâncias históricas e geográficas da emergência de matrizes conceituais hegemônicas, comparando narrativas.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=1;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS103','Elaborar hipóteses, selecionar evidências e compor argumentos relativos a processos políticos, econômicos, sociais, ambientais, culturais e epistemológicos, com base em dados qualitativos e quantitativos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=1;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS104','Analisar objetos da cultura material e imaterial como suporte de conhecimentos, valores e práticas que singularizam diferentes sociedades.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=1;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS105','Identificar, contextualizar e criticar tipologias evolutivas e oposições dicotômicas, explicitando ambiguidades de conceitos e sujeitos em diferentes processos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=1;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS106','Utilizar linguagens cartográfica, gráfica e iconográfica, gêneros textuais e TDIC de forma crítica e ética para comunicar, produzir conhecimentos e exercer protagonismo.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=1;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS201','Analisar e caracterizar dinâmicas de populações, mercadorias e capital em diferentes continentes, com destaque para mobilidade e fixação.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS202','Analisar impactos das tecnologias na estruturação e dinâmicas das sociedades contemporâneas e suas interferências nas decisões políticas e sociais.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS203','Contrapor significados de território, fronteiras e vazio em diferentes sociedades, contextualizando e relativizando visões dualistas.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS204','Comparar processos de ocupação do espaço e formação de territórios e fronteiras, identificando papéis de diferentes agentes e fluxos populacionais.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS205','Analisar produção de territorialidades em suas dimensões culturais, ambientais, políticas e sociais com destaque para culturas juvenis.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS206','Compreender e aplicar princípios de localização, distribuição, ordem, extensão e conexão na análise da ocupação humana e produção do espaço.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=2;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS301','Problematizar práticas de produção e descarte de resíduos e selecionar ações para sustentabilidade e consumo responsável.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS302','Analisar impactos econômicos e socioambientais de cadeias produtivas e atividades agropecuárias, considerando modos de vida locais.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS303','Debater e avaliar papel da indústria cultural e culturas de massa no consumo e seus impactos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS304','Analisar impactos socioambientais de práticas institucionais e individuais, selecionando as que promovam ética socioambiental.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS305','Analisar e discutir o papel de organismos de regulação ambiental e acordos internacionais para práticas sustentáveis.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS306','Contextualizar e avaliar impactos de diferentes modelos econômicos no uso de recursos e na sustentabilidade do planeta.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=3;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS401','Identificar e analisar relações entre sujeitos, grupos e classes sociais diante de transformações técnicas e informacionais e novas formas de trabalho.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=4;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS402','Analisar e comparar indicadores de emprego, trabalho e renda e sua associação a processos de estratificação e desigualdade.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=4;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS403','Caracterizar e analisar processos próprios da contemporaneidade, com ênfase em transformações tecnológicas e relações sociais e de trabalho, propondo ações por direitos humanos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=4;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS404','Identificar e discutir aspectos do trabalho em diferentes contextos e seus efeitos sobre gerações, considerando transformações técnicas e informacionais.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=4;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS501','Compreender e analisar fundamentos da ética em diferentes culturas, identificando processos que formam sujeitos éticos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=5;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS502','Analisar situações da vida cotidiana, desnaturalizando desigualdade e preconceito e propondo ações pelos Direitos Humanos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=5;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS503','Identificar formas de violência, suas causas e significados e propor mecanismos para combatê-las com base em argumentos éticos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=5;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS504','Analisar e avaliar impasses ético-políticos das transformações científicas e tecnológicas e seus desdobramentos em valores e atitudes.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=5;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS601','Participar do debate público e intervir na realidade social de forma consciente e fundamentada, respeitando diferentes posições.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=6;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS602','Avaliar criticamente informações e argumentos no espaço público, distinguindo fatos, opiniões e fake news.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=6;
INSERT INTO habilidade (competencia_especifica_id, codigo, descricao) SELECT ce.id,'EM13CHS603','Utilizar recursos comunicacionais e digitais para participação cidadã e promoção dos direitos humanos.' FROM competencia_especifica ce JOIN area_conhecimento a ON a.id=ce.area_conhecimento_id WHERE a.sigla='CHS' AND ce.numero=6;

INSERT INTO topico_elementar (disciplina_id, nome, descricao) VALUES
((SELECT id FROM disciplina WHERE sigla_bncc='LP'),'Leitura e escuta',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='LP'),'Produção textual',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='LP'),'Análise linguística/semiótica',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='LP'),'Campos de atuação social',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='LP'),'Multiletramentos e TDIC',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='ART'),'Apreciação e fruição',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='ART'),'Criação e expressão',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='ART'),'Patrimônio artístico',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='EF'),'Práticas corporais e saúde',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='EF'),'Cultura corporal e movimento',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='ING'),'Comunicação e usos sociais',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='ING'),'Cultura e interculturalidade',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='ING'),'Multiletramentos e TDIC',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='MAT'),'Números e Álgebra',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='MAT'),'Funções',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='MAT'),'Geometria e Medidas',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='MAT'),'Probabilidade e Estatística',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='MAT'),'Matemática Financeira',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='MAT'),'Pensamento Computacional',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='BIO'),'Vida e Evolução',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='BIO'),'Ecologia e Biodiversidade',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='BIO'),'Saúde e Bem-estar',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='FIS'),'Movimento e Interações',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='FIS'),'Energia e Termodinâmica',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='FIS'),'Ondas e Radiações',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='FIS'),'Astronomia',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='QUI'),'Matéria e Transformações',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='QUI'),'Estrutura e Propriedades',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='QUI'),'Tecnologia e Sustentabilidade',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='HIS'),'Processos históricos',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='HIS'),'Cidadania e Direitos Humanos',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='HIS'),'Memória e Patrimônio',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='GEO'),'Territórios e Fronteiras',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='GEO'),'População e Espaço',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='GEO'),'Meio ambiente e sustentabilidade',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='FIL'),'Ética e Política',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='FIL'),'Conhecimento e Ciência',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='FIL'),'Estética e Cultura',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='SOC'),'Estrutura social e desigualdades',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='SOC'),'Cultura e identidades',NULL),
((SELECT id FROM disciplina WHERE sigla_bncc='SOC'),'Trabalho, tecnologia e economia',NULL);

INSERT INTO topico_habilidade (topico_elementar_id, habilidade_id) VALUES
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='LP' AND t.nome='Campos de atuação social'),(SELECT id FROM habilidade WHERE codigo='EM13LGG101')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='LP' AND t.nome='Campos de atuação social'),(SELECT id FROM habilidade WHERE codigo='EM13LGG102')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='LP' AND t.nome='Análise linguística/semiótica'),(SELECT id FROM habilidade WHERE codigo='EM13LGG103')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='LP' AND t.nome='Produção textual'),(SELECT id FROM habilidade WHERE codigo='EM13LGG104')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='LP' AND t.nome='Multiletramentos e TDIC'),(SELECT id FROM habilidade WHERE codigo='EM13LGG105')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='LP' AND t.nome='Campos de atuação social'),(SELECT id FROM habilidade WHERE codigo='EM13LGG201')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='LP' AND t.nome='Campos de atuação social'),(SELECT id FROM habilidade WHERE codigo='EM13LGG202')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='LP' AND t.nome='Análise linguística/semiótica'),(SELECT id FROM habilidade WHERE codigo='EM13LGG203')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='LP' AND t.nome='Leitura e escuta'),(SELECT id FROM habilidade WHERE codigo='EM13LGG204')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='LP' AND t.nome='Produção textual'),(SELECT id FROM habilidade WHERE codigo='EM13LGG303')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='ING' AND t.nome='Comunicação e usos sociais'),(SELECT id FROM habilidade WHERE codigo='EM13LGG403')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='EF' AND t.nome='Práticas corporais e saúde'),(SELECT id FROM habilidade WHERE codigo='EM13LGG501')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='MAT' AND t.nome='Funções'),(SELECT id FROM habilidade WHERE codigo='EM13MAT101')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='MAT' AND t.nome='Probabilidade e Estatística'),(SELECT id FROM habilidade WHERE codigo='EM13MAT303')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='MAT' AND t.nome='Geometria e Medidas'),(SELECT id FROM habilidade WHERE codigo='EM13MAT202')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='MAT' AND t.nome='Números e Álgebra'),(SELECT id FROM habilidade WHERE codigo='EM13MAT301')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='MAT' AND t.nome='Funções'),(SELECT id FROM habilidade WHERE codigo='EM13MAT302')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='MAT' AND t.nome='Funções'),(SELECT id FROM habilidade WHERE codigo='EM13MAT402')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='MAT' AND t.nome='Funções'),(SELECT id FROM habilidade WHERE codigo='EM13MAT403')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='MAT' AND t.nome='Funções'),(SELECT id FROM habilidade WHERE codigo='EM13MAT404')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='MAT' AND t.nome='Geometria e Medidas'),(SELECT id FROM habilidade WHERE codigo='EM13MAT407')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='MAT' AND t.nome='Probabilidade e Estatística'),(SELECT id FROM habilidade WHERE codigo='EM13MAT311')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='MAT' AND t.nome='Probabilidade e Estatística'),(SELECT id FROM habilidade WHERE codigo='EM13MAT312')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='MAT' AND t.nome='Probabilidade e Estatística'),(SELECT id FROM habilidade WHERE codigo='EM13MAT408')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='MAT' AND t.nome='Probabilidade e Estatística'),(SELECT id FROM habilidade WHERE codigo='EM13MAT409')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='MAT' AND t.nome='Pensamento Computacional'),(SELECT id FROM habilidade WHERE codigo='EM13MAT315')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='MAT' AND t.nome='Pensamento Computacional'),(SELECT id FROM habilidade WHERE codigo='EM13MAT406')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='MAT' AND t.nome='Números e Álgebra'),(SELECT id FROM habilidade WHERE codigo='EM13MAT314')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='FIS' AND t.nome='Energia e Termodinâmica'),(SELECT id FROM habilidade WHERE codigo='EM13CNT102')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='FIS' AND t.nome='Ondas e Radiações'),(SELECT id FROM habilidade WHERE codigo='EM13CNT103')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='FIS' AND t.nome='Astronomia'),(SELECT id FROM habilidade WHERE codigo='EM13CNT204')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='FIS' AND t.nome='Movimento e Interações'),(SELECT id FROM habilidade WHERE codigo='EM13CNT301')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='QUI' AND t.nome='Estrutura e Propriedades'),(SELECT id FROM habilidade WHERE codigo='EM13CNT104')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='QUI' AND t.nome='Matéria e Transformações'),(SELECT id FROM habilidade WHERE codigo='EM13CNT101')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='QUI' AND t.nome='Matéria e Transformações'),(SELECT id FROM habilidade WHERE codigo='EM13CNT105')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='QUI' AND t.nome='Tecnologia e Sustentabilidade'),(SELECT id FROM habilidade WHERE codigo='EM13CNT106')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='QUI' AND t.nome='Tecnologia e Sustentabilidade'),(SELECT id FROM habilidade WHERE codigo='EM13CNT308')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='QUI' AND t.nome='Tecnologia e Sustentabilidade'),(SELECT id FROM habilidade WHERE codigo='EM13CNT310')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='BIO' AND t.nome='Ecologia e Biodiversidade'),(SELECT id FROM habilidade WHERE codigo='EM13CNT105')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='BIO' AND t.nome='Ecologia e Biodiversidade'),(SELECT id FROM habilidade WHERE codigo='EM13CNT206')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='BIO' AND t.nome='Vida e Evolução'),(SELECT id FROM habilidade WHERE codigo='EM13CNT201')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='BIO' AND t.nome='Vida e Evolução'),(SELECT id FROM habilidade WHERE codigo='EM13CNT202')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='BIO' AND t.nome='Saúde e Bem-estar'),(SELECT id FROM habilidade WHERE codigo='EM13CNT207')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='BIO' AND t.nome='Saúde e Bem-estar'),(SELECT id FROM habilidade WHERE codigo='EM13CNT306')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='GEO' AND t.nome='Territórios e Fronteiras'),(SELECT id FROM habilidade WHERE codigo='EM13CHS203')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='GEO' AND t.nome='Territórios e Fronteiras'),(SELECT id FROM habilidade WHERE codigo='EM13CHS204')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='GEO' AND t.nome='Territórios e Fronteiras'),(SELECT id FROM habilidade WHERE codigo='EM13CHS205')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='GEO' AND t.nome='Territórios e Fronteiras'),(SELECT id FROM habilidade WHERE codigo='EM13CHS206')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='GEO' AND t.nome='População e Espaço'),(SELECT id FROM habilidade WHERE codigo='EM13CHS201')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='GEO' AND t.nome='Meio ambiente e sustentabilidade'),(SELECT id FROM habilidade WHERE codigo='EM13CHS301')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='GEO' AND t.nome='Meio ambiente e sustentabilidade'),(SELECT id FROM habilidade WHERE codigo='EM13CHS304')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='GEO' AND t.nome='Meio ambiente e sustentabilidade'),(SELECT id FROM habilidade WHERE codigo='EM13CHS305')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='GEO' AND t.nome='Meio ambiente e sustentabilidade'),(SELECT id FROM habilidade WHERE codigo='EM13CHS306')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='HIS' AND t.nome='Processos históricos'),(SELECT id FROM habilidade WHERE codigo='EM13CHS101')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='HIS' AND t.nome='Processos históricos'),(SELECT id FROM habilidade WHERE codigo='EM13CHS102')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='HIS' AND t.nome='Processos históricos'),(SELECT id FROM habilidade WHERE codigo='EM13CHS103')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='HIS' AND t.nome='Processos históricos'),(SELECT id FROM habilidade WHERE codigo='EM13CHS104')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='HIS' AND t.nome='Processos históricos'),(SELECT id FROM habilidade WHERE codigo='EM13CHS105')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='FIL' AND t.nome='Conhecimento e Ciência'),(SELECT id FROM habilidade WHERE codigo='EM13CHS103')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='FIL' AND t.nome='Ética e Política'),(SELECT id FROM habilidade WHERE codigo='EM13CHS501')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='FIL' AND t.nome='Ética e Política'),(SELECT id FROM habilidade WHERE codigo='EM13CHS502')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='FIL' AND t.nome='Ética e Política'),(SELECT id FROM habilidade WHERE codigo='EM13CHS504')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='SOC' AND t.nome='Trabalho, tecnologia e economia'),(SELECT id FROM habilidade WHERE codigo='EM13CHS401')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='SOC' AND t.nome='Trabalho, tecnologia e economia'),(SELECT id FROM habilidade WHERE codigo='EM13CHS402')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='SOC' AND t.nome='Trabalho, tecnologia e economia'),(SELECT id FROM habilidade WHERE codigo='EM13CHS403')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='SOC' AND t.nome='Trabalho, tecnologia e economia'),(SELECT id FROM habilidade WHERE codigo='EM13CHS404')),
((SELECT t.id FROM topico_elementar t JOIN disciplina d ON d.id=t.disciplina_id WHERE d.sigla_bncc='SOC' AND t.nome='Cultura e identidades'),(SELECT id FROM habilidade WHERE codigo='EM13CHS106'));

INSERT IGNORE INTO serie_disciplina (serie_id, disciplina_id)
SELECT s.id, d.id
FROM serie s
CROSS JOIN disciplina d;

USE pillar;

-- Usuários
CREATE TABLE IF NOT EXISTS usuario (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_usuario_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Preferência (1:1) — etapa + série do usuário
CREATE TABLE IF NOT EXISTS usuario_preferencia (
  user_id BIGINT UNSIGNED PRIMARY KEY,
  etapa_ensino_id BIGINT UNSIGNED NOT NULL,
  serie_id BIGINT UNSIGNED NOT NULL,
  CONSTRAINT fk_up_user  FOREIGN KEY (user_id)         REFERENCES usuario(id)        ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_up_etapa FOREIGN KEY (etapa_ensino_id)  REFERENCES etapa_ensino(id)  ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_up_serie FOREIGN KEY (serie_id)         REFERENCES serie(id)         ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;