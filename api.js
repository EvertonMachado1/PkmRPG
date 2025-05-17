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

    // Inserir novo usuário no banco
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

module.exports = router;
