const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Config do banco, pode exportar/importar ou receber por parâmetro
const dbConfig = {
  host: 'localhost',
  user: 'gm',
  password: '12345678',
  database: 'pkm'
};

router.use(express.json()); // para interpretar JSON no corpo da requisição

router.post('/usuarios', async (req, res) => {
  const { nome, senha } = req.body;

  if (!nome || !login || !senha) {
    return res.status(400).json({ detail: 'Todos os campos são obrigatórios' });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      'INSERT INTO usuarios (nome, senha) VALUES (?, ?)',
      [nome, senha]
    );
    await connection.end();
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ detail: 'Erro ao cadastrar usuário' });
  }
});

module.exports = router;
