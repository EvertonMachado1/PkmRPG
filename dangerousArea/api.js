const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const dbConfig = {
  host: '0.0.0.0',
  user: 'gamemaster',
  password: '12345678',
  database: 'pkm',
  ssl: false
};

router.use(express.json());

// Rota de teste
router.get('/teste', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// Criar usuário
router.post('/usuarios', async (req, res) => {
  const { nome, senha } = req.body;

  if (!nome || !senha) {
    return res.status(400).json({ detail: 'Todos os campos são obrigatórios' });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute('INSERT INTO usuarios (nome, senha) VALUES (?, ?)', [nome, senha]);
    await connection.end();
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ detail: 'Erro ao cadastrar usuário' });
  }
});

// Jogadores sem ficha
router.get('/jogadores_sem_ficha', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(`
      SELECT u.id, u.nome FROM usuarios u
      LEFT JOIN ficha f ON u.id = f.jogador_id
      WHERE f.jogador_id IS NULL
    `);
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar usuários sem ficha:', error);
    res.status(500).json({ detail: 'Erro ao buscar usuários sem ficha' });
  }
});

// Listar habilidades
router.get('/habilidades', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT id_hab, hab_nome FROM habilidades');
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar habilidades:', error);
    res.status(500).json({ detail: 'Erro ao buscar habilidades' });
  }
});

// Criar ficha
router.post('/ficha', async (req, res) => {
  const {
    jogador_id,
    classe_id,
    idade,
    nivel = 0,
    poke = 0,
    xp = 0,
    forca,
    destreza,
    vontade,
    sorte,
    vida,
    defesa,
    percepcao,
    corrupcao,
    dmg = 0
  } = req.body;

  if (
    !jogador_id || !classe_id || !idade ||
    forca === undefined || destreza === undefined || vontade === undefined ||
    sorte === undefined || vida === undefined || defesa === undefined ||
    percepcao === undefined || corrupcao === undefined
  ) {
    return res.status(400).json({ detail: 'Campos obrigatórios faltando.' });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);

    // Verifica se jogador existe
    const [usuario] = await connection.execute('SELECT id FROM usuarios WHERE id = ?', [jogador_id]);
    if (usuario.length === 0) {
      await connection.end();
      return res.status(400).json({ detail: 'Usuário não encontrado.' });
    }

    // Verifica se já tem ficha
    const [fichaExistente] = await connection.execute('SELECT id FROM ficha WHERE jogador_id = ?', [jogador_id]);
    if (fichaExistente.length > 0) {
      await connection.end();
      return res.status(400).json({ detail: 'Usuário já possui ficha.' });
    }

    // Verifica se classe existe
    const [classe] = await connection.execute('SELECT id_hab FROM habilidades WHERE id_hab = ?', [classe_id]);
    if (classe.length === 0) {
      await connection.end();
      return res.status(400).json({ detail: 'Classe não encontrada.' });
    }

    // Inserir ficha
    const [resultado] = await connection.execute(`
      INSERT INTO ficha (
        jogador_id, classe_id, idade, nivel, poke, xp,
        forca, destreza, vontade, sorte, vida, defesa,
        percepcao, corrupcao, dmg
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [jogador_id, classe_id, idade, nivel, poke, xp,
       forca, destreza, vontade, sorte, vida, defesa,
       percepcao, corrupcao, dmg]
    );

    await connection.end();
    res.status(201).json({ message: 'Ficha criada com sucesso!', fichaId: resultado.insertId });
    location.reload();
  } catch (error) {
    console.error('Erro ao criar ficha:', error);
    res.status(500).json({ detail: 'Erro interno do servidor.' });
  }
});

// Rota para cadastrar um novo Pokémon
router.post('/pokemons', async (req, res) => {
  const {
    nome,
    numero_pokedex,
    tipo1,
    tipo2,
    evolucao,
    vida,
    ataque,
    defesa,
    ataque_especial,
    defesa_especial,
    velocidade,
    descricao
  } = req.body;

  // Log inicial dos dados recebidos
  console.log('✅ Dados recebidos para cadastro de Pokémon:', req.body);

  // Verificação de campos obrigatórios
  if (!nome || !numero_pokedex) {
    console.warn('⚠️ Nome ou número da Pokédex não fornecido');
    return res.status(400).json({ detail: 'Nome e número da Pokédex são obrigatórios.' });
  }

  try {
    console.log('🔌 Conectando ao banco de dados...');
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conexão bem-sucedida.');

    const query = `
      INSERT INTO pokemon (
        nome, numero_pokedex, tipo1, tipo2, evolucao,
        vida, ataque, defesa, ataque_especial, defesa_especial, velocidade, descricao
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
      nome, numero_pokedex, tipo1, tipo2, evolucao,
      vida, ataque, defesa, ataque_especial, defesa_especial, velocidade, descricao
    ];

    console.log('📥 Executando query de inserção...');
    console.log('📄 Valores:', valores);

    const [resultado] = await connection.execute(query, valores);

    console.log('✅ Pokémon cadastrado com sucesso. Resultado da query:', resultado);

    await connection.end();
    console.log('🔌 Conexão encerrada.');

    return res.status(201).json({ message: 'Pokémon cadastrado com sucesso!' });

  } catch (error) {
    console.error('❌ Erro ao cadastrar Pokémon:', error);
    return res.status(500).json({ detail: 'Erro ao cadastrar Pokémon.', error: error.message });
  }
});

// Lista de pokemon cadastrado
router.get('/pokelista', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [pokemons] = await connection.execute(`
      SELECT id, nome, numero_pokedex, tipo1, tipo2, evolucao,
             vida, ataque, defesa, ataque_especial, defesa_especial, velocidade
      FROM pokemon
      ORDER BY numero_pokedex ASC
    `);
    await connection.end();
    res.json(pokemons);
  } catch (error) {
    console.error('Erro ao listar Pokémons:', error);
    res.status(500).json({ detail: 'Erro ao listar Pokémons.' });
  }
});


module.exports = router;
