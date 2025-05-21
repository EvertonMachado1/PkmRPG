const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'gm',
  password: '12345678',
  database: 'pkm'
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
    passiva,
    passiva_oculta,
    evolucao,
    vida,
    ataque,
    defesa,
    ataque_especial,
    defesa_especial,
    velocidade,
    hab1, hab2, hab3, hab4,
    fraco1, fraco2, fraco3, fraco4, fraco5, fraco6, fraco7, fraco8, fraco9,
    resistente1, resistente2, resistente3, resistente4, resistente5,
    resistente6, resistente7, resistente8, resistente9
  } = req.body;

  if (!nome || !numero_pokedex) {
    return res.status(400).json({ detail: 'Nome e número da Pokédex são obrigatórios.' });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);

    await connection.execute(`
      INSERT INTO pokemon (
        nome, numero_pokedex, tipo1, tipo2,
        passiva, passiva_oculta, evolucao,
        vida, ataque, defesa, ataque_especial, defesa_especial, velocidade,
        hab1, hab2, hab3, hab4,
        fraco1, fraco2, fraco3, fraco4, fraco5, fraco6, fraco7, fraco8, fraco9,
        resistente1, resistente2, resistente3, resistente4, resistente5,
        resistente6, resistente7, resistente8, resistente9
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      nome, numero_pokedex, tipo1, tipo2,
      passiva, passiva_oculta, evolucao,
      vida, ataque, defesa, ataque_especial, defesa_especial, velocidade,
      hab1, hab2, hab3, hab4,
      fraco1, fraco2, fraco3, fraco4, fraco5, fraco6, fraco7, fraco8, fraco9,
      resistente1, resistente2, resistente3, resistente4, resistente5,
      resistente6, resistente7, resistente8, resistente9
    ]);

    await connection.end();

    return res.status(201).json({ message: 'Pokémon cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar Pokémon:', error);
    return res.status(500).json({ detail: 'Erro ao cadastrar Pokémon.' });
  }
});


module.exports = router;
