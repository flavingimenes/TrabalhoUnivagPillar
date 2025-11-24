// src/data/quizData.js

export const subjects = [
  { id: 'artes', name: 'Artes', icon: '🎨' },
  { id: 'biologia', name: 'Biologia', icon: '🧬' },
  { id: 'educacao-fisica', name: 'Educação Física', icon: '⚽' },
  { id: 'filosofia', name: 'Filosofia', icon: '🤔' },
  { id: 'fisica', name: 'Física', icon: '⚡' },
  { id: 'historia', name: 'História', icon: '📜' },
  { id: 'ingles', name: 'Inglês', icon: '🇬🇧' },
  { id: 'portugues', name: 'Língua Portuguesa', icon: '📚' },
  { id: 'matematica', name: 'Matemática', icon: '📐' },
  { id: 'quimica', name: 'Química', icon: '🧪' },
  { id: 'sociologia', name: 'Sociologia', icon: '👥' },
];

export const quizzes = {
  artes: [
    {
      id: 1,
      question: "Qual movimento artístico brasileiro teve início oficial com a Semana de Arte Moderna de 1922?",
      options: ["Barroco", "Modernismo", "Romantismo", "Realismo"],
      correctAnswer: "Modernismo",
      topic: "História da Arte Brasileira",
      explanation: "A Semana de 22 marcou o início do Modernismo no Brasil, rompendo com o academicismo."
    },
    {
      id: 2,
      question: "Quem pintou a obra 'Abaporu'?",
      options: ["Candido Portinari", "Anita Malfatti", "Tarsila do Amaral", "Di Cavalcanti"],
      correctAnswer: "Tarsila do Amaral",
      topic: "Modernismo",
      explanation: "O Abaporu é a obra mais famosa de Tarsila do Amaral e inspirou o Movimento Antropofágico."
    },
    {
      id: 3,
      question: "O Renascimento Cultural valorizava principalmente:",
      options: ["O Teocentrismo", "O Antropocentrismo", "O Abstracionismo", "O Misticismo"],
      correctAnswer: "O Antropocentrismo",
      topic: "História da Arte Geral",
      explanation: "O Renascimento colocava o ser humano no centro do universo (Antropocentrismo)."
    },
    {
      id: 4,
      question: "Quais são as três cores primárias na teoria das cores pigmento?",
      options: ["Verde, Vermelho e Azul", "Amarelo, Azul e Vermelho", "Branco, Preto e Cinza", "Laranja, Roxo e Verde"],
      correctAnswer: "Amarelo, Azul e Vermelho",
      topic: "Teoria das Cores",
      explanation: "A partir dessas três cores, é possível criar todas as cores secundárias e terciárias."
    },
    {
      id: 5,
      question: "O que caracteriza a Arte Contemporânea?",
      options: ["Regras rígidas de composição", "Diversidade de estilos e liberdade material", "Foco exclusivo em temas religiosos", "Uso apenas de pintura a óleo"],
      correctAnswer: "Diversidade de estilos e liberdade material",
      topic: "Arte Contemporânea",
      explanation: "A arte contemporânea prioriza a ideia e o conceito, usando diversos meios e materiais."
    },
    {
      id: 6,
      question: "Aleijadinho foi o principal expoente de qual movimento no Brasil?",
      options: ["Barroco Mineiro", "Neoclassicismo", "Impressionismo", "Cubismo"],
      correctAnswer: "Barroco Mineiro",
      topic: "Barroco",
      explanation: "Antônio Francisco Lisboa, o Aleijadinho, é o mestre do Barroco em Minas Gerais."
    },
    {
      id: 7,
      question: "O Cubismo, liderado por Picasso, é caracterizado por:",
      options: ["Uso intenso de luz e sombra", "Formas geométricas e fragmentação", "Pinturas ao ar livre", "Retratos realistas"],
      correctAnswer: "Formas geométricas e fragmentação",
      topic: "Vanguardas Europeias",
      explanation: "O Cubismo decompõe os objetos em formas geométricas."
    },
    {
      id: 8,
      question: "Qual destas manifestações é considerada Patrimônio Imaterial do Brasil?",
      options: ["Cristo Redentor", "Frevo", "MASP", "Teatro Amazonas"],
      correctAnswer: "Frevo",
      topic: "Patrimônio Cultural",
      explanation: "O Frevo é uma forma de expressão musical e coreográfica considerada patrimônio imaterial."
    },
    {
      id: 9,
      question: "Na música, o que define o 'ritmo'?",
      options: ["A altura do som", "A duração e acentuação dos sons", "A qualidade do som", "O volume do som"],
      correctAnswer: "A duração e acentuação dos sons",
      topic: "Linguagem Musical",
      explanation: "Ritmo é a organização do tempo na música (duração e pausa)."
    },
    {
      id: 10,
      question: "A arte rupestre é caracterizada por:",
      options: ["Pinturas em telas", "Esculturas de mármore", "Pinturas em paredes de cavernas", "Mosaicos bizantinos"],
      correctAnswer: "Pinturas em paredes de cavernas",
      topic: "Pré-História",
      explanation: "São as primeiras manifestações artísticas da humanidade, feitas em rochas e cavernas."
    }
  ],

  biologia: [
    {
      id: 1,
      question: "Qual organela é responsável pela respiração celular?",
      options: ["Ribossomo", "Mitocôndria", "Lisossomo", "Complexo de Golgi"],
      correctAnswer: "Mitocôndria",
      topic: "Citologia",
      explanation: "A mitocôndria é a 'usina de energia' da célula, onde ocorre a respiração celular."
    },
    {
      id: 2,
      question: "Quem é considerado o pai da Genética?",
      options: ["Charles Darwin", "Gregor Mendel", "Louis Pasteur", "Watson e Crick"],
      correctAnswer: "Gregor Mendel",
      topic: "Genética",
      explanation: "Mendel formulou as leis básicas da hereditariedade usando ervilhas."
    },
    {
      id: 3,
      question: "Qual é a base nitrogenada exclusiva do RNA?",
      options: ["Timina", "Uracila", "Citosina", "Guanina"],
      correctAnswer: "Uracila",
      topic: "Bioquímica",
      explanation: "No RNA, a Uracila substitui a Timina encontrada no DNA."
    },
    {
      id: 4,
      question: "A seleção natural é um conceito proposto por:",
      options: ["Lamarck", "Darwin", "Mendel", "Lineu"],
      correctAnswer: "Darwin",
      topic: "Evolução",
      explanation: "Charles Darwin propôs que os indivíduos mais adaptados ao meio têm maior chance de sobreviver."
    },
    {
      id: 5,
      question: "Qual o tipo de relação ecológica onde ambos se beneficiam?",
      options: ["Parasitismo", "Mutualismo", "Competição", "Amensalismo"],
      correctAnswer: "Mutualismo",
      topic: "Ecologia",
      explanation: "No mutualismo, a associação é benéfica para ambas as espécies envolvidas."
    },
    {
      id: 6,
      question: "O que são vacinas?",
      options: ["Antibióticos fortes", "Soro com anticorpos prontos", "Preparações com antígenos inativados/atenuados", "Vitaminas concentradas"],
      correctAnswer: "Preparações com antígenos inativados/atenuados",
      topic: "Imunologia",
      explanation: "Vacinas estimulam o sistema imunológico a produzir seus próprios anticorpos (imunização ativa)."
    },
    {
      id: 7,
      question: "Qual filo do reino animal possui corpo segmentado e exoesqueleto de quitina?",
      options: ["Moluscos", "Artrópodes", "Anelídeos", "Cordados"],
      correctAnswer: "Artrópodes",
      topic: "Zoologia",
      explanation: "Artrópodes (insetos, aracnídeos, crustáceos) possuem apêndices articulados e exoesqueleto."
    },
    {
      id: 8,
      question: "O processo de divisão celular que gera gametas é a:",
      options: ["Mitose", "Meiose", "Fissão binária", "Clonagem"],
      correctAnswer: "Meiose",
      topic: "Divisão Celular",
      explanation: "A meiose reduz o número de cromossomos à metade, essencial para a reprodução sexuada."
    },
    {
      id: 9,
      question: "As plantas que possuem vasos condutores, mas não têm sementes, são:",
      options: ["Briófitas", "Pteridófitas", "Gimnospermas", "Angiospermas"],
      correctAnswer: "Pteridófitas",
      topic: "Botânica",
      explanation: "Exemplo clássico são as samambaias. Elas têm xilema e floema, mas se reproduzem por esporos."
    },
    {
      id: 10,
      question: "Qual hormônio é responsável pela redução da glicose no sangue?",
      options: ["Glucagon", "Adrenalina", "Insulina", "Tiroxina"],
      correctAnswer: "Insulina",
      topic: "Fisiologia Humana",
      explanation: "A insulina facilita a entrada de glicose nas células, baixando a glicemia."
    }
  ],

  educacao_fisica: [
    {
      id: 1,
      question: "Qual capacidade física é predominante em uma maratona?",
      options: ["Força explosiva", "Resistência aeróbica", "Velocidade pura", "Flexibilidade"],
      correctAnswer: "Resistência aeróbica",
      topic: "Fisiologia do Exercício",
      explanation: "Maratonas exigem que o corpo mantenha atividade por longo tempo usando oxigênio."
    },
    {
      id: 2,
      question: "O IMC (Índice de Massa Corporal) é calculado dividindo:",
      options: ["Peso pela altura", "Peso pela altura ao quadrado", "Altura pelo peso", "Altura ao quadrado pelo peso"],
      correctAnswer: "Peso pela altura ao quadrado",
      topic: "Saúde e Qualidade de Vida",
      explanation: "A fórmula é: Peso (kg) / (Altura (m) x Altura (m))."
    },
    {
      id: 3,
      question: "No Futsal, quantos jogadores de linha iniciam o jogo (sem contar o goleiro)?",
      options: ["4", "5", "6", "10"],
      correctAnswer: "4",
      topic: "Esportes Coletivos",
      explanation: "Um time de futsal tem 5 jogadores no total: 1 goleiro e 4 na linha."
    },
    {
      id: 4,
      question: "O sedentarismo está diretamente ligado ao risco de desenvolver:",
      options: ["Hipertrofia muscular", "Melhora cardiovascular", "Doenças crônicas como hipertensão e diabetes", "Flexibilidade articular"],
      correctAnswer: "Doenças crônicas como hipertensão e diabetes",
      topic: "Saúde",
      explanation: "A falta de atividade física é um fator de risco primário para doenças cardiovasculares e metabólicas."
    },
    {
      id: 5,
      question: "A Capoeira é uma mistura de:",
      options: ["Dança, luta e jogo", "Luta greco-romana e samba", "Judô e Ballet", "Futebol e Boxe"],
      correctAnswer: "Dança, luta e jogo",
      topic: "Cultura Corporal",
      explanation: "Originária do Brasil, a capoeira combina elementos de arte marcial, dança e música."
    },
    {
      id: 6,
      question: "Qual o principal objetivo dos exercícios de alongamento?",
      options: ["Aumentar a força", "Melhorar a flexibilidade", "Queimar gordura", "Aumentar a massa óssea"],
      correctAnswer: "Melhorar a flexibilidade",
      topic: "Treinamento Físico",
      explanation: "O alongamento visa aumentar a amplitude de movimento das articulações e elasticidade muscular."
    },
    {
      id: 7,
      question: "No Voleibol, quantos toques a equipe pode dar na bola antes de passá-la para o outro lado?",
      options: ["2", "3", "4", "Ilimitado"],
      correctAnswer: "3",
      topic: "Regras de Esportes",
      explanation: "São permitidos até 3 toques, além do toque do bloqueio."
    },
    {
      id: 8,
      question: "O que caracteriza um exercício anaeróbico?",
      options: ["Baixa intensidade e longa duração", "Alta intensidade e curta duração", "Uso exclusivo de oxigênio", "Relaxamento mental"],
      correctAnswer: "Alta intensidade e curta duração",
      topic: "Fisiologia",
      explanation: "Exemplos: Musculação pesada, sprints de 100m. O corpo usa energia sem depender imediata de oxigênio."
    },
    {
      id: 9,
      question: "Onde foram realizados os Jogos Olímpicos de 2016?",
      options: ["Londres", "Tóquio", "Rio de Janeiro", "Paris"],
      correctAnswer: "Rio de Janeiro",
      topic: "História do Esporte",
      explanation: "Foi a primeira vez que os Jogos Olímpicos foram sediados na América do Sul."
    },
    {
      id: 10,
      question: "O doping no esporte refere-se a:",
      options: ["Uso de equipamentos tecnológicos", "Uso de substâncias ilícitas para aumento de desempenho", "Treinamento intensivo", "Dieta balanceada"],
      correctAnswer: "Uso de substâncias ilícitas para aumento de desempenho",
      topic: "Ética no Esporte",
      explanation: "É proibido pois fere a ética esportiva e pode prejudicar a saúde do atleta."
    }
  ],

  filosofia: [
    {
      id: 1,
      question: "A frase 'Só sei que nada sei' é atribuída a:",
      options: ["Platão", "Sócrates", "Aristóteles", "Nietzsche"],
      correctAnswer: "Sócrates",
      topic: "Filosofia Antiga",
      explanation: "Representa a postura de humildade intelectual necessária para buscar a verdade."
    },
    {
      id: 2,
      question: "O 'Mito da Caverna' foi escrito por:",
      options: ["Platão", "Descartes", "Maquiavel", "Kant"],
      correctAnswer: "Platão",
      topic: "Filosofia Antiga",
      explanation: "Encontra-se na obra 'A República' e discute a teoria do conhecimento (mundo sensível vs inteligível)."
    },
    {
      id: 3,
      question: "Quem é o autor de 'O Príncipe', obra fundamental da política moderna?",
      options: ["Rousseau", "Hobbes", "Maquiavel", "Locke"],
      correctAnswer: "Maquiavel",
      topic: "Filosofia Política",
      explanation: "Maquiavel analisa como um governante deve agir para conquistar e manter o poder."
    },
    {
      id: 4,
      question: "O que estuda a Ética?",
      options: ["A origem do universo", "Os valores morais e a conduta humana", "A lógica matemática", "A estrutura do governo"],
      correctAnswer: "Os valores morais e a conduta humana",
      topic: "Ética",
      explanation: "A ética reflete sobre o bem, o mal, o justo e o comportamento em sociedade."
    },
    {
      id: 5,
      question: "René Descartes é famoso pela frase:",
      options: ["Penso, logo existo", "O homem é o lobo do homem", "Deus está morto", "Tudo flui"],
      correctAnswer: "Penso, logo existo",
      topic: "Racionalismo",
      explanation: "Cogito, ergo sum. É a base do racionalismo moderno."
    },
    {
      id: 6,
      question: "Para Karl Marx, a história da humanidade é a história da:",
      options: ["Evolução das espécies", "Luta de classes", "Vontade de potência", "Razão pura"],
      correctAnswer: "Luta de classes",
      topic: "Filosofia Contemporânea",
      explanation: "Marx via o conflito entre opressores (burguesia) e oprimidos (proletariado) como motor da história."
    },
    {
      id: 7,
      question: "O Existencialismo, de Sartre, afirma que:",
      options: ["A essência precede a existência", "A existência precede a essência", "Tudo já está determinado", "Deus define nosso destino"],
      correctAnswer: "A existência precede a essência",
      topic: "Existencialismo",
      explanation: "Primeiro o homem existe, surge no mundo, e só depois se define através de suas escolhas."
    },
    {
      id: 8,
      question: "O que é um silogismo na lógica aristotélica?",
      options: ["Um poema grego", "Um argumento lógico com duas premissas e uma conclusão", "Uma lei política", "Um mito religioso"],
      correctAnswer: "Um argumento lógico com duas premissas e uma conclusão",
      topic: "Lógica",
      explanation: "Ex: Todo homem é mortal (Premissa 1) -> Sócrates é homem (Premissa 2) -> Logo, Sócrates é mortal (Conclusão)."
    },
    {
      id: 9,
      question: "Segundo Thomas Hobbes, o 'estado de natureza' é:",
      options: ["Um paraíso perdido", "Uma guerra de todos contra todos", "Uma democracia perfeita", "Uma sociedade sem leis, mas pacífica"],
      correctAnswer: "Uma guerra de todos contra todos",
      topic: "Contratualismo",
      explanation: "Por isso, segundo ele, precisamos de um Estado forte (Leviatã) para garantir a ordem."
    },
    {
      id: 10,
      question: "A Escola de Frankfurt é conhecida por desenvolver a:",
      options: ["Teoria Crítica", "Teoria das Ideias", "Teoria do Caos", "Teoria da Relatividade"],
      correctAnswer: "Teoria Crítica",
      topic: "Filosofia Contemporânea",
      explanation: "Analisavam a cultura de massa e a sociedade industrial capitalista."
    }
  ],

  fisica: [
    {
      id: 1,
      question: "Qual é a 1ª Lei de Newton?",
      options: ["Lei da Ação e Reação", "Lei da Inércia", "Lei da Gravitação Universal", "Lei de Ohm"],
      correctAnswer: "Lei da Inércia",
      topic: "Mecânica",
      explanation: "Um corpo tende a permanecer em repouso ou movimento retilíneo uniforme a menos que uma força atue sobre ele."
    },
    {
      id: 2,
      question: "Qual a fórmula da velocidade média?",
      options: ["Vm = ΔS / Δt", "Vm = m . a", "Vm = Δt / ΔS", "Vm = m . v²"],
      correctAnswer: "Vm = ΔS / Δt",
      topic: "Cinemática",
      explanation: "Velocidade média é a variação de espaço dividida pela variação de tempo."
    },
    {
      id: 3,
      question: "O que estuda a Termodinâmica?",
      options: ["O movimento dos planetas", "As trocas de calor e trabalho", "A luz e as cores", "A eletricidade estática"],
      correctAnswer: "As trocas de calor e trabalho",
      topic: "Termologia",
      explanation: "Analisa como a energia térmica se transforma em outras formas de energia."
    },
    {
      id: 4,
      question: "Qual unidade mede a resistência elétrica no Sistema Internacional?",
      options: ["Volt", "Ampere", "Ohm", "Watt"],
      correctAnswer: "Ohm",
      topic: "Eletrodinâmica",
      explanation: "O símbolo é a letra grega ômega (Ω)."
    },
    {
      id: 5,
      question: "Na óptica, a miopia é corrigida com lentes:",
      options: ["Convergentes", "Divergentes", "Bifocais", "Cilíndricas"],
      correctAnswer: "Divergentes",
      topic: "Óptica",
      explanation: "A lente divergente 'abre' os raios de luz para que a imagem se forme na retina, e não antes dela."
    },
    {
      id: 6,
      question: "A energia cinética está associada a:",
      options: ["Altura", "Movimento", "Molas deformadas", "Calor"],
      correctAnswer: "Movimento",
      topic: "Energia",
      explanation: "A fórmula é Ec = (m.v²)/2. Depende da massa e da velocidade."
    },
    {
      id: 7,
      question: "Dois corpos com cargas de sinais opostos:",
      options: ["Se repelem", "Se atraem", "Não interagem", "Se anulam"],
      correctAnswer: "Se atraem",
      topic: "Eletrostática",
      explanation: "Cargas iguais se repelem, cargas opostas se atraem."
    },
    {
      id: 8,
      question: "Qual fenômeno explica a formação do arco-íris?",
      options: ["Reflexão", "Refração e dispersão", "Difração", "Interferência"],
      correctAnswer: "Refração e dispersão",
      topic: "Óptica",
      explanation: "A luz branca do sol entra na gota de água, refrata e se dispersa nas 7 cores visíveis."
    },
    {
      id: 9,
      question: "Qual é a aceleração da gravidade aproximada na Terra?",
      options: ["5 m/s²", "9,8 m/s²", "15 m/s²", "20 m/s²"],
      correctAnswer: "9,8 m/s²",
      topic: "Gravitação",
      explanation: "Frequentemente arredondada para 10 m/s² em exercícios escolares."
    },
    {
      id: 10,
      question: "A pressão atmosférica diminui quando:",
      options: ["A altitude aumenta", "A altitude diminui", "A temperatura cai", "Está chovendo"],
      correctAnswer: "A altitude aumenta",
      topic: "Hidrostática",
      explanation: "Quanto mais alto, menos ar existe acima de nós, logo, menor a pressão."
    }
  ],

  historia: [
    {
      id: 1,
      question: "O que marcou o fim da Idade Média e início da Idade Moderna?",
      options: ["Queda de Roma", "Queda de Constantinopla", "Revolução Francesa", "Descobrimento do Brasil"],
      correctAnswer: "Queda de Constantinopla",
      topic: "História Geral",
      explanation: "A tomada de Constantinopla pelos turcos em 1453 é o marco tradicional."
    },
    {
      id: 2,
      question: "Quem foi o primeiro imperador do Brasil?",
      options: ["D. Pedro II", "D. João VI", "D. Pedro I", "Deodoro da Fonseca"],
      correctAnswer: "D. Pedro I",
      topic: "Brasil Império",
      explanation: "Ele proclamou a independência em 1822 e governou até abdicar em 1831."
    },
    {
      id: 3,
      question: "A Guerra Fria foi um conflito ideológico entre:",
      options: ["EUA e Alemanha", "EUA e URSS", "China e Japão", "Inglaterra e França"],
      correctAnswer: "EUA e URSS",
      topic: "Idade Contemporânea",
      explanation: "Ocorreu entre o bloco capitalista (EUA) e o bloco socialista (União Soviética)."
    },
    {
      id: 4,
      question: "Qual movimento intelectual influenciou a Revolução Francesa?",
      options: ["Iluminismo", "Renascimento", "Positivismo", "Marxismo"],
      correctAnswer: "Iluminismo",
      topic: "Revoluções Burguesas",
      explanation: "Ideais de liberdade, igualdade e fraternidade vieram dos filósofos iluministas."
    },
    {
      id: 5,
      question: "O que foi o 'Coronelismo' na República Velha brasileira?",
      options: ["Um sistema militar", "O poder político local exercido por grandes latifundiários", "A industrialização de São Paulo", "A revolta dos tenentes"],
      correctAnswer: "O poder político local exercido por grandes latifundiários",
      topic: "Brasil República",
      explanation: "Os coronéis controlavam o 'voto de cabresto' para eleger seus aliados."
    },
    {
      id: 6,
      question: "A Lei Áurea, que aboliu a escravidão no Brasil, foi assinada em:",
      options: ["1822", "1850", "1888", "1889"],
      correctAnswer: "1888",
      topic: "Brasil Império",
      explanation: "Assinada pela Princesa Isabel em 13 de maio de 1888."
    },
    {
      id: 7,
      question: "O nazismo e o fascismo são regimes:",
      options: ["Democráticos", "Totalitários de extrema-direita", "Comunistas", "Anarquistas"],
      correctAnswer: "Totalitários de extrema-direita",
      topic: "Segunda Guerra Mundial",
      explanation: "Caracterizados pelo nacionalismo extremo, autoritarismo e supressão de oposições."
    },
    {
      id: 8,
      question: "Qual era a principal atividade econômica no início da colonização do Brasil?",
      options: ["Mineração de ouro", "Café", "Extração de Pau-Brasil", "Cana-de-açúcar"],
      correctAnswer: "Extração de Pau-Brasil",
      topic: "Brasil Colônia",
      explanation: "Antes dos engenhos de açúcar, o foco foi o escambo do pau-brasil com os indígenas."
    },
    {
      id: 9,
      question: "A Revolução Industrial começou em qual país?",
      options: ["França", "Estados Unidos", "Inglaterra", "Alemanha"],
      correctAnswer: "Inglaterra",
      topic: "Idade Moderna/Contemporânea",
      explanation: "A Inglaterra foi pioneira no século XVIII devido às reservas de carvão e capital acumulado."
    },
    {
      id: 10,
      question: "Quem presidiu o Brasil durante o 'Estado Novo' (1937-1945)?",
      options: ["Juscelino Kubitschek", "Getúlio Vargas", "João Goulart", "Eurico Gaspar Dutra"],
      correctAnswer: "Getúlio Vargas",
      topic: "Era Vargas",
      explanation: "Foi um período ditatorial liderado por Vargas, com forte censura e centralização."
    }
  ],

  ingles: [
    {
      id: 1,
      question: "What is the past tense of the verb 'to go'?",
      options: ["Goed", "Gone", "Went", "Going"],
      correctAnswer: "Went",
      topic: "Grammar - Simple Past",
      explanation: "'Go' is an irregular verb. Past: Went. Participle: Gone."
    },
    {
      id: 2,
      question: "Choose the correct sentence:",
      options: ["She don't like pizza.", "She doesn't like pizza.", "She no like pizza.", "She not likes pizza."],
      correctAnswer: "She doesn't like pizza.",
      topic: "Grammar - Simple Present",
      explanation: "In Simple Present negative, third person singular (She) uses 'doesn't'."
    },
    {
      id: 3,
      question: "What does the word 'Parents' mean in Portuguese?",
      options: ["Parentes", "Pais", "Avós", "Primos"],
      correctAnswer: "Pais",
      topic: "Vocabulary - False Cognates",
      explanation: "'Parents' is a false friend. 'Parentes' in English is 'Relatives'."
    },
    {
      id: 4,
      question: "Which sentence is in the Present Continuous?",
      options: ["I play soccer.", "I am playing soccer.", "I played soccer.", "I will play soccer."],
      correctAnswer: "I am playing soccer.",
      topic: "Grammar - Verb Tenses",
      explanation: "Subject + verb to be + main verb + ing (am playing)."
    },
    {
      id: 5,
      question: "Complete: 'If I ______ money, I would travel.'",
      options: ["have", "had", "has", "having"],
      correctAnswer: "had",
      topic: "Grammar - Conditionals",
      explanation: "Second Conditional: If + Simple Past, ... would + infinitive."
    },
    {
      id: 6,
      question: "The plural of 'Child' is:",
      options: ["Childs", "Children", "Childrens", "Childes"],
      correctAnswer: "Children",
      topic: "Grammar - Plurals",
      explanation: "Irregular plural. One child, two children."
    },
    {
      id: 7,
      question: "What is the opposite of 'Always'?",
      options: ["Sometimes", "Often", "Never", "Usually"],
      correctAnswer: "Never",
      topic: "Vocabulary - Adverbs",
      explanation: "Always (Sempre) x Never (Nunca)."
    },
    {
      id: 8,
      question: "'The book is ON the table'. 'ON' is a preposition of:",
      options: ["Time", "Place", "Movement", "Cause"],
      correctAnswer: "Place",
      topic: "Grammar - Prepositions",
      explanation: "Indicates location (sobre a mesa/em cima da mesa)."
    },
    {
      id: 9,
      question: "Choose the correct pronoun: '______ car is blue.'",
      options: ["He", "Him", "His", "He's"],
      correctAnswer: "His",
      topic: "Grammar - Possessives",
      explanation: "Possessive adjective for 'He' is 'His' (O carro dele)."
    },
    {
      id: 10,
      question: "What is the translation of 'Actually'?",
      options: ["Atualmente", "Na verdade", "Agora", "Rapidamente"],
      correctAnswer: "Na verdade",
      topic: "Vocabulary - False Cognates",
      explanation: "'Actually' means 'Na verdade' or 'De fato'. 'Atualmente' is 'Nowadays'."
    }
  ],

  portugues: [
    {
      id: 1,
      question: "Qual das opções abaixo apresenta uso de crase obrigatório?",
      options: ["Fui a pé.", "Vou a Bahia.", "Fui à escola.", "Entreguei o livro a ela."],
      correctAnswer: "Fui à escola.",
      topic: "Gramática - Crase",
      explanation: "Quem vai, vai A algum lugar + A (artigo) escola = À escola."
    },
    {
      id: 2,
      question: "O Romantismo no Brasil teve como marco inicial a obra:",
      options: ["Memórias Póstumas de Brás Cubas", "Suspiros Poéticos e Saudades", "O Cortiço", "Macunaíma"],
      correctAnswer: "Suspiros Poéticos e Saudades",
      topic: "Literatura",
      explanation: "Publicada em 1836 por Gonçalves de Magalhães."
    },
    {
      id: 3,
      question: "Qual figura de linguagem presente em: 'O vento beijava meu rosto'?",
      options: ["Metáfora", "Prosopopeia (Personificação)", "Antítese", "Eufemismo"],
      correctAnswer: "Prosopopeia (Personificação)",
      topic: "Figuras de Linguagem",
      explanation: "Atribuição de características humanas (beijar) a seres inanimados (vento)."
    },
    {
      id: 4,
      question: "Em 'Ele estudou muito, MAS não passou', a conjunção indica:",
      options: ["Adição", "Conclusão", "Adversidade", "Causa"],
      correctAnswer: "Adversidade",
      topic: "Sintaxe - Orações Coordenadas",
      explanation: "'Mas' introduz uma ideia oposta à anterior (Oração Coordenada Adversativa)."
    },
    {
      id: 5,
      question: "Machado de Assis é o principal nome do:",
      options: ["Romantismo", "Realismo", "Parnasianismo", "Simbolismo"],
      correctAnswer: "Realismo",
      topic: "Literatura",
      explanation: "Fundador da Academia Brasileira de Letras e ícone do Realismo."
    },
    {
      id: 6,
      question: "A palavra 'pássaro' é acentuada porque é uma:",
      options: ["Oxítona", "Paroxítona", "Proparoxítona", "Monossílabo tônico"],
      correctAnswer: "Proparoxítona",
      topic: "Ortografia - Acentuação",
      explanation: "Todas as proparoxítonas (sílaba tônica na antepenúltima) são acentuadas."
    },
    {
      id: 7,
      question: "O que é variação linguística regional?",
      options: ["Diferença de fala entre idosos e jovens", "Diferença de fala dependendo da região geográfica (sotaques)", "Uso de gírias", "Linguagem técnica"],
      correctAnswer: "Diferença de fala dependendo da região geográfica (sotaques)",
      topic: "Sociolinguística",
      explanation: "Exemplo: Falar 'mandioca', 'aipim' ou 'macaxeira' dependendo do estado."
    },
    {
      id: 8,
      question: "Qual a função da linguagem focada no emissor e seus sentimentos?",
      options: ["Referencial", "Emotiva", "Metalinguística", "Conativa"],
      correctAnswer: "Emotiva",
      topic: "Funções da Linguagem",
      explanation: "Foca na subjetividade, no 'eu' (ex: diários, poesias líricas)."
    },
    {
      id: 9,
      question: "Em 'Vende-se casas', há um erro de concordância. O correto seria:",
      options: ["Vendem-se casas", "Vende-se casa", "Vendido casas", "Casas a venda"],
      correctAnswer: "Vendem-se casas",
      topic: "Sintaxe - Concordância Verbal",
      explanation: "Casas (sujeito) são vendidas. O verbo deve ir para o plural."
    },
    {
      id: 10,
      question: "O movimento Modernista de 1922 buscava:",
      options: ["Copiar a arte europeia", "Retomar os valores gregos", "Criar uma arte genuinamente brasileira e livre", "Manter o formalismo parnasiano"],
      correctAnswer: "Criar uma arte genuinamente brasileira e livre",
      topic: "Literatura - Modernismo",
      explanation: "Rompimento com o passado e valorização da identidade nacional."
    }
  ],

  matematica: [
    {
      id: 1,
      question: "Qual é a solução da equação logaritmo log2(x) = 3?",
      options: ["6", "8", "9", "5"],
      correctAnswer: "8",
      topic: "Logaritmos",
      explanation: "2 elevado a 3 é igual a 8 (2³ = 8)."
    },
    {
      id: 2,
      question: "Em um triângulo retângulo, o quadrado da hipotenusa é igual à soma dos quadrados dos catetos. Esse é o teorema de:",
      options: ["Tales", "Pitágoras", "Bhaskara", "Arquimedes"],
      correctAnswer: "Pitágoras",
      topic: "Geometria Plana",
      explanation: "a² = b² + c²."
    },
    {
      id: 3,
      question: "Qual é o valor de x na equação 2x + 10 = 20?",
      options: ["2", "5", "10", "15"],
      correctAnswer: "5",
      topic: "Álgebra Básica",
      explanation: "2x = 10 -> x = 10/2 -> x = 5."
    },
    {
      id: 4,
      question: "Como se calcula a área de um retângulo?",
      options: ["Base x Altura", "Base + Altura", "(Base x Altura) / 2", "Lado x Lado x Lado"],
      correctAnswer: "Base x Altura",
      topic: "Geometria Plana",
      explanation: "A área é a medida da superfície, multiplicando os dois lados diferentes."
    },
    {
      id: 5,
      question: "Qual é o próximo termo da P.A. (2, 5, 8, ...)?",
      options: ["10", "11", "12", "13"],
      correctAnswer: "11",
      topic: "Progressões (PA/PG)",
      explanation: "A razão é 3 (5-2=3). Logo, 8 + 3 = 11."
    },
    {
      id: 6,
      question: "O gráfico de uma função do 2º grau (quadrática) é uma:",
      options: ["Reta", "Parábola", "Circunferência", "Hipérbole"],
      correctAnswer: "Parábola",
      topic: "Funções",
      explanation: "Toda função f(x) = ax² + bx + c gera uma parábola."
    },
    {
      id: 7,
      question: "Quanto é 20% de 150?",
      options: ["15", "20", "30", "40"],
      correctAnswer: "30",
      topic: "Matemática Financeira",
      explanation: "10% de 150 é 15. 20% é o dobro, ou seja, 30."
    },
    {
      id: 8,
      question: "Qual a soma dos ângulos internos de um triângulo?",
      options: ["180°", "360°", "90°", "270°"],
      correctAnswer: "180°",
      topic: "Geometria Plana",
      explanation: "Independentemente do tipo de triângulo, a soma é sempre 180 graus."
    },
    {
      id: 9,
      question: "Na análise combinatória, o fatorial de 4 (4!) é:",
      options: ["10", "16", "24", "12"],
      correctAnswer: "24",
      topic: "Análise Combinatória",
      explanation: "4! = 4 x 3 x 2 x 1 = 24."
    },
    {
      id: 10,
      question: "Se f(x) = 3x + 2, qual o valor de f(4)?",
      options: ["10", "12", "14", "16"],
      correctAnswer: "14",
      topic: "Funções",
      explanation: "Substituindo x por 4: 3(4) + 2 = 12 + 2 = 14."
    }
  ],

  quimica: [
    {
      id: 1,
      question: "O modelo atômico conhecido como 'Pudim de Passas' foi proposto por:",
      options: ["Dalton", "Thomson", "Rutherford", "Bohr"],
      correctAnswer: "Thomson",
      topic: "Modelos Atômicos",
      explanation: "Thomson descobriu o elétron e propôs uma esfera positiva incrustada de cargas negativas."
    },
    {
      id: 2,
      question: "O pH 2 indica que uma substância é:",
      options: ["Neutra", "Ácida", "Básica", "Salina"],
      correctAnswer: "Ácida",
      topic: "Físico-Química",
      explanation: "A escala vai de 0 a 14. Abaixo de 7 é ácido, 7 é neutro, acima é básico."
    },
    {
      id: 3,
      question: "Qual a fórmula da água?",
      options: ["H2O2", "HO", "H2O", "OH"],
      correctAnswer: "H2O",
      topic: "Química Geral",
      explanation: "Dois átomos de hidrogênio e um de oxigênio."
    },
    {
      id: 4,
      question: "Na tabela periódica, os elementos da família 18 (gases nobres) são conhecidos por:",
      options: ["Alta reatividade", "Estabilidade química", "Formarem cátions facilmente", "Serem metais sólidos"],
      correctAnswer: "Estabilidade química",
      topic: "Tabela Periódica",
      explanation: "Eles possuem a camada de valência completa (geralmente 8 elétrons), reagindo pouco."
    },
    {
      id: 5,
      question: "Qual tipo de ligação ocorre entre o Sódio (Metal) e o Cloro (Ametal)?",
      options: ["Covalente", "Iônica", "Metálica", "De Hidrogênio"],
      correctAnswer: "Iônica",
      topic: "Ligações Químicas",
      explanation: "Ocorre transferência de elétrons, formando íons (Na+ e Cl-)."
    },
    {
      id: 6,
      question: "O etanol (álcool comum) pertence a qual função orgânica?",
      options: ["Álcool", "Cetona", "Ácido Carboxílico", "Éster"],
      correctAnswer: "Álcool",
      topic: "Química Orgânica",
      explanation: "Possui a hidroxila (-OH) ligada a um carbono saturado."
    },
    {
      id: 7,
      question: "Qual é o número de Avogadro (aproximado)?",
      options: ["3,14 x 10^23", "6,02 x 10^23", "1,6 x 10^-19", "9,8 x 10^2"],
      correctAnswer: "6,02 x 10^23",
      topic: "Estequiometria",
      explanation: "Representa a quantidade de entidades elementares em 1 mol."
    },
    {
      id: 8,
      question: "A separação de misturas heterogêneas sólido-líquido (ex: areia e água) pode ser feita por:",
      options: ["Destilação", "Filtração", "Decantação (apenas)", "Filtração ou Decantação"],
      correctAnswer: "Filtração ou Decantação",
      topic: "Separação de Misturas",
      explanation: "Tanto filtrar quanto deixar decantar (assentar) funcionam para separar a areia da água."
    },
    {
      id: 9,
      question: "O que é uma reação exotérmica?",
      options: ["Reação que absorve calor", "Reação que libera calor", "Reação nuclear", "Reação muito lenta"],
      correctAnswer: "Reação que libera calor",
      topic: "Termoquímica",
      explanation: "O prefixo 'exo' significa para fora. O sistema libera energia para o meio."
    },
    {
      id: 10,
      question: "O Carbono faz quantas ligações covalentes para ficar estável?",
      options: ["2", "3", "4", "5"],
      correctAnswer: "4",
      topic: "Química Orgânica",
      explanation: "O carbono é tetravalente."
    }
  ],

  sociologia: [
    {
      id: 1,
      question: "Quem é considerado um dos 'pais' da Sociologia e criou o conceito de Fato Social?",
      options: ["Max Weber", "Émile Durkheim", "Karl Marx", "Auguste Comte"],
      correctAnswer: "Émile Durkheim",
      topic: "Sociologia Clássica",
      explanation: "Para Durkheim, fatos sociais são maneiras de agir, pensar e sentir exteriores ao indivíduo."
    },
    {
      id: 2,
      question: "Para Karl Marx, a sociedade é movida pela:",
      options: ["Solidariedade orgânica", "Ação social", "Luta de classes", "Burocracia"],
      correctAnswer: "Luta de classes",
      topic: "Sociologia Clássica",
      explanation: "O conflito econômico entre burguesia e proletariado estrutura a sociedade capitalista."
    },
    {
      id: 3,
      question: "O conceito de 'Mais-Valia' refere-se a:",
      options: ["Ao lucro obtido pela exploração do trabalho", "Ao imposto pago ao governo", "Ao valor sentimental de um bem", "Ao aumento da inflação"],
      correctAnswer: "Ao lucro obtido pela exploração do trabalho",
      topic: "Marxismo",
      explanation: "É a diferença entre o que o trabalhador produz e o que ele recebe como salário."
    },
    {
      id: 4,
      question: "O que é Etnocentrismo?",
      options: ["Valorização de todas as culturas", "Julgar outras culturas usando a sua própria como padrão superior", "Estudo dos indígenas", "Mistura de raças"],
      correctAnswer: "Julgar outras culturas usando a sua própria como padrão superior",
      topic: "Antropologia",
      explanation: "É a visão preconceituosa de que a sua cultura é o centro e a 'correta'."
    },
    {
      id: 5,
      question: "Gilberto Freyre escreveu qual obra clássica da sociologia brasileira?",
      options: ["Raízes do Brasil", "O Povo Brasileiro", "Casa-Grande & Senzala", "Os Sertões"],
      correctAnswer: "Casa-Grande & Senzala",
      topic: "Sociologia Brasileira",
      explanation: "A obra analisa a formação da sociedade brasileira e a miscigenação."
    },
    {
      id: 6,
      question: "Max Weber estudou a:",
      options: ["Luta de classes", "Fatos sociais", "Ação social", "Positivismo"],
      correctAnswer: "Ação social",
      topic: "Sociologia Clássica",
      explanation: "Para Weber, a sociologia deve compreender o sentido que o indivíduo dá à sua ação."
    },
    {
      id: 7,
      question: "O que significa 'Meritocracia'?",
      options: ["Governo dos mais ricos", "Sistema onde o progresso depende do mérito e esforço individual", "Sistema de castas", "Governo religioso"],
      correctAnswer: "Sistema onde o progresso depende do mérito e esforço individual",
      topic: "Política e Sociedade",
      explanation: "Um conceito debatido, pois ignora desigualdades de oportunidades iniciais."
    },
    {
      id: 8,
      question: "Zygmunt Bauman criou o conceito de:",
      options: ["Sociedade do Espetáculo", "Modernidade Líquida", "Fim da História", "Aldeia Global"],
      correctAnswer: "Modernidade Líquida",
      topic: "Sociologia Contemporânea",
      explanation: "Refere-se à fluidez e instabilidade das relações humanas no mundo moderno."
    },
    {
      id: 9,
      question: "O processo de socialização é:",
      options: ["Fazer amigos em festas", "O aprendizado e interiorização dos valores e normas da sociedade", "O uso de redes sociais", "A estatização de empresas"],
      correctAnswer: "O aprendizado e interiorização dos valores e normas da sociedade",
      topic: "Conceitos Básicos",
      explanation: "Começa na família (socialização primária) e continua na escola/trabalho (secundária)."
    },
    {
      id: 10,
      question: "A Desigualdade Social no Brasil é historicamente marcada por:",
      options: ["Herança colonial e escravista", "Falta de recursos naturais", "Excesso de guerras externas", "Clima tropical"],
      correctAnswer: "Herança colonial e escravista",
      topic: "Desigualdade",
      explanation: "A concentração de terras e renda tem raízes na colonização e escravidão."
    }
  ]
};