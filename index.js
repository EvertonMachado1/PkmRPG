const express = require('express');
const path = require('path');
const session = require('express-session');
const mysql = require('mysql2');
const apiRoutes = require('./api');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', apiRoutes);

app.use(session({
  secret: '12345678',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'gm',
    password: '12345678',
    database: 'pkm'
  });

app.use(express.urlencoded({ extended: true }));

// Middleware para proteger /admin
app.use('/admin', (req, res, next) => {
  if (req.path === '/login.html' || (req.method === 'POST' && req.path === '/login')) {
    return next();
  }
  if (req.session.isAdmin) {
    return next();
  }
  return res.redirect('/admin/login.html');
});

// Rota POST login
app.post('/admin/login', (req, res) => {
  const { password } = req.body;

  connection.query(
    'SELECT * FROM usuarios WHERE nome = ? AND senha = ?',
    ['gm', password],
    (err, results) => {
      if (err) {
        console.error('Erro ao consultar MySQL:', err);
        return res.status(500).send('Erro interno no servidor');
      }
      console.log('Resultados da query:', results);
      if (results.length > 0) {
        req.session.isAdmin = true;
        return res.redirect('/admin/painel.html');
      }
      res.redirect('/admin/login.html?error=1');
    }
  );
});


// Logout
app.get('/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login.html');
  });
});

app.use(express.urlencoded({ extended: true }));

// Middleware para proteger /game
app.use('/game', (req, res, next) => {
  if (req.path === '/login.html' || (req.method === 'POST' && req.path === '/login')) {
    return next();
  }
  if (req.session.isPlayer) {
    return next();
  }
  return res.redirect('/game/login.html');
});

// Rota POST login
app.post('/game/login', (req, res) => {
  const { senha, nome } = req.body;
  connection.query(
    'SELECT * FROM usuarios WHERE nome = ? AND senha = ?',
  [nome, senha],
    (err, results) => {
      if (err) {
        console.error('Erro ao consultar MySQL:', err);
        return res.status(500).send('Erro interno no servidor');
      }
      if (results.length > 0) {
        req.session.isPlayer = true;
        return res.redirect('/game/jogo.html');
      }
      res.redirect('/game/login.html?error=1');
    }
  );
});

// Logout
app.get('/game/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/game/login.html');
  });
});

// Servir arquivos estáticos de /public e /public/admin
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/game', express.static(path.join(__dirname, 'public', 'game')));


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
