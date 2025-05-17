const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'gm',
  password: '12345678',
  database: 'pkm'
};

// Middleware para garantir que o corpo da requisição seja JSON
router.use(express.json());

// Rota de teste para garantir que a API está funcionando
router.get('/teste', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// Rota POST para cadastrar usuário
router.post('/usuarios', async (req, res) => {
  const { nome, senha } = req.body;

  if (!nome || !senha) {
    return res.status(400).json({ detail: 'Todos os campos são obrigatórios' });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);

    await connection.execute(
      'INSERT INTO usuarios (nome, senha) VALUES (?, ?)',
      [nome, senha]
    );

    await connection.end();

    return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    return res.status(500).json({ detail: 'Erro ao cadastrar usuário' });
  }
});

// Rota para pegar usuários sem ficha
router.get('/jogadores_sem_ficha', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(`
      SELECT u.id, u.nome FROM usuarios u
      LEFT JOIN fichas f ON u.id = f.jogador_id
      WHERE f.jogador_id IS NULL
    `);

    await connection.end();

    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar usuários sem ficha:', error);
    res.status(500).json({ detail: 'Erro ao buscar usuários sem ficha' });
  }
});

// Rota para pegar todas as classes
router.get('/classes', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute('SELECT id_hab, hab_nome FROM classes');

    await connection.end();

    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar classes:', error);
    res.status(500).json({ detail: 'Erro ao buscar classes' });
  }
});

// Rota para criar ficha
router.post('/fichas', async (req, res) => {
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

    // Verifica se usuário existe
    const [usuario] = await connection.execute('SELECT id FROM usuarios WHERE id = ?', [jogador_id]);
    if (usuario.length === 0) {
      await connection.end();
      return res.status(400).json({ detail: 'Usuário não encontrado.' });
    }

    // Verifica se usuário já tem ficha
    const [fichaExistente] = await connection.execute('SELECT id FROM fichas WHERE jogador_id = ?', [jogador_id]);
    if (fichaExistente.length > 0) {
      await connection.end();
      return res.status(400).json({ detail: 'Usuário já possui ficha.' });
    }

    // Verifica se classe existe
    const [classe] = await connection.execute('SELECT id_hab FROM classes WHERE id_hab = ?', [classe_id]);
    if (classe.length === 0) {
      await connection.end();
      return res.status(400).json({ detail: 'Classe não encontrada.' });
    }

    // Insere ficha
    const [resultado] = await connection.execute(
      `INSERT INTO fichas
       (jogador_id, classe_id, idade, nivel, poke, xp, forca, destreza, vontade, sorte, vida, defesa, percepcao, corrupcao, dmg)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [jogador_id, classe_id, idade, nivel, poke, xp, forca, destreza, vontade, sorte, vida, defesa, percepcao, corrupcao, dmg]
    );

    await connection.end();

    res.status(201).json({ message: 'Ficha criada com sucesso!', fichaId: resultado.insertId });
  } catch (error) {
    console.error('Erro ao criar ficha:', error);
    res.status(500).json({ detail: 'Erro interno do servidor.' });
  }
});

module.exports = router;
